import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/sections/LegalPageTemplate";
import { legalPages } from "@/data/legal";

const page = legalPages.find((item) => item.slug === "marketing")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function MarketingPage() {
  return <LegalPageTemplate page={page} />;
}
