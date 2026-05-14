import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { LibraryHub } from "@/components/sections/LibraryHub";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Library",
  description: "Resource hub for AI guides, blog articles, whitepapers, case studies, product documentation, and webinars."
};

export default function LibraryPage() {
  return (
    <>
      <Hero title="AI Resource Library" headline="Research, guides, and field notes for enterprise AI builders" subheadline="Explore practical resources for agentic AI, secure infrastructure, generative AI, governance, and industry transformation." visual="library" secondaryHref="/contact-us" secondaryLabel="Talk to an Architect" />
      <Section>
        <SectionHeading title="Resource Hub" description="Filter by category and find the material that helps business, technical, and governance teams move forward together." />
        <LibraryHub />
      </Section>
      <Section className="pt-0">
        <CTASection title="Need a technical briefing?" description="Schedule a session with our AI architects to discuss deployment patterns, security controls, and the fastest path to production." />
      </Section>
    </>
  );
}
