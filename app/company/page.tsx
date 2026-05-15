import type { Metadata } from "next";
import { CompanyAnimatedSection } from "@/components/sections/CompanyAnimatedSection";
import { CompanyGeometricHero } from "@/components/sections/CompanyGeometricHero";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { SectionHeading } from "@/components/ui/Section";
import { companyCards } from "@/data/company";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn about Teleaon AI, security, partners, and careers."
};

export default function CompanyPage() {
  return (
    <>
      <CompanyGeometricHero
        title="Company"
        headline="The company building dependable infrastructure for AI agents"
        subheadline="Teleaon AI helps enterprises deploy agentic systems with the engineering discipline, governance, and operating support required for production."
      />
      <CompanyAnimatedSection pattern="ocean">
        <SectionHeading
          title="Company Pages"
          description="Explore our mission, security model, partner ecosystem, and career opportunities."
        />
        <FeatureGrid items={companyCards} />
      </CompanyAnimatedSection>
      <CompanyAnimatedSection pattern="emerald">
        <CTASection
          title="Ready to build with Teleaon AI?"
          description="Talk with our team about secure, governed, production-grade AI systems for your organization."
        />
      </CompanyAnimatedSection>
    </>
  );
}
