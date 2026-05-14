import type { Metadata } from "next";
import { OverviewPage } from "@/components/sections/OverviewPage";
import { companyCards } from "@/data/company";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn about Teleaon AI, security, partners, and careers."
};

export default function CompanyPage() {
  return (
    <OverviewPage
      title="Company"
      headline="The company building dependable infrastructure for AI agents"
      description="Teleaon AI helps enterprises deploy agentic systems with the engineering discipline, governance, and operating support required for production."
      visual="enterprise"
      cards={companyCards}
      sectionTitle="Company Pages"
      sectionDescription="Explore our mission, security model, partner ecosystem, and career opportunities."
    />
  );
}
