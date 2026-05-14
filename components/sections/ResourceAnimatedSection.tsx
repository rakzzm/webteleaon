"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { InteractiveGradientBackground } from "@/components/sections/InteractiveGradientBackground";
import { cn } from "@/lib/utils";

type ResourceAnimatedSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "liquid" | "interactive-light" | "interactive-dark";
};

export function ResourceAnimatedSection({ children, id, className, variant = "interactive-light" }: ResourceAnimatedSectionProps) {
  if (variant === "liquid") {
    return (
      <section id={id} className={cn("relative overflow-hidden py-16 sm:py-20 lg:py-24", className)}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0.72, scale: 1.02, rotate: 2 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          >
            <LiquidMetal
              style={{ width: "100%", height: "100%", filter: "blur(10px)" }}
              colorBack="hsl(0, 0%, 0%, 0)"
              colorTint="hsl(29, 77%, 49%)"
              repetition={4}
              softness={0.6}
              shiftRed={0.25}
              shiftBlue={0.25}
              distortion={0.12}
              contour={1}
              shape="none"
              offsetX={0}
              offsetY={0}
              scale={1}
              rotation={25}
              speed={2}
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(40,199,232,0.18),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.84),rgba(15,23,42,0.70)_48%,rgba(28,9,45,0.84))]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
      </section>
    );
  }

  const dark = variant === "interactive-dark";

  return (
    <InteractiveGradientBackground
      dark={dark}
      intensity={0.42}
      initialOffset={{ x: dark ? -60 : 90, y: dark ? 30 : -20 }}
      className={cn("py-16 sm:py-20 lg:py-24", className)}
    >
      <div className={cn("absolute inset-0", dark ? "bg-slate-950/68" : "bg-slate-950/52")} />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </InteractiveGradientBackground>
  );
}
