"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingPaths({ position, className }: { position: number; className?: string }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.75 + i * 0.035
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.12 + path.id * 0.02}
            initial={{ pathLength: 0.28, opacity: 0.52 }}
            animate={{
              pathLength: 1,
              opacity: [0.34, 0.72, 0.34],
              pathOffset: [0, 1, 0]
            }}
            transition={{
              duration: 18 + path.id * 0.26,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPathsLayer({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <FloatingPaths position={1} className="scale-125 text-slate-950 opacity-90" />
      <FloatingPaths position={-1} className="scale-125 text-slate-950 opacity-75" />
    </div>
  );
}
