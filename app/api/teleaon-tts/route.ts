import { NextRequest } from "next/server";

type TextToSpeechRequest = {
  text?: string;
  voice?: string;
  instructions?: string;
};

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as TextToSpeechRequest;
  const text = body.text?.trim();
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const provider = (process.env.TELEAON_TTS_PROVIDER || "openai").toLowerCase();

  if (!text) {
    return new Response("Please provide text for the Teleaon voice agent.", { status: 400 });
  }

  if (provider !== "elevenlabs" || !apiKey) {
    return openAiSpeechFallback(text, body);
  }

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
    method: "POST",
    headers: {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.32,
        similarity_boost: 0.78,
        style: 0.62,
        use_speaker_boost: true
      }
    })
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    const fallback = await openAiSpeechFallback(text, body);

    if (fallback.ok) return fallback;

    return new Response(getFriendlyProviderError(detail), { status: upstream.status || 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "audio/mpeg"
    }
  });
}

async function openAiSpeechFallback(text: string, body: TextToSpeechRequest = {}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response("Teleaon voice is temporarily unavailable because no speech provider key is configured.", { status: 400 });
  }

  const upstream = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice: body.voice || process.env.OPENAI_TTS_VOICE || "nova",
      input: text,
      instructions:
        body.instructions ||
        "Speak like a warm Malaysian enterprise customer service agent. Natural, clear, friendly, not robotic. Use gentle Malaysian English rhythm, calm pacing, and professional confidence."
    })
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Teleaon voice is temporarily unavailable. The text agent still works.", { status: upstream.status || 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "audio/mpeg",
      "X-Teleaon-Voice-Provider": "openai"
    }
  });
}

function getFriendlyProviderError(detail: string) {
  try {
    const parsed = JSON.parse(detail) as { detail?: { status?: string; message?: string } | string };
    const providerStatus = typeof parsed.detail === "object" ? parsed.detail.status : undefined;
    const providerMessage = typeof parsed.detail === "object" ? parsed.detail.message : parsed.detail;

    if (providerStatus === "detected_unusual_activity" || providerMessage?.toLowerCase().includes("unusual activity")) {
      return "Teleaon voice is temporarily unavailable because the ElevenLabs account is blocking Free Tier voice generation. The text agent still works. Add a paid ElevenLabs key or a different voice provider key to restore voice playback.";
    }
  } catch {
    // Fall through to the generic message below.
  }

  return "Teleaon voice is temporarily unavailable. The text agent still works, and voice playback can be restored by checking the ElevenLabs API key, voice ID, and account plan.";
}
