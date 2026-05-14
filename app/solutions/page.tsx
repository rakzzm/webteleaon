import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { solutionCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Solutions",
  description: "AI solutions for telecommunication, large enterprise, SMB, and government organizations."
};

export default function SolutionsPage() {
  return (
    <>
      <Hero title="AI Solutions" headline="AI transformation plans for complex organizations" subheadline="Deploy AI agents, infrastructure, and governance patterns that match your industry, operating model, and risk profile." visual="enterprise" />
      <Section>
        <SectionHeading title="Solutions by organization type" description="From telecom operations to public services, each solution is shaped around practical workflows and measurable outcomes." />
        <FeatureGrid items={solutionCards} />
      </Section>
      <Section className="pt-0">
        <CTASection title="Design your AI transformation roadmap" description="Bring us your highest-friction workflows and we will identify the best agentic architecture, data requirements, and deployment plan." />
      </Section>
    </>
  );
}
