import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { VisualVariant, icons } from "@/data/site";

type OverviewPageProps = {
  title: string;
  headline: string;
  description: string;
  visual: VisualVariant;
  cards: { title: string; href: string; description: string; iconName?: keyof typeof icons }[];
  sectionTitle: string;
  sectionDescription: string;
};

export function OverviewPage({ title, headline, description, visual, cards, sectionTitle, sectionDescription }: OverviewPageProps) {
  return (
    <>
      <Hero title={title} headline={headline} subheadline={description} visual={visual} primaryLabel="Start building" secondaryLabel="Contact sales" secondaryHref="/contact-us" />
      <Section>
        <SectionHeading title={sectionTitle} description={sectionDescription} />
        <FeatureGrid items={cards} />
      </Section>
      <Section className="pt-0">
        <CTASection title={`Ready to explore ${title.toLowerCase()}?`} description="Talk with our team about the fastest route from evaluation to production deployment." />
      </Section>
    </>
  );
}
