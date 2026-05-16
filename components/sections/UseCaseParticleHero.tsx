import { DottedSurface } from "@/components/sections/DottedSurface";
import { ParticleTextEffect } from "@/components/sections/ParticleTextEffect";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

type UseCaseParticleHeroProps = {
  title: string;
  headline: string;
  subheadline: string;
  words: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function UseCaseParticleHero({
  title,
  headline,
  subheadline,
  words,
  primaryHref = "/contact-us",
  primaryLabel = "Plan an Agent Workflow",
  secondaryHref = "/use-case",
  secondaryLabel = "Explore Use Cases"
}: UseCaseParticleHeroProps) {
  return (
    <section className="usecase-particle-hero relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(40,199,232,0.18),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(224,0,131,0.16),transparent_32%),radial-gradient(circle_at_50%_86%,rgba(183,164,255,0.14),transparent_34%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">{title}</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref}>{primaryLabel}</Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_34px_120px_rgba(40,199,232,0.16)]">
          <ParticleTextEffect words={words} className="h-full w-full" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/55 px-4 py-3 text-xs text-slate-400 backdrop-blur-md">
            Right-click and drag across the canvas to disperse particles.
          </div>
        </div>
      </div>
    </section>
  );
}

export function UseCaseAnimatedSection({
  children,
  className = "",
  id,
  variant = "default"
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "split" | "matrix" | "rail" | "console" | "dual" | "architecture" | "integrations" | "proof" | "faq";
}) {
  const accent =
    variant === "rail"
      ? "from-emerald-400/18 via-cyan/10 to-transparent"
      : variant === "console"
        ? "from-violet-400/18 via-cyan/10 to-transparent"
        : variant === "dual"
          ? "from-pink-500/16 via-cyan/10 to-transparent"
          : variant === "architecture"
            ? "from-cyan/18 via-blue-500/10 to-transparent"
            : variant === "integrations"
              ? "from-white/12 via-cyan/10 to-transparent"
              : "from-cyan/16 via-fuchsia-500/10 to-transparent";

  return (
    <section id={id} className={`usecase-particle-section usecase-section-${variant} relative overflow-hidden px-5 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className="absolute inset-0 bg-black" />
      <DottedSurface className={variant === "console" || variant === "architecture" ? "opacity-85" : "opacity-58"} particleColor="light" />
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(40,199,232,0.14),transparent_30%),radial-gradient(circle_at_84%_28%,rgba(224,0,131,0.10),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
