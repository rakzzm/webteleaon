"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Mic, Minimize2, Send, Square, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamTeleaonAgent } from "@/lib/teleaon-agent-client";
import { createTeleaonVoiceUrl } from "@/lib/teleaon-voice-client";
import { transcribeTeleaonAudio } from "@/lib/teleaon-stt-client";

const humanAvatarVideoSrc = "/videos/teleaon-heygen-annie-avatar.mp4";

const voiceInstructions =
  "Speak as Teleaon's video agent: warm, concise, professional Malaysian English. Natural pacing, confident, friendly, and suitable for a customer-facing website video assistant.";

type BrowserSpeechRecognitionResult = {
  isFinal: boolean;
  0?: {
    transcript?: string;
  };
};

type BrowserSpeechRecognitionEvent = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: BrowserSpeechRecognitionResult;
  };
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

export function FloatingVideoAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("Can Teleaon help my team automate customer enquiries?");
  const [response, setResponse] = useState("Hi, I am your Teleaon virtual assistant. I can help explain AI agents, check customer enquiries, qualify leads, and guide you to the right solution. No worries, ask me anything lah.");
  const [status, setStatus] = useState("Ready to help");
  const [isReplying, setIsReplying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [, setMouthLevel] = useState(0);
  const [liveAvatarUrl, setLiveAvatarUrl] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const voiceAbortRef = useRef<AbortController | null>(null);
  const sttAbortRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const recordTimerRef = useRef<number | null>(null);
  const lipSyncFrameRef = useRef<number | null>(null);
  const lipSyncContextRef = useRef<AudioContext | null>(null);
  const hasCheckedLiveAvatarRef = useRef(false);
  const speechRecognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const speechShouldSubmitRef = useRef(false);
  const speechFinalTranscriptRef = useRef("");
  const speechInterimTranscriptRef = useRef("");
  const speechAutoSubmitTimerRef = useRef<number | null>(null);
  const isReplyingRef = useRef(false);

  useEffect(() => {
    isReplyingRef.current = isReplying;
  }, [isReplying]);

  const clearVoice = useCallback(() => {
    voiceAbortRef.current?.abort();
    audioRef.current?.pause();
    audioRef.current = null;
    if (lipSyncFrameRef.current) {
      window.cancelAnimationFrame(lipSyncFrameRef.current);
      lipSyncFrameRef.current = null;
    }
    void lipSyncContextRef.current?.close().catch(() => undefined);
    lipSyncContextRef.current = null;
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setMouthLevel(0);
    setIsSpeaking(false);
  }, []);

  const startLipSync = useCallback((audio: HTMLAudioElement) => {
    if (typeof window === "undefined") return;

    if (lipSyncFrameRef.current) {
      window.cancelAnimationFrame(lipSyncFrameRef.current);
      lipSyncFrameRef.current = null;
    }
    void lipSyncContextRef.current?.close().catch(() => undefined);

    try {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.62;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      lipSyncContextRef.current = audioContext;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const sync = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;

        for (const value of data) sum += value;

        const average = sum / data.length;
        const nextLevel = Math.min(1, Math.max(0, (average - 10) / 70));
        setMouthLevel(nextLevel);
        lipSyncFrameRef.current = window.requestAnimationFrame(sync);
      };

      void audioContext.resume().catch(() => undefined);
      sync();
    } catch {
      setMouthLevel(0.55);
    }
  }, []);

  const stopListening = useCallback((submitRecording = true) => {
    if (recordTimerRef.current) {
      window.clearTimeout(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (speechAutoSubmitTimerRef.current) {
      window.clearTimeout(speechAutoSubmitTimerRef.current);
      speechAutoSubmitTimerRef.current = null;
    }

    if (speechRecognitionRef.current) {
      speechShouldSubmitRef.current = submitRecording;
      const recognition = speechRecognitionRef.current;

      if (submitRecording) {
        recognition.stop();
      } else {
        recognition.abort();
        speechRecognitionRef.current = null;
        speechFinalTranscriptRef.current = "";
        speechInterimTranscriptRef.current = "";
      }
    }

    if (!submitRecording) {
      sttAbortRef.current?.abort();
      audioChunksRef.current = [];
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;
    mediaRecorderRef.current = null;
    setIsListening(false);
  }, []);

  const stopAll = useCallback(() => {
    abortRef.current?.abort();
    stopListening(false);
    clearVoice();
    setIsReplying(false);
    setStatus("Stopped");
  }, [clearVoice, stopListening]);

  useEffect(() => stopAll, [stopAll]);

  useEffect(() => {
    if (document.querySelector('link[data-teleaon-orbitron="true"]')) return;

    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    fontLink.dataset.teleaonOrbitron = "true";
    document.head.appendChild(fontLink);
  }, []);

  useEffect(() => {
    if (!isOpen || hasCheckedLiveAvatarRef.current) return;

    let isMounted = true;

    hasCheckedLiveAvatarRef.current = true;
    fetch("/api/heygen/liveavatar-embed", { cache: "no-store" })
      .then((result) => (result.ok ? result.json() : null))
      .then((payload: { url?: string } | null) => {
        if (isMounted && payload?.url) {
          setLiveAvatarUrl(payload.url);
          setStatus("Realtime avatar online");
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const speak = async (text: string, signal: AbortSignal) => {
    const cleanText = text.replace(/[*#`_>-]/g, "").replace(/\s+/g, " ").trim();
    if (!cleanText) return;

    clearVoice();
    setStatus("Preparing voice...");

    try {
      const audioUrl = await createTeleaonVoiceUrl({
        text: cleanText,
        voice: "nova",
        instructions: voiceInstructions,
        signal
      });
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => {
        setIsSpeaking(true);
        setStatus("Speaking");
        startLipSync(audio);
      };
      audio.onended = () => {
        setMouthLevel(0);
        setIsSpeaking(false);
        setStatus("Ready");
      };
      audio.onerror = () => {
        setMouthLevel(0);
        setIsSpeaking(false);
        setStatus("Voice unavailable. Text answer is ready.");
      };

      await audio.play();
    } catch (error) {
      if (!signal.aborted) {
        setStatus(error instanceof Error ? error.message : "Voice unavailable. Text answer is ready.");
      }
    }
  };

  const askAgent = async (message = input, options: { preserveSpeechState?: boolean } = {}) => {
    const trimmed = message.trim();
    if (!trimmed || isReplyingRef.current) return;

    abortRef.current?.abort();
    if (!options.preserveSpeechState) {
      stopListening(false);
    }
    clearVoice();
    const controller = new AbortController();
    abortRef.current = controller;

    setInput(trimmed);
    setResponse("");
    setStatus("Connecting to OpenAI...");
    setIsReplying(true);

    let fullResponse = "";

    try {
      await streamTeleaonAgent({
        message: trimmed,
        surface: "video-agent",
        context:
          "This is a floating realtime website avatar agent. Keep replies short, spoken, customer-facing, and useful for sales, support, CRM, demo booking, and platform questions.",
        signal: controller.signal,
        onDelta: (delta) => {
          fullResponse += delta;
          setResponse((current) => current + delta);
        }
      });

      setStatus("OpenAI response ready");
      await speak(fullResponse, controller.signal);
    } catch (error) {
      if (!controller.signal.aborted) {
        setResponse(error instanceof Error ? error.message : "I could not connect to the video agent right now.");
        setStatus("Connection issue");
      }
    } finally {
      setIsReplying(false);
      abortRef.current = null;
    }
  };

  const startListening = async () => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionConstructor =
      (window as SpeechRecognitionWindow).SpeechRecognition || (window as SpeechRecognitionWindow).webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      abortRef.current?.abort();
      clearVoice();
      stopListening(false);
      speechFinalTranscriptRef.current = "";
      speechInterimTranscriptRef.current = "";

      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-MY";
      recognition.maxAlternatives = 1;
      speechRecognitionRef.current = recognition;
      speechShouldSubmitRef.current = true;

      recognition.onresult = (event) => {
        let finalTranscript = speechFinalTranscriptRef.current;
        let interimTranscript = "";

        for (let index = event.resultIndex; index < event.results.length; index++) {
          const transcript = event.results[index]?.[0]?.transcript?.trim();
          if (!transcript) continue;

          if (event.results[index].isFinal) {
            finalTranscript = `${finalTranscript} ${transcript}`.trim();
          } else {
            interimTranscript = `${interimTranscript} ${transcript}`.trim();
          }
        }

        speechFinalTranscriptRef.current = finalTranscript;
        speechInterimTranscriptRef.current = interimTranscript;

        const liveText = [finalTranscript, interimTranscript].filter(Boolean).join(" ");
        if (liveText) {
          setInput(liveText);
          setResponse(`Listening: ${liveText}`);
          setStatus(interimTranscript ? "Recognizing speech live..." : "Speech captured. Answering when you pause...");

          if (speechAutoSubmitTimerRef.current) {
            window.clearTimeout(speechAutoSubmitTimerRef.current);
          }
          speechAutoSubmitTimerRef.current = window.setTimeout(() => {
            speechAutoSubmitTimerRef.current = null;
            if (speechRecognitionRef.current && !isReplyingRef.current) {
              stopListening(true);
            }
          }, interimTranscript ? 1800 : 900);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        speechRecognitionRef.current = null;
        setStatus(event.error === "not-allowed" ? "Microphone permission is needed." : "Realtime speech recognition stopped.");
      };

      recognition.onend = () => {
        if (speechAutoSubmitTimerRef.current) {
          window.clearTimeout(speechAutoSubmitTimerRef.current);
          speechAutoSubmitTimerRef.current = null;
        }
        const shouldSubmit = speechShouldSubmitRef.current;
        const transcript = [speechFinalTranscriptRef.current, speechInterimTranscriptRef.current].filter(Boolean).join(" ").trim();

        speechRecognitionRef.current = null;
        speechInterimTranscriptRef.current = "";
        speechFinalTranscriptRef.current = "";
        setIsListening(false);

        if (!shouldSubmit) return;

        if (!transcript) {
          setStatus("I could not hear a clear question. Please try again.");
          return;
        }

        setInput(transcript);
        setResponse(`You said: ${transcript}`);
        setStatus("Thinking...");
        window.setTimeout(() => void askAgent(transcript, { preserveSpeechState: true }), 0);
      };

      setResponse("Listening live. Speak naturally and I will answer when you pause.");
      setStatus("Realtime speech recognition...");
      setIsListening(true);

      try {
        recognition.start();
      } catch {
        setIsListening(false);
        speechRecognitionRef.current = null;
        setStatus("Realtime speech recognition could not start.");
      }

      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("Microphone is not supported in this browser.");
      return;
    }

    abortRef.current?.abort();
    clearVoice();
    stopListening(false);
    audioChunksRef.current = [];
    setResponse("Realtime recognition is not available in this browser. I will capture a short clip and transcribe it as fast as possible.");
    setStatus("Fallback speech recognition...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      micStreamRef.current = stream;

      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      const controller = new AbortController();
      sttAbortRef.current = controller;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const audio = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        audioChunksRef.current = [];
        micStreamRef.current?.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
        setIsListening(false);

        if (audio.size < 900 || controller.signal.aborted) {
          if (!controller.signal.aborted) setStatus("I did not catch enough audio. Please try again.");
          return;
        }

        setStatus("Transcribing with OpenAI...");
        void transcribeTeleaonAudio({ audio, signal: controller.signal })
          .then((text) => {
            if (!text) {
              setStatus("I could not hear a clear question. Please try again.");
              return;
            }

            setInput(text);
            setResponse(`You said: ${text}`);
            setStatus("Thinking...");
            sttAbortRef.current = null;
            window.setTimeout(() => void askAgent(text, { preserveSpeechState: true }), 0);
          })
          .catch((error) => {
            if (controller.signal.aborted) return;
            setStatus(error instanceof Error ? error.message : "Speech recognition is unavailable.");
          });
      };

      recorder.start(250);
      setIsListening(true);
      recordTimerRef.current = window.setTimeout(() => stopListening(true), 6500);
    } catch (error) {
      micStreamRef.current?.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
      setIsListening(false);
      setStatus(error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone permission is needed." : "Microphone could not start.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-[min(calc(100vw-2rem),460px)] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/92 shadow-[0_26px_90px_rgba(15,23,42,0.24)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-cyan text-slate-950">
                  {(isReplying || isSpeaking || isListening) && <span className="absolute inset-0 animate-ping rounded-full bg-cyan/45" />}
                  <Video className="relative h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-950">Teleaon Agent</div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className={cn("h-2 w-2 rounded-full", isReplying || isSpeaking || isListening ? "animate-pulse bg-cyan" : "bg-emerald-500")} />
                    {liveAvatarUrl ? status : isSpeaking ? "Speaking with generated voice" : status}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setIsMinimized(true)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" aria-label="Minimize video agent">
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => { stopAll(); setIsOpen(false); }} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" aria-label="Close video agent">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <RealtimeAvatarStage
              isActive={isSpeaking || isReplying || isListening}
              mode={isListening ? "listening" : isSpeaking ? "speaking" : isReplying ? "thinking" : "ready"}
              liveAvatarUrl={liveAvatarUrl}
            />

            <div className="space-y-3 p-3">
              <div className="min-h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/85 p-3 text-sm leading-6 text-slate-700">
                {response || "Thinking..."}
              </div>

              <form
                className="flex items-end gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  void askAgent();
                }}
              >
                <label className="sr-only" htmlFor="floating-video-agent-input">Ask Teleaon video agent</label>
                <input
                  id="floating-video-agent-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan"
                  placeholder="Ask the video agent..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      stopListening(true);
                    } else {
                      void startListening();
                    }
                  }}
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan hover:text-slate-950",
                    isListening && "border-cyan bg-cyan text-slate-950"
                  )}
                  aria-label={isListening ? "Stop listening and answer" : "Speak to Teleaon Agent"}
                  disabled={isReplying || isSpeaking}
                >
                  {isListening ? <Square className="h-5 w-5 fill-current" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  type={isReplying || isSpeaking ? "button" : "submit"}
                  onClick={isReplying || isSpeaking ? stopAll : undefined}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan text-slate-950 shadow-sm transition hover:bg-slate-950 hover:text-white"
                  aria-label={isReplying || isSpeaking ? "Stop Teleaon Agent" : "Send to Teleaon Agent"}
                >
                  {isReplying || isSpeaking ? <Square className="h-5 w-5 fill-current" /> : <Send className="h-5 w-5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_18px_60px_rgba(15,23,42,0.34)] transition hover:-translate-y-1 hover:bg-cyan hover:text-slate-950"
        aria-label={isOpen ? "Open Teleaon video agent" : "Launch Teleaon video agent"}
      >
        <span className="absolute inset-0 rounded-full bg-cyan/30 opacity-0 blur-xl transition group-hover:opacity-100" />
        {isMinimized ? <Maximize2 className="relative h-6 w-6" /> : <Video className="relative h-7 w-7" />}
      </button>
    </div>
  );
}

function RealtimeAvatarStage({
  isActive,
  mode,
  liveAvatarUrl
}: {
  isActive: boolean;
  mode: "ready" | "listening" | "thinking" | "speaking";
  liveAvatarUrl: string | null;
}) {
  const fallbackVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = fallbackVideoRef.current;
    if (!video || liveAvatarUrl) return;

    if (mode !== "speaking") {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [liveAvatarUrl, mode]);

  return (
    <div className="relative min-h-[310px] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,242,255,0.22),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(224,0,131,0.20),transparent_32%),linear-gradient(180deg,#020617_0%,#08111f_52%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,242,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />
      {liveAvatarUrl ? (
        <iframe
          title="Teleaon realtime avatar"
          src={liveAvatarUrl}
          className="absolute inset-0 h-full w-full border-0"
          allow="microphone; camera; autoplay; encrypted-media; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <video
            ref={fallbackVideoRef}
            className="absolute inset-0 h-full w-full object-cover object-[50%_12%] opacity-95"
            src={humanAvatarVideoSrc}
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Teleaon Agent public human avatar preview"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.28)_54%,rgba(2,6,23,0.82)_100%)]" />
          {mode === "speaking" && <div className="absolute inset-x-8 bottom-4 h-px bg-cyan/45 shadow-[0_0_18px_rgba(34,211,238,0.85)]" />}
        </>
      )}

      {!liveAvatarUrl && (
        <>
          <motion.div
            className="absolute left-1/2 top-[42%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-2xl"
            animate={{ scale: isActive ? [0.95, 1.15, 0.95] : [1, 1.05, 1], opacity: isActive ? [0.35, 0.7, 0.35] : [0.22, 0.36, 0.22] }}
            transition={{ duration: isActive ? 1.2 : 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {(mode === "speaking" || mode === "listening" || mode === "thinking") && (
            <motion.div
              className="absolute left-1/2 top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/30"
              animate={{ scale: [0.92, 1.18], opacity: [0.44, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <div className="absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2">
            {[0, 1, 2].map((ring) => (
              <motion.span
                key={ring}
                className="absolute inset-0 rounded-full border border-cyan/20"
                animate={{ scale: isActive ? [0.72, 1.15] : [0.82, 1], opacity: isActive ? [0.45, 0] : [0.18, 0] }}
                transition={{ duration: isActive ? 1.8 : 4, repeat: Infinity, delay: ring * 0.42, ease: "easeOut" }}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
