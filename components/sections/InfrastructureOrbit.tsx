"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileCard } from "@/components/sections/FileCard";

type OrbitFile = {
  format: "doc" | "pdf" | "tsx" | "pptx" | "video" | "zip" | "csv";
  radius: number;
  duration: number;
  delay: number;
  start: number;
  reverse?: boolean;
};

const orbitFiles: OrbitFile[] = [
  { format: "doc", radius: 88, duration: 18, delay: 0, start: -30 },
  { format: "pdf", radius: 116, duration: 24, delay: 0.4, start: 20, reverse: true },
  { format: "tsx", radius: 130, duration: 28, delay: 1.2, start: 78 },
  { format: "pptx", radius: 106, duration: 21, delay: 0.8, start: 148, reverse: true },
  { format: "video", radius: 128, duration: 26, delay: 1.6, start: 210 },
  { format: "zip", radius: 96, duration: 19, delay: 2.1, start: 270, reverse: true },
  { format: "csv", radius: 120, duration: 23, delay: 1, start: 322 }
];

export function InfrastructureOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-[360px] w-full max-w-md">
      <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-400/20" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(40,199,232,0.22),transparent,rgba(224,0,131,0.18),transparent)] opacity-70 blur-sm"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {orbitFiles.map((file) => {
        const rotation = file.reverse ? [file.start, file.start - 360] : [file.start, file.start + 360];

        return (
          <motion.div
            key={file.format}
            className="absolute inset-0"
            animate={reduceMotion ? undefined : { rotate: rotation }}
            transition={{ duration: file.duration, repeat: Infinity, ease: "linear", delay: file.delay }}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translateX(${file.radius}px)`
              }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { rotate: file.reverse ? [0, 360] : [0, -360], y: [0, -5, 0, 4, 0] }}
                transition={{
                  rotate: { duration: file.duration, repeat: Infinity, ease: "linear", delay: file.delay },
                  y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: file.delay }
                }}
              >
                <FileCard formatFile={file.format} className="drop-shadow-[0_18px_40px_rgba(15,23,42,0.18)]" />
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-cyan/30 bg-slate-950 text-center shadow-[0_0_60px_rgba(40,199,232,0.25)]">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan"
          animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Secure AI Core
        </motion.span>
      </div>
    </div>
  );
}
