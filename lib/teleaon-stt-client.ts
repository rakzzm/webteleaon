export async function transcribeTeleaonAudio({ audio, signal }: { audio: Blob; signal?: AbortSignal }) {
  const formData = new FormData();
  formData.append("audio", audio, `teleaon-customer-${Date.now()}.webm`);

  const response = await fetch("/api/teleaon-stt", {
    method: "POST",
    body: formData,
    signal
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const payload = (await response.json()) as { text?: string };
  return payload.text?.trim() ?? "";
}
