"use client";

import { motion } from "framer-motion";
import { StarTrailBackground } from "@/components/sections/StarTrailBackground";
import type { VisualVariant } from "@/data/site";
import { cn } from "@/lib/utils";

type AIHeroVisualProps = {
  type: VisualVariant;
  title: string;
  videoSrc?: string;
  modelVariant?: string;
  accentColor?: string;
  className?: string;
};

const signalColumns = [
  [28, 46, 70, 96, 126],
  [38, 62, 88, 118],
  [22, 52, 78, 106, 136],
  [44, 76, 108],
  [32, 58, 88, 120]
];

export function AIHeroVisual({ type, title, videoSrc, accentColor = "#28c7e8", className }: AIHeroVisualProps) {
  const isHome = type === "home";
  const isProductVisual = type === "saas" || type === "infrastructure" || type === "platform" || type === "genai";

  if (isProductVisual) {
    return (
      <div className={cn("relative h-[500px] overflow-hidden rounded-[15px]", className)} aria-label={`${title} production AI visual`}>
        {type === "saas" ? <StarTrailBackground particleAmount={180} className="absolute inset-0 h-full" /> : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              type === "saas"
                ? "radial-gradient(circle at 50% 46%, rgba(40,199,232,0.20), transparent 34%), linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.76))"
                : `radial-gradient(circle at 50% 44%, ${accentColor}22, transparent 34%), radial-gradient(circle at 76% 24%, rgba(224,0,131,0.16), transparent 30%), linear-gradient(135deg, #020403 0%, #08121c 52%, #020403 100%)`
          }}
        />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:36px_36px]" />
        <ProductHeroScene type={type} title={title} accentColor={accentColor} />
      </div>
    );
  }

  return (
    <div
      className={cn("relative h-[380px] overflow-hidden rounded-none border-0 bg-transparent shadow-none", className)}
      aria-label={`${title} AI visual`}
    >
      {/* Replace this placeholder with a real 3D AI video by passing videoSrc from /public/videos. */}
      {videoSrc ? (
        <video className="absolute inset-0 h-full w-full object-cover opacity-80" src={videoSrc} autoPlay muted loop playsInline />
      ) : null}

      <div
        className="absolute left-1/2 top-1/2 h-[300px] w-[min(1050px,100%)] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(120, 140, 145, 0.28) 1.15px, transparent 1.2px)",
          backgroundSize: "17px 17px",
          maskImage: "radial-gradient(ellipse at center, black 0%, black 38%, transparent 78%)"
        }}
      />
      <div className="absolute inset-x-0 top-10 mx-auto h-[300px] max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(40,199,232,0.08),transparent_42%)]" />

      <motion.div
        className="absolute left-1/2 top-[50%] h-[214px] w-[214px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-[#1f2a2f] bg-[#030707]/55 backdrop-blur-[1px]"
        initial={{ opacity: 0.86, scale: 0.985 }}
        animate={{ opacity: [0.86, 1, 0.9], scale: [0.985, 1, 0.985] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: `0 0 70px ${accentColor}12, inset 0 0 38px rgba(255,255,255,0.025)`
        }}
      >
        <div
          className="absolute inset-5 opacity-80"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(140, 158, 164, 0.38) 1.25px, transparent 1.3px)",
            backgroundSize: "17px 17px"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_64%,rgba(40,199,232,0.13),transparent_28%)]" />
        <div className="absolute bottom-7 right-7 flex h-[116px] items-end gap-[6px]">
          {signalColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col-reverse gap-[6px]">
              {column.map((height, dotIndex) => (
                <motion.span
                  key={`${columnIndex}-${height}`}
                  className="block h-[5px] w-[5px] rounded-[1px]"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 ${10 + dotIndex * 2}px ${accentColor}`
                  }}
                  animate={{ opacity: [0.18, 0.95, 0.34] }}
                  transition={{
                    duration: 1.8,
                    delay: columnIndex * 0.16 + dotIndex * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030707] to-transparent" />
      </motion.div>

      {isHome ? <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink via-ink/80 to-transparent" /> : null}
    </div>
  );
}

function ProductHeroScene({ type, title, accentColor }: { type: VisualVariant; title: string; accentColor: string }) {
  const labels =
    type === "saas"
      ? ["Apps", "Agents", "CRM", "Docs", "Analytics", "Support"]
      : type === "infrastructure"
        ? ["GPU", "Gateway", "Vector", "Models", "Telemetry", "CI/CD"]
        : type === "platform"
          ? ["Builder", "Tools", "Memory", "Guardrails", "Evals", "Governance"]
          : ["RAG", "Search", "Docs", "Citations", "Copilots", "LLM"];

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="relative h-[390px] w-full max-w-4xl [perspective:1200px]">
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-white/[0.045] shadow-[0_40px_120px_rgba(0,0,0,0.40)] backdrop-blur-xl [transform-style:preserve-3d]"
          animate={{ rotateX: [58, 62, 58], rotateZ: [44, 48, 44] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: `0 0 90px ${accentColor}22, inset 0 0 40px rgba(255,255,255,0.04)` }}
        >
          <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/25" />
          <div
            className="absolute inset-9 rounded-2xl opacity-80"
            style={{
              backgroundImage: `radial-gradient(circle, ${accentColor} 1.5px, transparent 1.7px)`,
              backgroundSize: "18px 18px"
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.56, 0.9, 0.56] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: `radial-gradient(circle, ${accentColor}66, ${accentColor}16 55%, transparent 72%)` }}
          />
        </motion.div>

        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2;
          const x = Math.cos(angle) * 300;
          const y = Math.sin(angle) * 132;

          return (
            <motion.div
              key={label}
              className="absolute left-1/2 top-1/2 min-w-28 rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.92 }}
              animate={{
                opacity: [0.68, 1, 0.68],
                x,
                y,
                scale: [0.98, 1.04, 0.98]
              }}
              transition={{ duration: 5.8, delay: index * 0.15, repeat: Infinity, ease: "easeInOut" }}
              style={{ borderColor: `${accentColor}33`, boxShadow: `0 0 34px ${accentColor}16` }}
            >
              <span className="mx-auto mb-2 block h-1 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
              {label}
            </motion.div>
          );
        })}

        <div className="absolute bottom-2 left-1/2 w-[min(620px,92%)] -translate-x-1/2 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Production model</div>
              <div className="mt-1 text-base font-semibold text-white">{title}</div>
            </div>
            <div className="hidden grid-cols-4 gap-2 sm:grid">
              {[0.55, 0.78, 0.44, 0.9].map((height, index) => (
                <motion.span
                  key={index}
                  className="block w-3 rounded-full"
                  animate={{ height: [22, 22 + height * 36, 22] }}
                  transition={{ duration: 2.2, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundColor: accentColor }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
