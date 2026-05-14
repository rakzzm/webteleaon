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

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
          <div className="mb-4 flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-white">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10" style={{ color: palette[0] }}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold">Resource knowledge system</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">Readable content signals for enterprise AI teams.</div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureItems.map((item, index) => (
              <motion.div
                key={item}
                className="min-h-32 rounded-2xl border border-white/12 bg-slate-950/75 p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <span className="mb-4 block h-1 w-10 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                <span className="block text-sm font-semibold leading-6 text-slate-50">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-white backdrop-blur-xl">
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
