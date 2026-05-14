import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { HeroVideoBot } from "@/components/sections/HeroVideoBot";
import { ProductProductionShowcase } from "@/components/sections/ProductProductionShowcase";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { PageContent } from "@/data/site";

function listToFeatures(items: string[]) {
  return items.map((item) => {
    const [title, ...rest] = item.split(" for ");
    return {
      title: rest.length ? title : item,
      description: rest.length ? `Designed for ${rest.join(" for ")}.` : "Built as an enterprise-ready capability with measurable operational value."
    };
  });
}

export function PageTemplate({ page, category }: { page: PageContent; category: "product" | "solution" | "use-case" | "resource" | "company" }) {
  const isProduct = category === "product";
  const isSolution = category === "solution";
  const isResource = category === "resource";
  const isCompany = category === "company";

  return (
    <>
      {page.slug === "agent-video-bot" ? (
        <HeroVideoBot />
      ) : (
        <Hero
          title={page.title}
          headline={page.headline}
          subheadline={page.subheadline}
          visual={page.visual}
          accentColor={page.accentColor}
        />
      )}

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7">
            <h2 className="text-2xl font-semibold text-white">{isProduct ? "Problem Statement" : isSolution ? "Challenges" : isResource ? "Resource Focus" : isCompany ? "Company Focus" : "What it does"}</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">{page.problem ?? page.positioning}</p>
          </div>
          <div className="rounded-2xl border border-cyan/20 bg-cyan/8 p-7">
            <h2 className="text-2xl font-semibold text-white">{isProduct ? "Product Positioning" : isSolution ? "AI Transformation Opportunities" : isResource ? "How teams use it" : isCompany ? "Operating Principle" : "Who it is for"}</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">{page.positioning}</p>
          </div>
        </div>
      </Section>

      <Section className="pt-0" id={page.slug === "agent-video-bot" ? "how-it-works" : undefined}>
        <SectionHeading
          title={isProduct ? "Key Capabilities" : isSolution ? "Recommended AI Capabilities" : isResource ? "What You Will Find" : isCompany ? "What This Page Covers" : "Key Capabilities"}
          description="Composable capabilities designed for real deployment, continuous improvement, and secure enterprise operations."
        />
        <FeatureGrid items={listToFeatures(page.capabilities)} />
      </Section>

      {page.modules ? (
        <Section className="pt-0">
          <SectionHeading title={isProduct ? "Platform Modules" : "Architecture Modules"} description="A modular deployment model gives technical teams flexibility while giving executives a clean operating view." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.modules.map((module, index) => (
              <div key={module} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="text-sm text-cyan">0{index + 1}</div>
                <div className="mt-2 text-lg font-semibold text-white">{module}</div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {isProduct && page.production ? (
        <Section className="pt-0">
          <ProductProductionShowcase page={page} />
        </Section>
      ) : null}

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title={isResource ? "Reader Value" : isCompany ? "Why It Matters" : isSolution ? "Business Outcomes" : "Benefits"} description="The platform is designed around outcomes leaders can measure, govern, and communicate." />
            <div className="space-y-3">
              {page.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-slate-200">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title={isResource ? "How to Use This" : isCompany ? "How We Work" : isSolution ? "Use Cases" : isProduct ? "Example Workflows" : "Example User Journeys"} description="Representative workflows show how agents move from insight to action across real systems." />
            <div className="space-y-3">
              {(page.workflows ?? page.outcomes ?? []).map((workflow) => (
                <div key={workflow} className="rounded-2xl border border-cyan/15 bg-cyan/6 p-5 text-slate-200">
                  {workflow}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading title={isProduct ? "Enterprise Security" : "Technical Architecture"} description="Security, observability, approvals, and auditability are designed into the operating model from the beginning." align="center" />
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {(page.architecture ?? ["Identity-aware access", "Policy guardrails", "Encrypted data paths", "Human approvals", "Audit logs", "Continuous monitoring"]).map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">{item}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Configured for secure deployment, measurable performance, and governance review.</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {page.integrations ? (
        <Section className="pt-0">
          <SectionHeading title="Integrations" description="Connect AI agents to the systems where work, knowledge, customer context, and approvals already live." />
          <div className="flex flex-wrap gap-3">
            {page.integrations.map((integration) => (
              <span key={integration} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-200">
                {integration}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <StatsSection />
      </Section>

      <Section className="pt-0">
        <SectionHeading title="Customer Confidence" description="Enterprise buyers need proof that AI systems can create value without increasing operational risk." />
        <TestimonialSection />
      </Section>

      <Section className="pt-0">
        <SectionHeading title="FAQ" description="Common questions from technical evaluators, business sponsors, and governance teams." />
        <FAQSection items={page.faq} />
      </Section>

      <Section className="pt-0">
        <CTASection />
      </Section>
    </>
  );
}
