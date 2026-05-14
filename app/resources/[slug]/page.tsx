import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/sections/PageTemplate";
import { resourcePages } from "@/data/resources";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = resourcePages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = resourcePages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <PageTemplate page={page} category="resource" />;
}
