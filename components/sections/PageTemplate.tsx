import { CTASection } from "@/components/sections/CTASection";
import { CompanyWavyHero } from "@/components/sections/CompanyWavyHero";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { HeroVideoBot } from "@/components/sections/HeroVideoBot";
import { ProductProductionShowcase } from "@/components/sections/ProductProductionShowcase";
import { ProductAnimatedSection } from "@/components/sections/ProductAnimatedSection";
import { Resource3DShowcase } from "@/components/sections/Resource3DShowcase";
import { ResourceAnimatedSection } from "@/components/sections/ResourceAnimatedSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { PageContent } from "@/data/site";
import type { ReactNode } from "react";

function listToFeatures(items: string[]) {
  return items.map((item) => {
    const [title, ...rest] = item.split(" for ");
    return {
      title: rest.length ? title : item,
      description: rest.length ? `Designed for ${rest.join(" for ")}.` : "Built as an enterprise-ready capability with measurable operational value."
    };
  });
}

function TemplateSection({
  children,
  id,
  className,
  isResource,
  isProduct,
  resourceVariant = "interactive-light",
  productVariant = "shader"
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  isResource: boolean;
  isProduct: boolean;
  resourceVariant?: "liquid" | "interactive-light" | "interactive-dark";
  productVariant?: "shader" | "gradient";
}) {
  if (isResource) {
    return (
      <ResourceAnimatedSection id={id} className={className} variant={resourceVariant}>
        {children}
      </ResourceAnimatedSection>
    );
  }

  if (isProduct) {
    return (
      <ProductAnimatedSection id={id} className={className} variant={productVariant}>
        {children}
      </ProductAnimatedSection>
    );
  }

  return (
    <Section id={id} className={className}>
      {children}
    </Section>
  );
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
      ) : isCompany ? (
        <CompanyWavyHero title={page.title} headline={page.headline} subheadline={page.subheadline} />
      ) : (
        <Hero
          title={page.title}
          headline={page.headline}
          subheadline={page.subheadline}
          visual={page.visual}
          accentColor={page.accentColor}
          hideVisual={isResource}
        />
      )}

      {isResource ? <Resource3DShowcase page={page} /> : null}

      <TemplateSection isResource={isResource} isProduct={isProduct} resourceVariant="interactive-dark" productVariant="shader">
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
      </TemplateSection>

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} id={page.slug === "agent-video-bot" ? "how-it-works" : undefined} isResource={isResource} isProduct={isProduct} resourceVariant="liquid" productVariant="gradient">
        <SectionHeading
          title={isProduct ? "Key Capabilities" : isSolution ? "Recommended AI Capabilities" : isResource ? "What You Will Find" : isCompany ? "What This Page Covers" : "Key Capabilities"}
          description="Composable capabilities designed for real deployment, continuous improvement, and secure enterprise operations."
        />
        <FeatureGrid items={listToFeatures(page.capabilities)} />
      </TemplateSection>

      {page.modules ? (
        <TemplateSection className={isProduct ? undefined : "pt-0"} isResource={false} isProduct={isProduct} productVariant="shader">
          <SectionHeading title={isProduct ? "Platform Modules" : "Architecture Modules"} description="A modular deployment model gives technical teams flexibility while giving executives a clean operating view." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.modules.map((module, index) => (
              <div key={module} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="text-sm text-cyan">0{index + 1}</div>
                <div className="mt-2 text-lg font-semibold text-white">{module}</div>
              </div>
            ))}
          </div>
        </TemplateSection>
      ) : null}

      {isProduct && page.production ? (
        <TemplateSection isResource={false} isProduct={isProduct} productVariant="gradient">
          <ProductProductionShowcase page={page} />
        </TemplateSection>
      ) : null}

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} isResource={isResource} isProduct={isProduct} resourceVariant="interactive-light" productVariant="shader">
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
      </TemplateSection>

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} isResource={isResource} isProduct={isProduct} resourceVariant="interactive-dark" productVariant="gradient">
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
      </TemplateSection>

      {page.integrations ? (
        <TemplateSection className={isProduct ? undefined : "pt-0"} isResource={false} isProduct={isProduct} productVariant="shader">
          <SectionHeading title="Integrations" description="Connect AI agents to the systems where work, knowledge, customer context, and approvals already live." />
          <div className="flex flex-wrap gap-3">
            {page.integrations.map((integration) => (
              <span key={integration} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-200">
                {integration}
              </span>
            ))}
          </div>
        </TemplateSection>
      ) : null}

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} isResource={isResource} isProduct={isProduct} resourceVariant="interactive-light" productVariant="gradient">
        <StatsSection />
      </TemplateSection>

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} isResource={isResource} isProduct={isProduct} resourceVariant="interactive-dark" productVariant="shader">
        <SectionHeading title="Customer Confidence" description="Enterprise buyers need proof that AI systems can create value without increasing operational risk." />
        <TestimonialSection />
      </TemplateSection>

      <TemplateSection className={isResource || isProduct ? undefined : "pt-0"} isResource={isResource} isProduct={isProduct} resourceVariant="interactive-light" productVariant="gradient">
        <SectionHeading title="FAQ" description="Common questions from technical evaluators, business sponsors, and governance teams." />
        <FAQSection items={page.faq} />
      </TemplateSection>

      <Section className="pt-0">
        <CTASection />
      </Section>
    </>
  );
}
