type StreamAgentOptions = {
  message: string;
  mode?: string | null;
  surface: "command-center" | "video-agent";
  context?: string;
  signal?: AbortSignal;
  onDelta: (delta: string) => void;
};

export async function streamTeleaonAgent({ message, mode, surface, context, signal, onDelta }: StreamAgentOptions) {
  const response = await fetch("/api/teleaon-agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, mode, surface, context }),
    signal
  });

  if (!response.body) {
    const text = await response.text();
    throw new Error(text || "The agent stream did not return a response body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onDelta(decoder.decode(value, { stream: true }));
  }
}
