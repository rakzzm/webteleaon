"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Folder } from "@/components/sections/Folder";
import { cn } from "@/lib/utils";

type LifecycleIcon = {
  label: string;
  color: "blue" | "red";
  size: "sm" | "md" | "lg";
  className: string;
  duration: number;
  delay: number;
  path: {
    x: number[];
    y: number[];
    rotate: number[];
  };
};

const lifecycleIcons: LifecycleIcon[] = [
  {
    label: "SaaS",
    color: "blue",
    size: "lg",
    className: "left-[56%] top-[6%] scale-[0.68] opacity-45 sm:left-[5%] sm:top-[10%] sm:scale-100 sm:opacity-90",
    duration: 22,
    delay: 0,
    path: { x: [0, 90, 210, 120, -10, 0], y: [0, 72, 10, 210, 160, 0], rotate: [-10, 4, 12, -4, -14, -10] }
  },
  {
    label: "Gen AI",
    color: "blue",
    size: "md",
    className: "right-[4%] top-[22%] scale-75 opacity-44 sm:right-[8%] sm:top-[8%] sm:scale-100 sm:opacity-78",
    duration: 19,
    delay: 1.6,
    path: { x: [0, -150, -250, -120, 20, 0], y: [0, 120, 250, 320, 120, 0], rotate: [9, -8, -15, 5, 13, 9] }
  },
  {
    label: "Infra",
    color: "red",
    size: "md",
    className: "bottom-[8%] left-[2%] scale-75 opacity-42 sm:left-[16%] sm:scale-100 sm:opacity-76",
    duration: 24,
    delay: 0.8,
    path: { x: [0, 130, 310, 260, 80, 0], y: [0, -135, -220, -40, 35, 0], rotate: [7, 15, -6, -14, 4, 7] }
  },
  {
    label: "Agents",
    color: "red",
    size: "sm",
    className: "bottom-[20%] right-[7%] scale-75 opacity-42 sm:bottom-[12%] sm:right-[25%] sm:scale-100 sm:opacity-72",
    duration: 17,
    delay: 2.3,
    path: { x: [0, -80, -210, -120, 55, 0], y: [0, -85, 10, -190, -95, 0], rotate: [-8, 10, 18, -2, -16, -8] }
  },
  {
    label: "Ops",
    color: "blue",
    size: "sm",
    className: "right-[2%] bottom-[42%] scale-75 opacity-38 sm:right-[4%] sm:bottom-[33%] sm:scale-100 sm:opacity-64",
    duration: 21,
    delay: 3.1,
    path: { x: [0, -170, -300, -190, -40, 0], y: [0, 90, -60, -210, -115, 0], rotate: [14, -4, -16, 8, 20, 14] }
  }
];

export function ProductLifecycleIcons() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-white/22 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 260, 120, 0], y: [0, 90, 220, 0], opacity: [0.25, 0.48, 0.34, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[4%] bottom-[12%] h-80 w-80 rounded-full bg-cyan/22 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -260, -80, 0], y: [0, -140, 60, 0], opacity: [0.2, 0.45, 0.28, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {lifecycleIcons.map((icon) => (
        <motion.div
          key={icon.label}
          className={cn("absolute will-change-transform", icon.className)}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: icon.path.x,
                  y: icon.path.y,
                  rotate: icon.path.rotate,
                  scale: [1, 1.08, 0.96, 1.04, 1]
                }
          }
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: icon.delay
          }}
        >
          <Folder
            color={icon.color}
            size={icon.size}
            label={icon.label}
            className="shadow-[0_30px_90px_rgba(15,23,42,0.18)] ring-1 ring-white/25"
          />
        </motion.div>
      ))}
    </div>
  );
}
