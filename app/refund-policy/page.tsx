import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/sections/LegalPageTemplate";
import { legalPages } from "@/data/legal";

const page = legalPages.find((item) => item.slug === "refund-policy")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function RefundPolicyPage() {
  return <LegalPageTemplate page={page} />;
}
