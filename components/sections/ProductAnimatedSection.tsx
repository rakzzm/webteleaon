"use client";

import type { ReactNode } from "react";
import ShaderAnimation from "@/components/ui/shader-animation";
import { cn } from "@/lib/utils";

type ProductAnimatedSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "shader" | "gradient";
};

export function ProductAnimatedSection({ children, id, className, variant = "shader" }: ProductAnimatedSectionProps) {
  if (variant === "shader") {
    return (
      <section id={id} className={cn("relative overflow-hidden py-16 sm:py-20 lg:py-24", className)}>
        <ShaderAnimation
          backgroundOnly
          showControls={false}
          showDemoOverlay={false}
          className="absolute inset-0"
          canvasClassName="opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(40,199,232,0.22),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.78),rgba(10,18,38,0.62)_50%,rgba(34,8,48,0.78))]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} className={cn("relative overflow-hidden py-16 sm:py-20 lg:py-24", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,174,239,0.95),rgba(224,0,131,0.90),rgba(123,92,255,0.92),rgba(0,222,178,0.86))] bg-[length:300%_300%] animate-gradient-shift" />
      <div className="absolute inset-0 bg-slate-950/64" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
