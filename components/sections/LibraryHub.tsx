"use client";

import { useMemo, useState } from "react";
import { libraryCategories, libraryItems } from "@/data/library";

export function LibraryHub() {
  const [category, setCategory] = useState("All");
  const items = useMemo(
    () => (category === "All" ? libraryItems : libraryItems.filter((item) => item.category === category)),
    [category]
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {libraryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === item ? "border-cyan bg-cyan text-ink" : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan/50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <div className="text-sm font-semibold text-cyan">{item.category}</div>
            <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
            <div className="mt-6 text-sm text-slate-500">{item.readTime}</div>
          </article>
        ))}
      </div>
    </>
  );
}
