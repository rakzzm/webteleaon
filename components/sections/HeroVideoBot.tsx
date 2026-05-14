"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUp, CalendarCheck, MessageSquareText, Mic, Play, ShieldCheck, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { streamTeleaonAgent } from "@/lib/teleaon-agent-client";
import { transcribeTeleaonAudio } from "@/lib/teleaon-stt-client";
import { createTeleaonVoiceUrl } from "@/lib/teleaon-voice-client";

type HeroVideoBotProps = {
  className?: string;
};

const badges = ["24/7 Support", "Malaysian English", "CRM Connected", "Voice + Video + Chat"];
const signals = [
  { label: "Customer enquiry detected", value: "Billing plan question" },
  { label: "Intent", value: "Product Support" },
  { label: "Sentiment", value: "Positive" },
  { label: "Appointment booked", value: "Tue 10:30 AM" },
  { label: "CRM updated", value: "Lead score +18" },
  { label: "Escalation ready", value: "Human handoff armed" }
];
const defaultVideoAgentGreeting = "Hello, welcome to Teleaon Enterprise - how may i help you today?";
const videoAgentVoiceInstructions =
  "Voice persona: Teleaon AI enterprise concierge. Sound natural, human, warm, and professional. Malaysian English rhythm with clear pronunciation. Calm, confident, helpful, never robotic. Use conversational pacing and light warmth.";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

