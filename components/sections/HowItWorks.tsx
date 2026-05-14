"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUp, BrainCog, FolderCode, Globe, Mic, Paperclip, Square, StopCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamTeleaonAgent } from "@/lib/teleaon-agent-client";

const workflowSteps = [
  {
    label: "Capture",
    title: "Bring every request into one agent layer",
    description: "Voice, chat, email, web, and uploaded context stream into Teleaon with identity, channel, and permission signals."
  },
  {
    label: "Reason",
    title: "Route the work through approved intelligence",
    description: "The agent selects search, deep reasoning, workspace memory, or code/canvas tools based on the customer intent."
  },
  {
    label: "Act",
    title: "Call tools and complete the workflow",
    description: "CRM updates, ticket creation, appointment booking, handoff notes, and analytics are written back automatically."
  }
];

const quickPrompts = [
  "Summarize this support call and update Salesforce.",
  "Search policy docs before answering the customer.",
  "Think through the renewal risk and draft next actions."
];

function VoiceRecorder({ isRecording, onStop }: { isRecording: boolean; onStop: (duration: number) => void }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRecording) return;

    const timer = window.setInterval(() => setTime((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const formatted = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="font-mono text-sm text-slate-700">{formatted}</span>
          <button
            type="button"
            onClick={() => onStop(time)}
            className="ml-2 rounded-full border border-red-400/40 px-2 py-1 text-xs text-red-600 transition hover:bg-red-500/10"
          >
            Stop
          </button>
        </div>
        <div className="flex h-10 w-full items-center justify-center gap-1 px-4">
          {Array.from({ length: 32 }).map((_, index) => (
            <span
              key={index}
              className="w-0.5 rounded-full bg-cyan/55"
              style={{
                height: `${24 + ((index * 17) % 72)}%`,
                animation: `pulse ${0.55 + (index % 5) * 0.08}s ease-in-out infinite`,
                animationDelay: `${index * 0.035}s`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const [input, setInput] = useState("Can you qualify this enterprise lead and book a follow-up with a solutions architect?");
  const [mode, setMode] = useState<"search" | "think" | "canvas" | null>("think");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activity, setActivity] = useState("Ready to route a customer request.");
  const [agentResponse, setAgentResponse] = useState("Ask the agent to qualify a lead, create a support plan, or prepare a CRM update.");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 176)}px`;
  }, [input]);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setActivity("Only image context is supported in this demo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(String(event.target?.result || ""));
      setActivity("Image context attached to the agent request.");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async () => {
    if (!input.trim() && !preview) {
      setIsRecording(true);
      setActivity("Voice capture started.");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);
    setAgentResponse("");
    setActivity(`${mode ? `${mode[0].toUpperCase()}${mode.slice(1)} mode: ` : ""}OpenAI stream connected.`);

    try {
      await streamTeleaonAgent({
        message: input || "Analyze the attached image context and propose the next action.",
        mode,
        surface: "command-center",
        context: preview ? "Image context is attached in the UI. The server currently receives text instructions only." : undefined,
        signal: controller.signal,
        onDelta: (delta) => setAgentResponse((current) => current + delta)
      });

      setActivity("OpenAI response completed. Review and approve the next action.");
      setInput("");
    } catch (error) {
      if (controller.signal.aborted) {
        setActivity("Generation stopped.");
      } else {
        setActivity("Agent stream failed. Check API configuration.");
        setAgentResponse(error instanceof Error ? error.message : "Unable to stream an agent response.");
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const toggleMode = (nextMode: "search" | "think" | "canvas") => {
    setMode((current) => (current === nextMode ? null : nextMode));
  };

  const modeOptions = [
    { id: "search" as const, label: "Search", Icon: Globe, color: "cyan" },
    { id: "think" as const, label: "Think", Icon: BrainCog, color: "violet" },
    { id: "canvas" as const, label: "Canvas", Icon: FolderCode, color: "orange" }
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/78 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(40,199,232,0.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(224,0,131,0.10),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.85),transparent_42%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/15 text-sm font-semibold text-cyan">{index + 1}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{step.label}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              {index < workflowSteps.length - 1 ? <ArrowRight className="absolute -bottom-5 left-8 hidden h-5 w-5 rotate-90 text-cyan/50 lg:block" /> : null}
            </motion.div>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="mb-3 flex items-center justify-between px-2 pt-1">
            <div>
              <p className="text-sm font-semibold text-slate-950">Agent command center</p>
              <p className="text-xs text-slate-600">{activity}</p>
            </div>
            <span className={cn("rounded-full px-2 py-1 text-xs", isLoading ? "bg-red-500/15 text-red-600" : "bg-emerald-500/15 text-emerald-700")}>
              {isLoading ? "Running" : "Ready"}
            </span>
          </div>

          {preview ? (
            <div className="relative mb-2 inline-flex">
              <button type="button" onClick={() => setSelectedImage(preview)} className="overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Attached context preview" className="h-16 w-16 object-cover" />
              </button>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-black text-white"
                aria-label="Remove attached image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : null}

          <div
            className={cn("rounded-3xl border border-slate-200 bg-white p-2 shadow-inner transition", isLoading && "border-red-500/70")}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const file = event.dataTransfer.files[0];
              if (file) processFile(file);
            }}
          >
            <div className={cn("transition", isRecording && "h-0 overflow-hidden opacity-0")}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={isLoading || isRecording}
                placeholder={mode === "search" ? "Search enterprise knowledge..." : mode === "canvas" ? "Create an agent workflow..." : "Ask the agent to reason through a workflow..."}
                className="min-h-11 w-full resize-none rounded-md border-none bg-transparent px-3 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-50"
                rows={1}
              />
            </div>

            <AnimatePresence>
              {isRecording ? (
                <VoiceRecorder
                  isRecording={isRecording}
                  onStop={(duration) => {
                    setIsRecording(false);
                    setActivity(`Voice message captured: ${duration}s. Transcript queued for routing.`);
                  }}
                />
              ) : null}
            </AnimatePresence>

            <div className="flex items-center justify-between gap-2 pt-2">
              <div className={cn("flex min-w-0 items-center gap-1", isRecording && "invisible h-0 opacity-0")}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Upload image"
                  title="Upload image"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) processFile(file);
                    event.currentTarget.value = "";
                  }}
                />

                <div className="flex items-center">
                  {modeOptions.map(({ id, label, Icon, color }, index) => (
                    <div key={id} className="flex items-center">
                      {index > 0 ? <div className="mx-1 h-6 w-px bg-gradient-to-t from-transparent via-violet-300/60 to-transparent" /> : null}
                      <button
                        type="button"
                        onClick={() => toggleMode(id)}
                        className={cn(
                          "flex h-8 items-center gap-1 rounded-full border px-2 py-1 text-slate-500 transition",
                          mode === id && color === "cyan" && "border-cyan bg-cyan/15 text-cyan",
                          mode === id && color === "violet" && "border-violet-400 bg-violet-500/15 text-violet-700",
                          mode === id && color === "orange" && "border-orange-400 bg-orange-500/15 text-orange-700",
                          mode !== id && "border-transparent hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <motion.span animate={{ rotate: mode === id ? 360 : 0, scale: mode === id ? 1.08 : 1 }} className="grid h-5 w-5 place-items-center">
                          <Icon className="h-4 w-4" />
                        </motion.span>
                        <AnimatePresence>
                          {mode === id ? (
                            <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden whitespace-nowrap text-xs">
                              {label}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isLoading) {
                    abortRef.current?.abort();
                    setIsLoading(false);
                    setActivity("Generation stopped.");
                  } else if (isRecording) {
                    setIsRecording(false);
                  } else {
                    handleSubmit();
                  }
                }}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition",
                  isLoading ? "bg-slate-950 text-white" : input.trim() || preview ? "bg-slate-950 text-white hover:bg-cyan hover:text-ink" : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
                aria-label={isLoading ? "Stop generation" : input.trim() || preview ? "Send message" : "Voice message"}
                title={isLoading ? "Stop generation" : input.trim() || preview ? "Send message" : "Voice message"}
              >
                {isLoading ? <Square className="h-4 w-4 fill-current" /> : isRecording ? <StopCircle className="h-5 w-5 text-red-500" /> : input.trim() || preview ? <ArrowUp className="h-4 w-4" /> : <Mic className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <div className="rounded-2xl border border-cyan/20 bg-cyan/8 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Live TeleaonAI response</span>
                <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_14px_rgba(40,199,232,0.8)]" />
              </div>
              <p className="min-h-20 whitespace-pre-wrap text-sm leading-6 text-slate-700">{agentResponse}</p>
            </div>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setInput(prompt)}
                className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-cyan/40 hover:bg-white hover:text-slate-950"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <button type="button" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" aria-label="Close preview">
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedImage} alt="Full preview" className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
