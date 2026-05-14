export function FAQSection({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <summary className="cursor-pointer list-none text-base font-semibold text-white">
            <span className="inline-flex w-full items-center justify-between gap-4">
              {item.question}
              <span className="text-cyan transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
