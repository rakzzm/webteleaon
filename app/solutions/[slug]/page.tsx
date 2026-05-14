import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/sections/PageTemplate";
import { solutions } from "@/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = solutions.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = solutions.find((item) => item.slug === slug);
  if (!page) notFound();
  return <PageTemplate page={page} category="solution" />;
}
