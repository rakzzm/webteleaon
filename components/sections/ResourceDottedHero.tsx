import { ArrowRight, BookOpen, FileText, Layers3, PlayCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DottedSurface } from "@/components/sections/DottedSurface";

const resourceSignals = [
  { label: "Architecture", value: "AI agent blueprints" },
  { label: "Governance", value: "Security-ready guides" },
  { label: "Field notes", value: "Production lessons" }
];

const resourceTypes = [
  { icon: FileText, label: "Whitepapers" },
  { icon: BookOpen, label: "Documentation" },
  { icon: Layers3, label: "Case Studies" },
  { icon: PlayCircle, label: "Webinars" }
];

export function ResourceDottedHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050915]">
      <DottedSurface className="opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(34,211,238,0.35),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(224,0,131,0.28),transparent_30%),linear-gradient(135deg,rgba(5,9,21,0.94),rgba(12,28,54,0.82)_48%,rgba(36,10,50,0.9))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050915] to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8.25rem)] max-w-7xl items-center gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan shadow-[0_0_40px_rgba(34,211,238,0.16)] backdrop-blur">
            <Search className="h-4 w-4" aria-hidden="true" />
            Teleaon AI Resource Library
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-[4.8rem] lg:leading-[1.02]">
            Learn how production AI agents are built, deployed, and governed
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 sm:text-2xl sm:leading-10">
            A practical research hub for technical teams, business sponsors, and governance leaders planning enterprise agent deployments.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/resources/documentation">Explore resources</Button>
            <Button href="/contact-us" variant="secondary">Talk to an Architect</Button>
          </div>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {resourceSignals.map((signal) => (
              <div key={signal.label} className="rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">{signal.label}</p>
                <p className="mt-2 text-sm font-medium text-white">{signal.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[440px]">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div className="rounded-[1.45rem] border border-white/10 bg-[#07101e]/80 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">Knowledge Graph</p>
                  <p className="mt-1 text-xl font-semibold text-white">Enterprise AI playbooks</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan text-slate-950">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="grid gap-3 pt-5 sm:grid-cols-2">
                {resourceTypes.map(({ icon: Icon, label }) => (
                  <div key={label} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:border-cyan/45 hover:bg-cyan/10">
                    <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
                    <p className="mt-5 text-lg font-semibold text-white">{label}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan via-sky-300 to-pink" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
