import { Activity, CheckCircle2, GitBranch, LockKeyhole, Radar, ServerCog } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import type { PageContent } from "@/data/site";

const icons = [Activity, Radar, ServerCog, GitBranch, LockKeyhole, CheckCircle2];

export function ProductProductionShowcase({ page }: { page: PageContent }) {
  if (!page.production) return null;

  const { metrics, architecture, pipeline, controls } = page.production;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(40,199,232,0.08)_48%,rgba(139,92,246,0.08))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7 lg:p-9">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(40,199,232,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(40,199,232,0.10)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative">
        <SectionHeading
          title="Production intelligence layer"
          description={`Advanced operating data for deploying ${page.title} with measurable performance, clear release paths, and enterprise controls.`}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <div className="text-sm font-semibold text-cyan">{metric.label}</div>
              <div className="mt-3 text-4xl font-semibold text-white">{metric.value}</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{metric.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 lg:p-6">
            <h3 className="text-xl font-semibold text-white">Reference architecture</h3>
            <div className="mt-5 grid gap-3">
              {architecture.map((item, index) => {
                const Icon = icons[index % icons.length];

                return (
                  <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan to-violet-400 opacity-70" />
                    <div className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan shadow-[0_0_30px_rgba(40,199,232,0.16)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-cyan/15 bg-cyan/8 p-5 lg:p-6">
              <h3 className="text-xl font-semibold text-white">Production release path</h3>
              <div className="mt-5 grid gap-3">
                {pipeline.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/18 px-4 py-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan text-sm font-bold text-ink">{index + 1}</span>
                    <span className="text-sm font-semibold text-slate-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 lg:p-6">
              <h3 className="text-xl font-semibold text-white">Enterprise controls</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {controls.map((control) => (
                  <span key={control} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-medium text-slate-200">
                    {control}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
