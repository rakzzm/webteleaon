"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AIPlatformLampHeroProps = {
  className?: string;
};

export function AIPlatformLampHero({ className }: AIPlatformLampHeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[540px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-[0_40px_120px_rgba(14,116,144,0.20)]",
        className
      )}
      aria-label="AI Platform neural control center visual"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(40,199,232,0.20),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(224,0,131,0.18),transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.45, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible text-white"
          style={{
            backgroundImage: "conic-gradient(from 70deg at center top, rgba(40,199,232,0.95), transparent 35%, transparent 70%)"
          }}
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.45, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto left-1/2 h-56 text-white"
          style={{
            backgroundImage: "conic-gradient(from 290deg at center top, transparent 0%, transparent 35%, rgba(40,199,232,0.95) 100%)"
          }}
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-cyan blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-cyan"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>

      <div className="absolute inset-x-6 bottom-6 z-50 grid gap-3 sm:grid-cols-3">
        {[
          ["Agent builder", "Design"],
          ["Model router", "Orchestrate"],
          ["Governance", "Control"]
        ].map(([title, label]) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan">{label}</div>
            <div className="mt-2 text-sm font-semibold">{title}</div>
          </motion.div>
        ))}
      </div>

      <div className="absolute left-1/2 top-[44%] z-50 w-[min(30rem,84%)] -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          initial={{ opacity: 0.5, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-br from-slate-100 via-cyan to-slate-500 bg-clip-text py-4 text-4xl font-semibold tracking-normal text-transparent md:text-6xl"
        >
          Build agents
          <br />
          the governed way
        </motion.div>
      </div>
    </div>
  );
}
