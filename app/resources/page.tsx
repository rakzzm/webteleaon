import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ResourceDottedHero } from "@/components/sections/ResourceDottedHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { resourceCards } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Explore Teleaon AI resources including blog articles, documentation, case studies, whitepapers, and webinars."
};

export default function ResourcesPage() {
  return (
    <>
      <ResourceDottedHero />
      <Section>
        <SectionHeading
          title="Resource Library"
          description="Every resource category has its own page with practical content for planning, building, and scaling AI agents."
        />
        <FeatureGrid items={resourceCards} />
      </Section>
      <Section className="pt-0">
        <CTASection
          title="Ready to explore resources?"
          description="Talk with our team about the fastest route from evaluation to production deployment."
        />
      </Section>
    </>
  );
}
