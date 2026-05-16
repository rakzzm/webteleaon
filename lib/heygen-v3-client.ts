type JsonRecord = Record<string, unknown>;

export type HeyGenLipsyncRequest = {
  video: { type: string; url: string };
  audio: { type: string; url: string };
  title?: string;
  mode?: "speed" | "quality";
  callback_url?: string;
  callback_id?: string;
};

export type HeyGenVideoTranslationRequest = {
  video: { type: string; url: string };
  output_languages: string[];
};

export type HeyGenVideoRequest = {
  avatar_id: string;
  script: string;
  voice_id: string;
};

export type HeyGenVideoAgentRequest = {
  prompt: string;
  avatar_id?: string;
  voice_id?: string;
};

export function createHeyGenLipsync(payload: HeyGenLipsyncRequest) {
  return postLocalHeyGen("/api/heygen/v3/lipsyncs", payload);
}

export function createHeyGenVideoTranslation(payload: HeyGenVideoTranslationRequest) {
  return postLocalHeyGen("/api/heygen/v3/video-translations", payload);
}

export function createHeyGenVideo(payload: HeyGenVideoRequest) {
  return postLocalHeyGen("/api/heygen/v3/videos", payload);
}

export function createHeyGenVideoAgent(payload: HeyGenVideoAgentRequest) {
  return postLocalHeyGen("/api/heygen/v3/video-agents", payload);
}

async function postLocalHeyGen(path: string, payload: JsonRecord) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.error || result?.message || "HeyGen request failed.");
  }

  return result;
}
