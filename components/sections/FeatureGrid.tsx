import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { icons } from "@/data/site";

type Feature = {
  title: string;
  description: string;
  href?: string;
  iconName?: keyof typeof icons;
};

export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.iconName ? icons[item.iconName] : icons.Sparkles;
        const content = (
          <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan/35 hover:bg-cyan/8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/8 text-cyan">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              {item.href ? <ArrowUpRight className="mt-1 h-4 w-4 text-slate-500 transition group-hover:text-cyan" aria-hidden="true" /> : null}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
          </div>
        );
        return item.href ? (
          <Link key={item.title} href={item.href} className="block focus:outline-none focus:ring-2 focus:ring-cyan/60">
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </div>
  );
}
