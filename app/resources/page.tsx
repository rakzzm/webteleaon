import type { Metadata } from "next";
import { OverviewPage } from "@/components/sections/OverviewPage";
import { resourceCards } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Explore Teleaon AI resources including blog articles, documentation, case studies, whitepapers, and webinars."
};

export default function ResourcesPage() {
  return (
    <OverviewPage
      title="Resources"
      headline="Learn how production AI agents are built, deployed, and governed"
      description="A resource center for technical teams, business sponsors, and governance leaders planning enterprise agent deployments."
      visual="library"
      cards={resourceCards}
      sectionTitle="Resource Library"
      sectionDescription="Every resource category has its own page with practical content for planning, building, and scaling AI agents."
    />
  );
}
