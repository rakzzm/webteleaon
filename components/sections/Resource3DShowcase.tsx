"use client";

import { motion } from "framer-motion";
import { BookOpenText, Boxes, FileText, PlayCircle, Search, ShieldCheck } from "lucide-react";
import type { PageContent } from "@/data/site";

const iconMap = {
  blog: BookOpenText,
  documentation: Boxes,
  "case-studies": Search,
  whitepapers: FileText,
  webinars: PlayCircle
};

const paletteMap = {
  blog: ["#38bdf8", "#f472b6", "#a3e635"],
  documentation: ["#10b981", "#22d3ee", "#eab308"],
  "case-studies": ["#f59e0b", "#22d3ee", "#94a3b8"],
  whitepapers: ["#e00083", "#8b5cf6", "#22d3ee"],
  webinars: ["#a78bfa", "#ec4899", "#38bdf8"]
};

export function Resource3DShowcase({ page }: { page: PageContent }) {
  const Icon = iconMap[page.slug as keyof typeof iconMap] ?? FileText;
  const palette = paletteMap[page.slug as keyof typeof paletteMap] ?? ["#28c7e8", "#8b5cf6", "#e00083"];
  const featureItems = page.capabilities.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-14 lg:py-20">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            `radial-gradient(circle at 18% 20%, ${palette[0]}26, transparent 30%), ` +
            `radial-gradient(circle at 82% 36%, ${palette[1]}22, transparent 32%), ` +
            `radial-gradient(circle at 52% 90%, ${palette[2]}1f, transparent 36%), #020617`
        }}
      />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: palette[0] }}>
            Resource Intelligence
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold text-white sm:text-5xl">
            Interactive resource hub for {page.title.toLowerCase()}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Each resource page now carries a different visual system, with animated knowledge panels, floating content nodes, and a 3D-style information core.
          </p>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl [perspective:1200px]">
          <motion.div
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-white/[0.06] shadow-[0_35px_90px_rgba(0,0,0,0.30)] backdrop-blur-xl [transform-style:preserve-3d]"
            animate={{ rotateX: [54, 62, 54], rotateZ: [42, 48, 42] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: `0 0 90px ${palette[0]}26, inset 0 0 40px rgba(255,255,255,0.04)` }}
          >
            <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/20" />
            <div
              className="absolute inset-8 rounded-2xl opacity-80"
              style={{
                backgroundImage: `radial-gradient(circle, ${palette[0]} 1.5px, transparent 1.7px)`,
                backgroundSize: "16px 16px"
              }}
            />
            <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-black/30">
              <Icon className="h-9 w-9" style={{ color: palette[0] }} />
            </div>
          </motion.div>

          {featureItems.map((item, index) => {
            const angle = (index / featureItems.length) * Math.PI * 2 - Math.PI / 5;
            const x = Math.cos(angle) * 220;
            const y = Math.sin(angle) * 116;

            return (
              <motion.div
                key={item}
                className="absolute left-1/2 top-1/2 w-52 rounded-2xl border border-white/10 bg-black/28 p-4 text-sm text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, x, y, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                animate={{ y: [y, y - 8, y], opacity: [0.78, 1, 0.78] }}
                transition={{
                  duration: 4.8,
                  delay: index * 0.16,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="mb-3 block h-1 w-10 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                <span className="font-semibold">{item}</span>
              </motion.div>
            );
          })}

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-white backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" style={{ color: palette[0] }} />
              <div>
                <div className="text-sm font-semibold">Curated for enterprise AI teams</div>
                <div className="text-xs leading-5 text-slate-400">Architecture, governance, implementation patterns, and measurable operating outcomes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
