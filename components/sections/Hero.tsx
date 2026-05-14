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
  return (
    <section className="relative overflow-hidden bg-radial-grid">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
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
