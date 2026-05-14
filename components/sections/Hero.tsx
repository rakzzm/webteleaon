import { Button } from "@/components/ui/Button";
import { AIHeroVisual } from "./AIHeroVisual";
import type { VisualVariant } from "@/data/site";

type HeroProps = {
  headline: string;
  subheadline: string;
  visual: VisualVariant;
  title: string;
  accentColor?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function Hero({
  headline,
  subheadline,
  visual,
  title,
  accentColor,
  primaryHref = "/contact-us",
  primaryLabel = "Book a Demo",
  secondaryHref = "/products",
  secondaryLabel = "Explore Products"
}: HeroProps) {
  const theme = getHeroTheme(visual, accentColor ?? "#28c7e8");

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          `radial-gradient(circle at 18% 18%, ${theme.primary}38, transparent 30%), ` +
          `radial-gradient(circle at 78% 26%, ${theme.secondary}30, transparent 32%), ` +
          `radial-gradient(circle at 50% 84%, ${theme.tertiary}26, transparent 36%), ` +
          `linear-gradient(135deg, ${theme.from} 0%, ${theme.mid} 48%, ${theme.to} 100%)`
      }}
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
          backgroundSize: "38px 38px"
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44"
        style={{ background: `linear-gradient(to top, ${theme.bottom}, transparent)` }}
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-8.25rem)] max-w-7xl flex-col items-center px-5 pb-12 pt-24 text-center sm:px-6 lg:px-8">
        <AIHeroVisual type={visual} title={title} accentColor={accentColor ?? "#28c7e8"} modelVariant={title} className="mb-10 w-full max-w-6xl" />
        <div className="max-w-6xl">
          <h1 className="text-balance text-5xl font-light tracking-normal text-white sm:text-7xl lg:text-[4.3rem] lg:leading-[1.08]">
            {renderHeadline(headline)}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-balance text-lg leading-8 text-slate-300 sm:text-2xl sm:leading-10">{subheadline}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={primaryHref}>{primaryLabel}</Button>
            <Button href={secondaryHref} variant="secondary">{secondaryLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderHeadline(headline: string) {
  if (!headline.includes("voice")) return headline;
  return (
    <>
      Build <span className="text-cyan">voice</span>, <span className="text-cyan">video</span>, and{" "}
      <span className="text-cyan">workflow AI</span> agents
    </>
  );
}

function getHeroTheme(visual: VisualVariant, accentColor: string) {
  const themes: Partial<Record<VisualVariant, { primary: string; secondary: string; tertiary: string; from: string; mid: string; to: string; grid: string; bottom: string }>> = {
    voice: {
      primary: "#22d3ee",
      secondary: "#0ea5e9",
      tertiary: "#14b8a6",
      from: "#020617",
      mid: "#06243a",
      to: "#031b20",
      grid: "rgba(34,211,238,0.12)",
      bottom: "#031b20"
    },
    chat: {
      primary: "#34d399",
      secondary: "#22d3ee",
      tertiary: "#84cc16",
      from: "#031712",
      mid: "#06342d",
      to: "#021f2b",
      grid: "rgba(52,211,153,0.13)",
      bottom: "#031712"
    },
    video: {
      primary: "#a78bfa",
      secondary: "#ec4899",
      tertiary: "#38bdf8",
      from: "#10051f",
      mid: "#25104c",
      to: "#05172f",
      grid: "rgba(167,139,250,0.13)",
      bottom: "#10051f"
    },
    email: {
      primary: "#60a5fa",
      secondary: "#f97316",
      tertiary: "#f472b6",
      from: "#07111f",
      mid: "#142b4f",
      to: "#2b1308",
      grid: "rgba(96,165,250,0.12)",
      bottom: "#07111f"
    },
    os: {
      primary: "#8b5cf6",
      secondary: "#22d3ee",
      tertiary: "#f43f5e",
      from: "#09051f",
      mid: "#1d1555",
      to: "#071828",
      grid: "rgba(139,92,246,0.14)",
      bottom: "#09051f"
    },
    coder: {
      primary: "#10b981",
      secondary: "#22d3ee",
      tertiary: "#eab308",
      from: "#03130f",
      mid: "#06251f",
      to: "#171403",
      grid: "rgba(16,185,129,0.13)",
      bottom: "#03130f"
    },
    commerce: {
      primary: "#e00083",
      secondary: "#f59e0b",
      tertiary: "#22d3ee",
      from: "#1f0616",
      mid: "#3a1028",
      to: "#2a1803",
      grid: "rgba(224,0,131,0.13)",
      bottom: "#1f0616"
    },
    library: {
      primary: "#38bdf8",
      secondary: "#f472b6",
      tertiary: "#a3e635",
      from: "#06131f",
      mid: "#102a42",
      to: "#211022",
      grid: "rgba(56,189,248,0.12)",
      bottom: "#06131f"
    },
    enterprise: {
      primary: "#64748b",
      secondary: "#22d3ee",
      tertiary: "#f59e0b",
      from: "#0b1120",
      mid: "#1e293b",
      to: "#172554",
      grid: "rgba(148,163,184,0.13)",
      bottom: "#0b1120"
    },
    genai: {
      primary: "#e00083",
      secondary: "#8b5cf6",
      tertiary: "#22d3ee",
      from: "#18051a",
      mid: "#2b1558",
      to: "#071828",
      grid: "rgba(224,0,131,0.13)",
      bottom: "#18051a"
    }
  };

  return (
    themes[visual] ?? {
      primary: accentColor,
      secondary: "#8b5cf6",
      tertiary: "#e00083",
      from: "#020403",
      mid: "#08121c",
      to: "#020403",
      grid: "rgba(40,199,232,0.10)",
      bottom: "#020403"
    }
  );
}
