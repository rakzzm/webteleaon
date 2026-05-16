"use client";

import { motion } from "framer-motion";
import { Building2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type ShapeGradient = "indigo" | "rose" | "violet" | "amber" | "cyan";
const smoothEase = [0.25, 0.4, 0.25, 1] as const;

const shapeGradients: Record<ShapeGradient, string> = {
  indigo: "from-indigo-500/[0.18]",
  rose: "from-rose-500/[0.18]",
  violet: "from-violet-500/[0.18]",
  amber: "from-amber-500/[0.18]",
  cyan: "from-cyan-500/[0.18]"
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "indigo"
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: ShapeGradient;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 }
      }}
      className={cn("absolute", className)}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r to-transparent",
            shapeGradients[gradient],
            "border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px]",
            "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function CompanyGeometricHero({
  title,
  headline,
  subheadline
}: {
  title: string;
  headline: string;
  subheadline: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + index * 0.2,
        ease: smoothEase
      }
    })
  };

  return (
    <section className="relative flex min-h-[calc(100vh-8.25rem)] w-full items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="indigo" className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="rose" className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="violet" className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="amber" className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="cyan" className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 text-center sm:px-6 lg:px-8">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 md:mb-12"
        >
          <Circle className="h-2 w-2 fill-rose-500/80 text-rose-500/80" aria-hidden="true" />
          <span className="text-sm tracking-wide text-white/60">{title}</span>
        </motion.div>

        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h1 className="mx-auto max-w-5xl text-balance text-4xl font-bold tracking-normal sm:text-6xl md:text-7xl lg:text-[5.2rem] lg:leading-[1.02]">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">{headline}</span>
          </h1>
        </motion.div>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <p className="mx-auto mt-7 max-w-3xl px-4 text-base font-light leading-8 tracking-wide text-white/48 sm:text-lg md:text-xl">{subheadline}</p>
        </motion.div>

        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/contact-us">Talk to Teleaon AI</Button>
          <Button href="/company/security" variant="secondary">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            View Trust Model
          </Button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </section>
  );
}
