import type { Metadata } from "next";
import { BackgroundPathsLayer } from "@/components/sections/BackgroundPathsLayer";
import { CodeShowcase } from "@/components/sections/CodeShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { GooeyBackground } from "@/components/sections/GooeyBackground";
import { HeroVideoBot } from "@/components/sections/HeroVideoBot";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SpiralAnimationBackground } from "@/components/sections/SpiralAnimationBackground";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WritingSectionHeading } from "@/components/sections/WritingSectionHeading";
import { Section, SectionHeading } from "@/components/ui/Section";
import { productCards, solutionCards, useCaseCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Enterprise AI Platform, SaaS, and Infrastructure",
  description: "Build, deploy, and scale intelligent AI systems for the modern enterprise with agentic applications, secure infrastructure, and governance."
};

export default function HomePage() {
  return (
    <>
      <HeroVideoBot />

      <Section className="powering-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.68),transparent_28%),radial-gradient(circle_at_84%_50%,rgba(40,199,232,0.18),transparent_34%),linear-gradient(135deg,#ffffff_0%,#e9fbff_46%,#fff0f8_100%)]" aria-hidden="true" />
        <BackgroundPathsLayer className="z-[1]" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.08)_44%,rgba(255,255,255,0.22)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
          <div>
            <SectionHeading title="Powering realtime enterprise agents" description="Built for teams that need low-latency conversations, tool use, governance, and production observability in one platform." />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["OpenAI", "Anthropic", "Databricks", "ServiceNow", "Salesforce", "Twilio", "Snowflake", "Microsoft"].map((logo) => (
              <div key={logo} className="grid h-20 place-items-center rounded-xl border border-white/70 bg-white/75 text-sm font-semibold text-slate-700 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-md">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="api-aurora-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 z-0 bg-zinc-50" aria-hidden="true" />
        <div className="api-aurora-background absolute inset-0 z-[1]" aria-hidden="true" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.18)_38%,rgba(255,255,255,0.72)_78%),linear-gradient(90deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.24)_44%,rgba(255,255,255,0.52)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-24">
          <SectionHeading title="Simple and powerful APIs" description="Developers get code-first control. Enterprise teams get secure deployment, observability, and reusable operating patterns." />
          <CodeShowcase />
        </div>
      </Section>

      <Section className="how-light-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#ffffff_0%,#f4fdff_48%,#fff2fa_100%)]" aria-hidden="true" />
        <GooeyBackground />
        <div className="absolute inset-0 z-[2] opacity-35 [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
        <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.14))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading title="How it works" description="Teleaon connects channels, realtime AI, tools, and governance so agents can move from conversation to action." align="center" />
          <HowItWorks />
        </div>
      </Section>

      <Section className="isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.42),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(255,255,255,0.30),transparent_28%),linear-gradient(135deg,#17c9f4_0%,#3b82f6_42%,#e00083_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(2,4,3,0.16))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading title="Products for the full agent lifecycle" description="Build applications, run infrastructure, orchestrate models, and deploy generative AI systems from a connected product portfolio." />
          <FeatureGrid items={productCards} />
        </div>
      </Section>

      <Section className="enterprise-file-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
        <SpiralAnimationBackground className="absolute inset-0 z-[1] overflow-hidden opacity-95" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,rgba(40,199,232,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(224,0,131,0.14),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.36)_46%,rgba(0,0,0,0.70)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 z-[3] opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <SectionHeading title="Enterprise grade infrastructure" description="Run realtime agents across global regions with monitoring, controls, and compliance evidence for production teams." />
            <StatsSection variant="dark" />
          </div>
          <div className="relative min-h-[390px] overflow-hidden rounded-3xl border border-white/15 bg-black/38 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(40,199,232,0.24),transparent_42%)]" />
            <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
            <div className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-pink-400/35 to-transparent" />
            <div className="relative grid h-full min-h-[330px] place-items-center text-center">
              <div className="rounded-3xl border border-cyan/25 bg-black/48 p-8 shadow-[0_18px_60px_rgba(40,199,232,0.12)] backdrop-blur-xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Secure AI Core</div>
                <div className="mt-3 text-3xl font-semibold text-white">Governed infrastructure</div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">Policy controls, observability, deployment regions, and audit evidence for production AI systems.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="solutions-entropy-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(40,199,232,0.20),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(224,0,131,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f3fdff_48%,#fff1f9_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[8%] top-1/2 z-0 hidden -translate-y-1/2 lg:flex" aria-hidden="true">
          <div className="loader solutions-loader">
            <div className="loader_cube loader_cube--glowing" />
            <div className="loader_cube loader_cube--color" />
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.58)_48%,rgba(255,255,255,0.18)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading title="Solutions for every operating model" description="Deploy agents where realtime interaction, secure automation, and enterprise integration matter most." />
          <FeatureGrid items={solutionCards} />
        </div>
      </Section>

      <Section className="agentic-usecase-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#07111f_0%,#073b4c_38%,#155e75_62%,#312e81_100%)]" aria-hidden="true" />
        <div className="usecase-waterflow absolute inset-0 z-[1]" aria-hidden="true">
          <span className="usecase-waterflow-sheet usecase-waterflow-sheet-1" />
          <span className="usecase-waterflow-sheet usecase-waterflow-sheet-2" />
          <span className="usecase-waterflow-sheet usecase-waterflow-sheet-3" />
          <span className="usecase-waterflow-ripple usecase-waterflow-ripple-1" />
          <span className="usecase-waterflow-ripple usecase-waterflow-ripple-2" />
        </div>
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_80%_72%,rgba(125,211,252,0.20),transparent_34%),linear-gradient(90deg,rgba(2,6,23,0.56)_0%,rgba(2,6,23,0.18)_48%,rgba(2,6,23,0.48)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading title="Agentic AI use cases" description="Start with one high-value agent or coordinate many through a shared operating layer." />
          <FeatureGrid items={useCaseCards} />
        </div>
      </Section>

      <Section className="testimonial-gradient-section isolate max-w-none overflow-hidden px-0 py-0">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(224,0,131,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(40,199,232,0.14),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f8fdff_48%,#fff7fc_100%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <WritingSectionHeading title="Chosen by teams moving AI into production" description="The strongest AI systems combine developer control, operational trust, and fast time to value." />
          <TestimonialSection variant="light" />
        </div>
      </Section>

      <Section className="isolate max-w-none overflow-hidden px-0 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.46),transparent_26%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.30),transparent_30%),linear-gradient(135deg,#0ea5e9_0%,#22d3ee_36%,#22c55e_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </Section>
    </>
  );
}
