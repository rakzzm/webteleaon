"use client";

import * as React from "react";
import type { HTMLMotionProps, MotionValue } from "framer-motion";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Cpu, DatabaseZap, GitBranch, LockKeyhole, MonitorDot, Network, ServerCog } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimateT = "left" | "right" | "top" | "bottom" | "z" | "blur" | undefined;

const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3
} as const;

const useAnimationVariants = (animate: AnimateT) =>
  React.useMemo(
    () => ({
      hidden: {
        x: animate === "left" ? "-100%" : animate === "right" ? "100%" : 0,
        y: animate === "top" ? "-100%" : animate === "bottom" ? "100%" : 0,
        scale: animate === "z" ? 0 : 1,
        filter: animate === "blur" ? "blur(10px)" : "blur(0px)",
        opacity: 0
      },
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1
      }
    }),
    [animate]
  );

const ContainerStagger = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(({ children, className, transition, viewport, ...props }, ref) => {
  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewport?.once ?? true, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren || 0.16,
        ...transition
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
ContainerStagger.displayName = "ContainerStagger";

interface ContainerAnimatedProps extends HTMLMotionProps<"div"> {
  animation?: AnimateT;
}

interface ContainerScrollValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = React.createContext<ContainerScrollValue | undefined>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext must be used within <ContainerScroll> component");
  }
  return context;
}

type ContainerScrollProps = React.HTMLAttributes<HTMLDivElement>;

const ContainerScroll = ({ children, className, ...props }: ContainerScrollProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <section className={cn("relative min-h-[440px] w-full", className)} {...props} ref={scrollRef}>
        {children}
      </section>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

const ContainerAnimated = React.forwardRef<HTMLDivElement, ContainerAnimatedProps>(({ animation, children, className, transition, ...props }, ref) => {
  const variants = useAnimationVariants(animation);

  return (
    <motion.div transition={transition ?? springConfig} ref={ref} variants={variants} className={className} {...props}>
      {children}
    </motion.div>
  );
});
ContainerAnimated.displayName = "ContainerAnimated";

interface ContainerInsetProps extends HTMLMotionProps<"div"> {
  translateYRange?: [string, string];
  insetYRange?: [number, number];
  insetXRange?: [number, number];
  roundednessRange?: [number, number];
}

const ContainerInset = React.forwardRef<HTMLDivElement, ContainerInsetProps>(
  (
    {
      translateYRange = ["-12%", "10%"],
      insetYRange = [18, 2],
      insetXRange = [24, 2],
      roundednessRange = [120, 28],
      children,
      className,
      transition,
      style,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();
    const y = useTransform(scrollYProgress, [0, 1], translateYRange);
    const insetY = useTransform(scrollYProgress, [0, 1], insetYRange);
    const insetX = useTransform(scrollYProgress, [0, 1], insetXRange);
    const roundedness = useTransform(scrollYProgress, [0, 1], roundednessRange);
    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

    const motionStyle = React.useMemo(() => ({ y, clipPath, ...style }), [y, clipPath, style]);

    return (
      <motion.div
        transition={transition ?? springConfig}
        ref={ref}
        className={cn("origin-top overflow-hidden", className)}
        style={motionStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ContainerInset.displayName = "ContainerInset";

export function AIInfrastructureScrollHero() {
  const metrics = [
    ["GPU pool", "72%"],
    ["P95 latency", "186ms"],
    ["Models", "18"],
    ["Traces", "100%"]
  ];

  const nodes = [
    { title: "Gateway", icon: Network, className: "left-6 top-20" },
    { title: "Models", icon: ServerCog, className: "right-8 top-16" },
    { title: "Vector DB", icon: DatabaseZap, className: "left-10 bottom-24" },
    { title: "CI/CD", icon: GitBranch, className: "right-12 bottom-24" }
  ];

  return (
    <ContainerScroll className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-[0_28px_90px_rgba(14,116,144,0.14)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.22),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(59,130,246,0.20),transparent_34%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />

      <ContainerStagger className="relative z-10 h-full min-h-[440px] p-4">
        <ContainerAnimated animation="top" className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan">AI Infrastructure Control Plane</div>
              <div className="mt-2 text-xl font-semibold">Secure workload fabric</div>
            </div>
            <div className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-ink">Healthy</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                <div className="mt-2 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </ContainerAnimated>

        <div className="relative mt-4 h-[300px]">
          <ContainerInset className="absolute inset-0 rounded-[2rem] border border-slate-800 bg-slate-950 shadow-[0_28px_90px_rgba(2,6,23,0.32)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(40,199,232,0.28),transparent_32%),linear-gradient(135deg,#020617_0%,#071522_54%,#020617_100%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.45)_1px,transparent_1.5px)] [background-size:18px_18px]" />
            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-cyan/30 bg-cyan/10 text-cyan shadow-[0_0_80px_rgba(40,199,232,0.34)] backdrop-blur-xl">
              <Cpu className="h-10 w-10" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan/70 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          </ContainerInset>

          {nodes.map(({ title, icon: Icon, className }, index) => (
            <ContainerAnimated
              key={title}
              animation={index % 2 === 0 ? "left" : "right"}
              className={cn("absolute z-20 rounded-2xl border border-slate-200 bg-white/88 p-4 shadow-xl backdrop-blur-xl", className)}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/12 text-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-950">{title}</div>
                  <div className="text-xs text-slate-500">Connected</div>
                </div>
              </div>
            </ContainerAnimated>
          ))}

          <ContainerAnimated animation="bottom" className="absolute bottom-3 left-1/2 z-20 w-[min(88%,32rem)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 text-cyan" />
              <div>
                <div className="text-sm font-semibold text-slate-950">Private runtime policy active</div>
                <div className="text-xs leading-5 text-slate-500">Requests, deployments, model routing, and retrieval traffic are monitored end to end.</div>
              </div>
              <MonitorDot className="ml-auto hidden h-5 w-5 text-cyan sm:block" />
            </div>
          </ContainerAnimated>
        </div>
      </ContainerStagger>
    </ContainerScroll>
  );
}

export { ContainerAnimated, ContainerInset, ContainerScroll, ContainerStagger };
