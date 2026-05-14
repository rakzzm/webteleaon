import { Button } from "@/components/ui/Button";

export function CTASection({
  title = "Ready to build enterprise AI systems that move from pilot to production?",
  description = "Book a working session with our AI architects to map use cases, data readiness, infrastructure needs, and deployment priorities.",
  primaryHref = "/contact-us",
  secondaryHref = "/library"
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.93),rgba(231,252,255,0.88)_48%,rgba(222,255,240,0.9))] p-8 shadow-[0_28px_90px_rgba(8,120,150,0.16)] backdrop-blur-xl sm:p-10 lg:p-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(40,199,232,0.24),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(34,197,94,0.20),transparent_30%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative max-w-3xl">
        <h2 className="text-balance text-3xl font-semibold text-slate-950 sm:text-5xl">{title}</h2>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref}>Book a Demo</Button>
          <Button href={secondaryHref} variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">Explore Resources</Button>
        </div>
      </div>
    </div>
  );
}
