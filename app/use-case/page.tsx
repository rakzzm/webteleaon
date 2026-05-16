import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { UseCaseAnimatedSection, UseCaseParticleHero } from "@/components/sections/UseCaseParticleHero";
import { SectionHeading } from "@/components/ui/Section";
import { useCaseCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Agentic AI use cases for voice, chat, video, email, operating systems, coding, and commerce."
};

export default function UseCasePage() {
  return (
    <>
      <UseCaseParticleHero
        title="Agentic Use Cases"
        headline="Agentic AI use cases across communication, operations, commerce, and engineering"
        subheadline="Explore production-ready agents that understand context, call tools, trigger workflows, and keep humans in control."
        words={["VOICE", "CHAT", "VIDEO", "EMAIL", "OPS", "CODER", "COMMERCE"]}
        primaryLabel="Choose a Workflow"
        secondaryHref="/contact-us"
        secondaryLabel="Talk to an Architect"
      />
      <UseCaseAnimatedSection variant="matrix">
        <SectionHeading title="Agentic systems for real work" description="Each agent can be deployed on its own or coordinated through an operating layer for cross-functional automation, auditability, human approval, and measurable production outcomes." />
        <FeatureGrid items={useCaseCards} />
      </UseCaseAnimatedSection>
      <UseCaseAnimatedSection className="pt-0" variant="proof">
        <CTASection title="Choose your first agentic workflow" description="We will help prioritize the agent that delivers the fastest measurable value with the cleanest deployment path." />
      </UseCaseAnimatedSection>
    </>
  );
}
