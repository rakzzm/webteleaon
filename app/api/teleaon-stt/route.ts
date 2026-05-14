import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response("Teleaon speech recognition is unavailable because OPENAI_API_KEY is not configured.", { status: 400 });
  }

  const formData = await request.formData().catch(() => null);
  const audio = formData?.get("audio");

  if (!(audio instanceof Blob) || audio.size === 0) {
    return new Response("Please provide microphone audio for transcription.", { status: 400 });
  }

  const upstreamForm = new FormData();
  const fileName = audio instanceof File && audio.name ? audio.name : audio.type.includes("mpeg") ? "teleaon-customer.mp3" : "teleaon-customer.webm";
  upstreamForm.append("file", audio, fileName);
  upstreamForm.append("model", process.env.OPENAI_STT_MODEL || "gpt-4o-mini-transcribe");
  upstreamForm.append("language", "en");
  upstreamForm.append(
    "prompt",
    "The speaker may use Malaysian English or Singlish while asking an enterprise AI product, support, booking, CRM, or sales enquiry. Preserve the customer intent clearly."
  );

  const upstream = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: upstreamForm
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    return new Response(detail || "Teleaon speech recognition is temporarily unavailable.", { status: upstream.status || 502 });
  }

  const payload = (await upstream.json()) as { text?: string };

  return Response.json({
    text: payload.text?.trim() ?? ""
  });
}
