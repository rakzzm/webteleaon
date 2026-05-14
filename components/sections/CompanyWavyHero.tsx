import { Building2, CheckCircle2, Network, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WavyBackground } from "@/components/sections/WavyBackground";

const proofPoints = [
  { label: "Governed deployments", icon: ShieldCheck },
  { label: "Enterprise operators", icon: Users },
  { label: "Partner-ready platform", icon: Network }
];

export function CompanyWavyHero({
  title,
  headline,
  subheadline
}: {
  title: string;
  headline: string;
  subheadline: string;
}) {
  return (
    <WavyBackground className="isolate bg-[#020814]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.28),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,rgba(2,8,20,0.82),rgba(5,27,50,0.74)_48%,rgba(2,8,20,0.9))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020814] to-transparent" />

      <section className="relative mx-auto grid min-h-[calc(100vh-8.25rem)] max-w-7xl items-center gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan backdrop-blur">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            {title}
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-[4.65rem] lg:leading-[1.03]">
            {headline}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 sm:text-2xl sm:leading-10">{subheadline}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact-us">Talk to Teleaon AI</Button>
            <Button href="/company/security" variant="secondary">View Security</Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#06101f]/75 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">Operating Layer</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Built for AI systems that must earn trust</h2>
              <div className="mt-7 space-y-3">
                {proofPoints.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/15 text-cyan">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-semibold text-white">{label}</span>
                    <CheckCircle2 className="ml-auto h-5 w-5 text-cyan" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm leading-6 text-slate-100">
                Secure tool use, observable sessions, deployment discipline, and human approval paths for production enterprise AI.
              </div>
            </div>
          </div>
        </div>
      </section>
    </WavyBackground>
  );
}