function toMalaysianSpeechText(text: string) {
  return text
    .replace(/[*#`_>-]/g, "")
    .replace(/\bTeleaonAI\b/g, "Teleaon AI")
    .replace(/\bCRM\b/g, "C R M")
    .replace(/\bAPI\b/g, "A P I")
    .replace(/\bAI\b/g, "A I")
    .replace(/how may i help/gi, "how may I help")
    .replace(/\s+/g, " ")
    .replace(/\. /g, ". ")
    .trim();
}

function getBrowserVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return Promise.resolve([] as SpeechSynthesisVoice[]);

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) return Promise.resolve(voices);

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const timer = window.setTimeout(() => resolve(window.speechSynthesis.getVoices()), 700);

    window.speechSynthesis.onvoiceschanged = () => {
      window.clearTimeout(timer);
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

async function getPreferredBrowserVoice() {
  const voices = await getBrowserVoices();
  const rankedMatchers = [
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase() === "en-my",
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase() === "ms-my",
    (voice: SpeechSynthesisVoice) => voice.name.toLowerCase().includes("malaysia"),
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase() === "en-sg",
    (voice: SpeechSynthesisVoice) => voice.name.toLowerCase().includes("singapore"),
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase() === "en-gb",
    (voice: SpeechSynthesisVoice) => ["serena", "samantha", "daniel", "moira", "rishi"].some((name) => voice.name.toLowerCase().includes(name)),
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase().startsWith("en")
  ];

  for (const matcher of rankedMatchers) {
    const voice = voices.find(matcher);
    if (voice) return voice;
  }

  return voices[0] ?? null;
}

export function HeroVideoBot({ className }: HeroVideoBotProps) {
  const [customerQuestion, setCustomerQuestion] = useState("Can Teleaon connect to our CRM and book a product demo?");
  const [videoAgentResponse, setVideoAgentResponse] = useState(defaultVideoAgentGreeting);
  const [isAgentReplying, setIsAgentReplying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [voiceStatus, setVoiceStatus] = useState("Click play to start a live voice conversation");
  const videoAbortRef = useRef<AbortController | null>(null);
  const voiceAbortRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const sttAbortRef = useRef<AbortController | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const listenSilenceTimerRef = useRef<number | null>(null);
  const submittedTranscriptRef = useRef(false);
  const isVoiceConversationRef = useRef(false);
  const startListeningRef = useRef<(() => void) | null>(null);

  const clearListenTimer = useCallback(() => {
    if (listenSilenceTimerRef.current) {
      window.cancelAnimationFrame(listenSilenceTimerRef.current);
      listenSilenceTimerRef.current = null;
    }
  }, []);

  const stopMicResources = useCallback(() => {
    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;
    void audioContextRef.current?.close().catch(() => undefined);
    audioContextRef.current = null;
  }, []);

  const stopListening = useCallback((submitFinal = false) => {
    clearListenTimer();
    submittedTranscriptRef.current = !submitFinal;
    if (!submitFinal) audioChunksRef.current = [];
    sttAbortRef.current?.abort();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      stopMicResources();
    }
    mediaRecorderRef.current = null;
    setIsListening(false);
  }, [clearListenTimer, stopMicResources]);

  const stopVoice = useCallback(() => {
    voiceAbortRef.current?.abort();
    audioRef.current?.pause();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    audioRef.current = null;
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const stopConversation = useCallback(() => {
    isVoiceConversationRef.current = false;
    stopListening(false);
    videoAbortRef.current?.abort();
    stopVoice();
    setIsAgentReplying(false);
    setLiveTranscript("");
    setVoiceStatus("Conversation stopped");
  }, [stopListening, stopVoice]);

  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, [stopConversation]);

  const speakVideoAgent = async (text: string, options: { listenAfter?: boolean; useServerVoice?: boolean } = {}) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    stopVoice();

    if (!options.useServerVoice) {
      await speakWithBrowserVoice(cleanText, options);
      return;
    }

    const controller = new AbortController();
    voiceAbortRef.current = controller;
    setVoiceStatus("Preparing natural Teleaon voice...");

    try {
      const audioUrl = await createTeleaonVoiceUrl({
        text: cleanText,
        voice: "nova",
        instructions: videoAgentVoiceInstructions,
        signal: controller.signal
      });
      audioUrlRef.current = audioUrl;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => {
        setIsSpeaking(true);
        setVoiceStatus("Speaking in Malaysian English");
      };
      audio.onended = () => {
        setIsSpeaking(false);
        if (options.listenAfter || isVoiceConversationRef.current) {
          setVoiceStatus("Listening... speak when you are ready");
          window.setTimeout(() => startListeningRef.current?.(), 250);
        } else {
          setVoiceStatus("Ready for next enquiry");
        }
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        setVoiceStatus("Voice playback could not start");
      };
      await audio.play();
    } catch (error) {
      if (!controller.signal.aborted) {
        const message = error instanceof Error ? error.message : "Voice provider unavailable. Text response is ready.";
        setVoiceStatus("Natural voice is temporarily unavailable. Text response is ready.");
        if (options.listenAfter || isVoiceConversationRef.current) {
          window.setTimeout(() => startListeningRef.current?.(), 900);
        }
        console.warn(message);
      }
    } finally {
      voiceAbortRef.current = null;
    }
  };

  const speakWithBrowserVoice = async (text: string, options: { listenAfter?: boolean } = {}) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(toMalaysianSpeechText(text));
    const voice = await getPreferredBrowserVoice();
    utterance.voice = voice;
    utterance.lang = voice?.lang || "en-MY";
    utterance.rate = 0.9;
    utterance.pitch = 1.04;
    utterance.volume = 0.96;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setVoiceStatus("Speaking in live conversation mode");
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      if (options.listenAfter || isVoiceConversationRef.current) {
        setVoiceStatus("Listening... speak when you are ready");
        window.setTimeout(() => startListeningRef.current?.(), 250);
      } else {
        setVoiceStatus("Ready for next enquiry");
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setVoiceStatus("Text response ready. Voice is unavailable.");
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleOrbPlayback = () => {
    if (isAgentReplying) {
      setVoiceStatus("TeleaonAI is preparing your answer...");
      return;
    }

    if (isSpeaking) {
      setVoiceStatus("TeleaonAI is speaking. It will listen again after the reply.");
      return;
    }

    if (isListening) {
      setVoiceStatus("Listening... keep speaking until you are done");
      return;
    }

    isVoiceConversationRef.current = true;
    setLiveTranscript("");
    setVoiceStatus("Listening... speak naturally");
    setVideoAgentResponse(defaultVideoAgentGreeting);
    startListeningRef.current?.();
  };

  const askVideoAgentWithMessage = async (message: string, options: { continueConversation?: boolean } = {}) => {
    if (!message.trim()) return;

    videoAbortRef.current?.abort();
    stopVoice();
    stopListening(false);
    const controller = new AbortController();
    videoAbortRef.current = controller;
    setVideoAgentResponse("");
    setVoiceStatus("TeleaonAI is thinking...");
    setIsAgentReplying(true);
    let responseText = "";

    try {
      await streamTeleaonAgent({
        message,
        surface: "video-agent",
        context: "The answer appears inside the Teleaon Video Agent hero as a real-time customer-facing response. It will also be converted to speech. Use Malaysian English, concise spoken sentences, a warm customer-support tone, and ask one natural follow-up question when useful.",
        signal: controller.signal,
        onDelta: (delta) => {
          responseText += delta;
          setVideoAgentResponse((current) => current + delta);
        }
      });
      await speakVideoAgent(responseText, { listenAfter: options.continueConversation, useServerVoice: true });
    } catch (error) {
      if (!controller.signal.aborted) {
        const message = error instanceof Error ? error.message : "Unable to stream a video agent response.";
        setVideoAgentResponse(message);
        setVoiceStatus(message);
      }
    } finally {
      setIsAgentReplying(false);
      videoAbortRef.current = null;
    }
  };

  const askVideoAgent = async () => {
    isVoiceConversationRef.current = true;
    await askVideoAgentWithMessage(customerQuestion, { continueConversation: true });
  };

  const submitSpokenQuestion = (spokenQuestion: string) => {
    const question = spokenQuestion.trim();
    if (!question) {
      if (isVoiceConversationRef.current) startListeningRef.current?.();
      return;
    }

    setCustomerQuestion(question);
    setLiveTranscript("");
    void askVideoAgentWithMessage(question, { continueConversation: true });
  };

  const startListening = async () => {
    if (typeof window === "undefined") return;

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setVoiceStatus("Microphone recording is not supported in this browser. Please type your question.");
      isVoiceConversationRef.current = false;
      return;
    }

    stopVoice();
    stopListening(false);
    clearListenTimer();
    submittedTranscriptRef.current = false;
    audioChunksRef.current = [];
    setLiveTranscript("");
    setVoiceStatus("Opening microphone...");

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
        clearListenTimer();
        stopMicResources();
        setIsListening(false);

        if (submittedTranscriptRef.current) return;
        submittedTranscriptRef.current = true;

        const audio = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        audioChunksRef.current = [];

        if (audio.size < 900) {
          setVoiceStatus("I did not catch that. Please click play and speak again.");
          if (isVoiceConversationRef.current) window.setTimeout(() => startListeningRef.current?.(), 500);
          return;
        }

        setVoiceStatus("Understanding your question...");
        void transcribeTeleaonAudio({ audio, signal: controller.signal })
          .then((text) => {
            setLiveTranscript(text);
            submitSpokenQuestion(text);
          })
          .catch((error) => {
            if (controller.signal.aborted) return;
            const message = error instanceof Error ? error.message : "Speech recognition is temporarily unavailable.";
            setVoiceStatus(message);
            if (isVoiceConversationRef.current) window.setTimeout(() => startListeningRef.current?.(), 900);
          });
      };

      recorder.start(250);
      setIsListening(true);
      setVoiceStatus("Listening... speak naturally");

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const samples = new Uint8Array(analyser.fftSize);
      const startedAt = performance.now();
      let heardVoice = false;
      let lastVoiceAt = startedAt;

      const monitorSpeech = () => {
        analyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (const sample of samples) {
          const centered = (sample - 128) / 128;
          sum += centered * centered;
        }
        const volume = Math.sqrt(sum / samples.length);
        const now = performance.now();

        if (volume > 0.028) {
          heardVoice = true;
          lastVoiceAt = now;
          setLiveTranscript("Listening to your question...");
        }

        const silenceDuration = now - lastVoiceAt;
        const recordingDuration = now - startedAt;
        const shouldStopForSilence = heardVoice && recordingDuration > 1200 && silenceDuration > 1150;
        const shouldStopForMaxLength = recordingDuration > 18000;

        if ((shouldStopForSilence || shouldStopForMaxLength) && recorder.state !== "inactive") {
          recorder.stop();
          return;
        }

        listenSilenceTimerRef.current = window.requestAnimationFrame(monitorSpeech);
      };

      listenSilenceTimerRef.current = window.requestAnimationFrame(monitorSpeech);
    } catch (error) {
      stopMicResources();
      isVoiceConversationRef.current = false;
      setIsListening(false);
      const message = error instanceof DOMException && error.name === "NotAllowedError"
        ? "Microphone permission is needed for live voice."
        : "Microphone could not start. Please check browser permission and try again.";
      setVoiceStatus(message);
    }
  };

  useEffect(() => {
    startListeningRef.current = startListening;
  });

  return (
    <section className={cn("relative isolate overflow-hidden bg-[#f8fbff] py-14 text-slate-950 lg:min-h-[calc(100vh-8.25rem)]", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(30,167,225,0.32),transparent_34%),radial-gradient(circle_at_20%_18%,rgba(224,0,131,0.22),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(125,211,252,0.24),transparent_42%),linear-gradient(135deg,#ffffff_0%,#eefbff_38%,#fff1fa_72%,#ffffff_100%)]" />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(14, 116, 144, 0.18) 1px, transparent 1.15px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 74%)"
        }}
      />
      <motion.div
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#e00083]/18 blur-3xl"
        animate={{ x: [0, 36, 0], y: [0, 22, 0], opacity: [0.34, 0.62, 0.34] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-[#1ea7e1]/22 blur-3xl"
        animate={{ x: [0, -42, 0], y: [0, 28, 0], opacity: [0.38, 0.7, 0.38] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:px-8 xl:gap-14">
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.04] xl:text-[3.7rem]">
            AI Video Agents That <span className="text-cyan">Talk</span>, <span className="text-cyan">Listen</span>, and Resolve Customer Enquiries in Real Time
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            Deploy lifelike AI avatars that engage customers face-to-face, answer questions, qualify leads, book appointments, and speak back in a natural Malaysian customer service style.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact-us">Book a Demo</Button>
            <Button href="/use-case/agent-video-bot#how-it-works" variant="secondary">See How It Works</Button>
          </div>
          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["87%", "faster enquiry triage"],
              ["24/7", "voice response"],
              ["12+", "channel integrations"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-slate-900/10 bg-white/65 p-4 shadow-sm backdrop-blur-xl">
                <div className="text-2xl font-semibold text-slate-950">{value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-w-0 overflow-visible">
          <motion.div
            className="absolute inset-x-8 top-12 h-[520px] rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(30,167,225,0.2),transparent_62%)] blur-3xl"
            animate={{ opacity: [0.3, 0.62, 0.3], scale: [0.94, 1.05, 0.94] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative mx-auto w-full max-w-[680px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 shadow-[0_36px_100px_rgba(14,116,144,0.18)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                  <Volume2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-950">Teleaon Video Agent</div>
                  <div className="flex items-center gap-2 text-xs text-cyan">
                    <span className={cn("h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(40,199,232,0.9)]", (isSpeaking || isListening || isAgentReplying) && "animate-pulse")} />
                    {voiceStatus}
                  </div>
                </div>
              </div>
                  <div className="rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-xs text-slate-600">MY voice mode</div>
            </div>

            <div className="grid gap-3 p-3 md:grid-cols-[minmax(0,1fr)_210px]">
              <div className="relative flex min-h-0 flex-col items-center gap-4 overflow-hidden rounded-[1.45rem] bg-[#f7fbff] p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(224,0,131,0.14),transparent_34%),radial-gradient(circle_at_76%_74%,rgba(30,167,225,0.18),transparent_36%),linear-gradient(135deg,#fff_0%,#f1fbff_52%,#fff2fa_100%)]" />
                <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
                <TalkingOrb isActive={isSpeaking || isAgentReplying || isListening} isListening={isListening} onReplay={handleOrbPlayback} />
                <div className="relative z-10 w-full rounded-2xl border border-white/80 bg-white/72 p-3 shadow-sm backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-cyan">
                    <Mic className="h-4 w-4" />
                    Live TeleaonAI response
                  </div>
                  {isListening && (
                    <p className="mb-3 rounded-xl border border-cyan/25 bg-cyan/10 px-3 py-2 text-xs font-semibold text-slate-700">
                      Listening: {liveTranscript || "Speak now. I will wait until you finish."}
                    </p>
                  )}
                  <p className="min-h-16 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {videoAgentResponse}
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <MiniCustomerCard />
                <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm">
                  <div className="text-xs font-semibold text-cyan">Talk to Teleaon Video Agent</div>
                  <textarea
                    value={customerQuestion}
                    onChange={(event) => setCustomerQuestion(event.target.value)}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white/85 p-3 text-sm text-slate-800 outline-none focus:border-cyan"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (isAgentReplying || isSpeaking || isListening) {
                        stopConversation();
                      } else {
                        void askVideoAgent();
                      }
                    }}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-3 py-2 text-sm font-semibold text-ink transition hover:bg-slate-950 hover:text-white"
                  >
                    {isAgentReplying || isSpeaking || isListening ? <Square className="h-4 w-4 fill-current" /> : <ArrowUp className="h-4 w-4" />}
                    {isAgentReplying || isSpeaking || isListening ? "Stop agent" : "Ask and speak"}
                  </button>
                </div>
                <InsightCard icon={<MessageSquareText className="h-4 w-4" />} title="Malaysian English" body="Warm, professional replies with a natural local service tone." />
                <InsightCard icon={<CalendarCheck className="h-4 w-4" />} title="Appointment booked" body="Product specialist, Tuesday 10:30 AM." />
                <InsightCard icon={<ShieldCheck className="h-4 w-4" />} title="Escalation ready" body="Complex cases route with full context." />
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {signals.map((signal, index) => (
              <motion.div
                key={signal.label}
                className="rounded-2xl border border-white/70 bg-white/78 p-3 shadow-[0_20px_70px_rgba(14,116,144,0.12)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: [0, -4, 0] }}
                transition={{ opacity: { delay: index * 0.08 }, y: { duration: 4.5, repeat: Infinity, delay: index * 0.22 } }}
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{signal.label}</div>
                <div className="mt-1 truncate text-sm font-semibold text-slate-950">{signal.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TalkingOrb({ isActive, isListening, onReplay }: { isActive: boolean; isListening: boolean; onReplay: () => void }) {
  return (
    <div className="relative z-10 flex w-full justify-center">
      <motion.div
        className="relative flex aspect-square w-[min(48vw,220px)] items-center justify-center rounded-full shadow-[0_30px_70px_rgba(224,0,131,0.16)] sm:w-[min(38vw,250px)]"
        animate={{ scale: isActive ? [1, 1.035, 1] : [1, 1.012, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: isActive ? 1.35 : 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.5)_16%,transparent_32%),radial-gradient(circle_at_78%_28%,#cdd8ff_0%,transparent_28%),radial-gradient(circle_at_22%_66%,#ff4257_0%,transparent_36%),radial-gradient(circle_at_78%_78%,#ffd46b_0%,transparent_28%),conic-gradient(from_130deg,#ff3957,#ff8870,#d7dcff,#ff4e72,#ffc45d,#ff3957)]"
          animate={{ rotate: [0, 360], filter: isActive ? ["saturate(1.1)", "saturate(1.45)", "saturate(1.1)"] : ["saturate(1)", "saturate(1.18)", "saturate(1)"] }}
          transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, filter: { duration: 1.2, repeat: Infinity } }}
        />
        <motion.div
          className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_42%,rgba(255,255,255,0.28)_43%,rgba(255,255,255,0.05)_60%,transparent_70%)]"
          animate={{ scale: isActive ? [0.94, 1.08, 0.94] : [1, 1.02, 1], opacity: [0.72, 1, 0.72] }}
          transition={{ duration: isActive ? 1.1 : 4, repeat: Infinity }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 0.7px, transparent 0.9px)",
            backgroundSize: "4px 4px"
          }}
        />
        <button
          type="button"
          onClick={onReplay}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition hover:scale-105 sm:h-20 sm:w-20"
          aria-label="Start Teleaon voice conversation"
        >
          {isActive ? (
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  className="block w-1.5 rounded-full bg-slate-950"
                  animate={{ height: isListening ? [8, 16, 10] : [10, 22, 12] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: bar * 0.12 }}
                />
              ))}
            </span>
          ) : (
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
          )}
        </button>
      </motion.div>
    </div>
  );
}

function MiniCustomerCard() {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#dbeafe,#7dd3fc)]" />
        <div>
          <div className="text-sm font-semibold text-slate-950">Customer</div>
          <div className="text-xs text-slate-500">Asking about enterprise plan</div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-slate-950/[0.04] p-3 text-sm leading-6 text-slate-700">
        “Can this connect to our CRM and book a demo for my team?”
      </div>
    </div>
  );
}

function InsightCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold text-cyan">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
