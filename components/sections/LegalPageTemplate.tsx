import { Section } from "@/components/ui/Section";
import type { LegalPage } from "@/data/legal";

export function LegalPageTemplate({ page }: { page: LegalPage }) {
  return (
    <main className="bg-[linear-gradient(135deg,#f8fdff_0%,#ffffff_45%,#fff3fa_100%)] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(40,199,232,0.20),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(224,0,131,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Teleaon AI Legal</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{page.intro}</p>
          <p className="mt-5 text-sm font-medium text-slate-500">Last updated: {page.updated}</p>
        </div>
      </section>

      <Section className="max-w-5xl">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white/82 p-6 shadow-sm backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
