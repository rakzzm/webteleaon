import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { FAQSection } from "@/components/sections/FAQSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pricingTiers } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for Teleaon AI Builder, Growth, and Enterprise AI agent plans."
};

export default function PricingPage() {
  return (
    <>
      <Hero
        title="Pricing"
        headline="Start building agents for free, scale with enterprise control"
        subheadline="Choose the plan that matches your AI maturity, deployment requirements, usage volume, and governance needs."
        visual="platform"
        primaryLabel="Start building"
        secondaryLabel="Contact sales"
        secondaryHref="/contact-us"
      />
      <Section>
        <SectionHeading title="Plans for every stage of agent deployment" description="From early prototypes to private enterprise environments, pricing is designed around usage, control, and support needs." />
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article key={tier.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
              <div className="mt-4 text-4xl font-semibold text-cyan">{tier.price}</div>
              <p className="mt-4 min-h-20 text-sm leading-7 text-slate-300">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="border-t border-white/10 pt-3">{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHeading title="Pricing FAQ" description="Common questions about usage, enterprise deployment, support, and procurement." />
        <FAQSection
          items={[
            { question: "Can we start without a credit card?", answer: "Yes. Builder is designed for evaluation and prototyping without procurement friction." },
            { question: "How is usage measured?", answer: "Usage is based on agent session minutes and deployment requirements, with custom terms available for enterprise environments." },
            { question: "Can we deploy privately?", answer: "Yes. Enterprise plans can support private cloud, hybrid, networking, security, and compliance requirements." },
            { question: "Do you offer implementation support?", answer: "Growth and Enterprise customers can receive architecture guidance, solution planning, and deployment support." }
          ]}
        />
      </Section>
      <Section className="pt-0">
        <CTASection title="Need custom pricing?" description="Talk with sales about committed usage, private deployment, partner delivery, and enterprise procurement." />
      </Section>
    </>
  );
}
