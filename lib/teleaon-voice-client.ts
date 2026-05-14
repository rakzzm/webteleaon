type SpeakTeleaonOptions = {
  text: string;
  voice?: string;
  instructions?: string;
  signal?: AbortSignal;
};

export async function createTeleaonVoiceUrl({ text, voice, instructions, signal }: SpeakTeleaonOptions) {
  const response = await fetch("/api/teleaon-tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice, instructions }),
    signal
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Teleaon voice is temporarily unavailable. The text agent still works.");
  }

  return URL.createObjectURL(await response.blob());
}
