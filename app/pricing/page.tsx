import type { Metadata } from "next";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pricingTiers } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Malaysia Ringgit pricing for Teleaon AI Builder, Growth, and Enterprise AI agent plans."
};

export default function PricingPage() {
  return (
    <main className="pricing-aurora-page">
      <section className="hero-section relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-20 sm:px-6 lg:px-8">
        <div className="liquid-shape shape-1" />
        <div className="liquid-shape shape-2" />
        <div className="liquid-shape shape-3" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Start building agents for free, scale with enterprise control
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Choose the Malaysia Ringgit plan that matches your AI maturity, deployment requirements, usage volume, and governance needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/start-building" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,0.18)] transition hover:bg-cyan sm:w-auto">
                Start building
              </Link>
              <Link href="/contact-us" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan/50 hover:bg-white/15 sm:w-auto">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="plans" className="pricing-aurora-section">
        <SectionHeading title="Plans for every stage of agent deployment" description="All listed prices are in Malaysian Ringgit (MYR) and designed around usage, control, deployment model, and support needs." align="center" />
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article key={tier.name} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan/35 hover:bg-white/[0.09]">
              <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
              <div className="mt-4 text-4xl font-semibold text-cyan">{tier.price}</div>
              <p className="mt-4 min-h-20 text-sm leading-7 text-slate-300">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 border-t border-white/10 pt-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-cyan" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pricing-aurora-section pt-0">
        <SectionHeading title="Pricing FAQ" description="Common questions about usage, enterprise deployment, support, and procurement." />
        <FAQSection
          items={[
            { question: "Can we start without a credit card?", answer: "Yes. Builder is designed for evaluation and prototyping without procurement friction." },
            { question: "Are prices listed in Malaysian Ringgit?", answer: "Yes. Public pricing is shown in Malaysian Ringgit (MYR). Enterprise agreements can be quoted with Malaysia-specific procurement, tax, and billing requirements." },
            { question: "How is usage measured?", answer: "Usage is based on agent session minutes and deployment requirements, with custom terms available for enterprise environments." },
            { question: "Can we deploy privately?", answer: "Yes. Enterprise plans can support private cloud, hybrid, networking, security, and compliance requirements." },
            { question: "Do you offer implementation support?", answer: "Growth and Enterprise customers can receive architecture guidance, solution planning, and deployment support." }
          ]}
        />
      </Section>

      <Section className="pricing-aurora-section pt-0">
        <CTASection title="Need custom pricing?" description="Talk with sales about committed usage, private deployment, partner delivery, and enterprise procurement." />
      </Section>
    </main>
  );
}
