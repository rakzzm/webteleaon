import { NextRequest } from "next/server";

type AgentSurface = "command-center" | "video-agent";

type AgentRequest = {
  message?: string;
  mode?: string | null;
  surface?: AgentSurface;
  context?: string;
};

const encoder = new TextEncoder();

const surfaceInstructions: Record<AgentSurface, string> = {
  "command-center":
    "You are Teleaon Agent Command Center, an enterprise AI operations assistant. Respond with concise production-ready actions: intent, reasoning, next steps, system updates, and risks. Keep answers useful for CRM, support, sales, and operations workflows.",
  "video-agent":
    "You are Teleaon Video Agent, a lifelike customer-facing AI support avatar for Malaysian businesses. Respond like a real live customer-service conversation: acknowledge the customer, answer clearly, and ask one useful follow-up question when helpful. Help with enquiries, product questions, lead qualification, appointment booking, CRM notes, and escalation readiness. Use natural Malaysian English lightly and professionally: friendly phrases like 'can', 'no worries', 'let me check for you', 'sure, I can help', and occasional soft 'ya' are fine. Do not overdo slang, do not use heavy Manglish, and avoid sounding robotic. Write 2 to 4 short spoken sentences only. Do not use markdown, bullet points, numbered lists, headings, or long paragraphs because the response will be read aloud."
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as AgentRequest;
  const message = body.message?.trim();
  const surface = body.surface === "video-agent" ? "video-agent" : "command-center";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!message) {
    return new Response("Please enter a customer request or workflow instruction.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      status: 400
    });
  }

  if (!apiKey) {
    return streamText(
      [
        "OpenAI is ready to connect, but `OPENAI_API_KEY` is not configured on the server. ",
        surface === "video-agent"
          ? "Demo response: I can help with that enquiry, confirm the customer intent, update the CRM notes, and offer an appointment with a specialist."
          : "Demo response: intent identified, workflow plan created, CRM update prepared, and human approval queued for any high-risk action."
      ],
      26
    );
  }

  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      instructions: [
        surfaceInstructions[surface],
        "The product is Teleaon AI. Never claim actions were actually completed in external systems unless the user provided evidence. If booking or CRM updates are requested, say what should be written or proposed.",
        body.mode ? `Current UI mode: ${body.mode}.` : "",
        body.context ? `UI context: ${body.context}` : ""
      ]
        .filter(Boolean)
        .join("\n"),
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: message }]
        }
      ],
      max_output_tokens: surface === "video-agent" ? 360 : 520,
      reasoning: surface === "video-agent" ? { effort: "minimal" } : { effort: "medium" },
      text: surface === "video-agent" ? { verbosity: "low" } : { verbosity: "medium" },
      store: false,
      stream: true
    })
  });

  if (!upstream.ok || !upstream.body) {
    const errorText = await upstream.text().catch(() => "");

    return streamText(
      [
        "I could not reach the OpenAI response stream. ",
        errorText ? `Server detail: ${errorText.slice(0, 220)}` : "Please check the API key, model, and network access."
      ],
      18
    );
  }

  return new Response(openAIToPlainTextStream(upstream.body), {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no"
    }
  });
}

function streamText(parts: string[], chunkSize: number) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        const text = parts.join("");

        for (let index = 0; index < text.length; index += chunkSize) {
          controller.enqueue(encoder.encode(text.slice(index, index + chunkSize)));
          await new Promise((resolve) => setTimeout(resolve, 45));
        }

        controller.close();
      }
    }),
    {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}

function openAIToPlainTextStream(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const payload = line.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const event = JSON.parse(payload) as { type?: string; delta?: string; error?: { message?: string } };

              if (event.type === "response.output_text.delta" && event.delta) {
                controller.enqueue(encoder.encode(event.delta));
              }

              if (event.type === "error" && event.error?.message) {
                controller.enqueue(encoder.encode(`\n${event.error.message}`));
              }
            } catch {
              // Ignore non-JSON SSE lines.
            }
          }
        }
      } finally {
        controller.close();
      }
    }
  });
}
