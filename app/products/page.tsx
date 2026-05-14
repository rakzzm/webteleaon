import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { productCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Products | Rebuild in Progress",
  description: "Teleaon AI product pages are being rebuilt with updated product positioning and production-ready content."
};

export default function ProductsPage() {
  return (
    <main className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fa_100%)] text-slate-950">
      <Section className="min-h-[70vh]">
        <SectionHeading
          title="Products are being rebuilt"
          description="The previous product pages have been removed. This lightweight page keeps navigation working while the new AI SaaS, AI Platform, AI Infrastructure, and Gen AI pages are rebuilt."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCards.map((product) => (
            <Link key={product.href} href={product.href} className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm transition hover:border-cyan/50 hover:bg-white">
              <div className="text-lg font-semibold text-slate-950">{product.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">Rebuild placeholder. New production content will be added here.</p>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
