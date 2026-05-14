import type { Metadata } from "next";
import { CompanyWavyHero } from "@/components/sections/CompanyWavyHero";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { companyCards } from "@/data/company";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn about Teleaon AI, security, partners, and careers."
};

export default function CompanyPage() {
  return (
    <>
      <CompanyWavyHero
        title="Company"
        headline="The company building dependable infrastructure for AI agents"
        subheadline="Teleaon AI helps enterprises deploy agentic systems with the engineering discipline, governance, and operating support required for production."
      />
      <Section>
        <SectionHeading
          title="Company Pages"
          description="Explore our mission, security model, partner ecosystem, and career opportunities."
        />
        <FeatureGrid items={companyCards} />
      </Section>
      <Section className="pt-0">
        <CTASection
          title="Ready to build with Teleaon AI?"
          description="Talk with our team about secure, governed, production-grade AI systems for your organization."
        />
      </Section>
    </>
  );
}
