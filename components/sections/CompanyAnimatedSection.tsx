"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CompanyPattern = "aurora" | "ocean" | "sunset" | "emerald";

const patternTone: Record<CompanyPattern, string> = {
  aurora: "text-slate-950",
  ocean: "text-cyan-950",
  sunset: "text-rose-950",
  emerald: "text-emerald-950"
};

const washClasses: Record<CompanyPattern, string> = {
  aurora: "bg-[radial-gradient(circle_at_18%_18%,rgba(40,199,232,0.12),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(183,164,255,0.10),transparent_30%)]",
  ocean: "bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(14,165,233,0.10),transparent_32%)]",
  sunset: "bg-[radial-gradient(circle_at_20%_22%,rgba(251,191,36,0.10),transparent_30%),radial-gradient(circle_at_82%_25%,rgba(236,72,153,0.10),transparent_30%)]",
  emerald: "bg-[radial-gradient(circle_at_18%_30%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(45,212,191,0.10),transparent_30%)]"
};

function FloatingPaths({ position, className }: { position: number; className?: string }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03
  }));

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.45 }}
            animate={{
              pathLength: 1,
              opacity: [0.22, 0.5, 0.22],
              pathOffset: [0, 1, 0]
            }}
            transition={{
              duration: 20 + path.id * 0.28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function CompanyAnimatedSection({
  children,
  id,
  className,
  pattern = "aurora"
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  pattern?: CompanyPattern;
}) {
  return (
    <section id={id} className={cn("company-path-section relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24", className)}>
      <div className={cn("absolute inset-0", washClasses[pattern])} />
      <FloatingPaths position={1} className={cn("opacity-90", patternTone[pattern])} />
      <FloatingPaths position={-1} className={cn("opacity-70", patternTone[pattern])} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
