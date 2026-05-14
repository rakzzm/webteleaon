import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/sections/PageTemplate";
import { useCases } from "@/data/useCases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return useCases.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = useCases.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description
  };
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = useCases.find((item) => item.slug === slug);
  if (!page) notFound();
  return <PageTemplate page={page} category="use-case" />;
}
