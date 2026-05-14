import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/sections/PageTemplate";
import { companyPages } from "@/data/company";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return companyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = companyPages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = companyPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <PageTemplate page={page} category="company" />;
}
