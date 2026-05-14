import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useCaseCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Agentic AI use cases for voice, chat, video, email, operating systems, coding, and commerce."
};

export default function UseCasePage() {
  return (
    <>
      <Hero title="Agentic Use Cases" headline="Agentic AI use cases across communication, operations, commerce, and engineering" subheadline="Explore production-ready agents that understand context, call tools, trigger workflows, and keep humans in control." visual="os" />
      <Section>
        <SectionHeading title="Agentic systems for real work" description="Each agent can be deployed on its own or coordinated through an operating layer for cross-functional automation." />
        <FeatureGrid items={useCaseCards} />
      </Section>
      <Section className="pt-0">
        <CTASection title="Choose your first agentic workflow" description="We will help prioritize the agent that delivers the fastest measurable value with the cleanest deployment path." />
      </Section>
    </>
  );
}
