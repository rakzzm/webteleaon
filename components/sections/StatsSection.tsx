import { stats } from "@/data/site";
import { cn } from "@/lib/utils";

export function StatsSection({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "rounded-2xl border p-5",
            variant === "dark" && "border-white/10 bg-white/[0.025]",
            variant === "light" && "border-slate-200 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          )}
        >
          <div className={cn("text-3xl font-semibold sm:text-4xl", variant === "dark" ? "text-white" : "text-slate-950")}>{stat.value}</div>
          <p className={cn("mt-3 text-sm leading-6", variant === "dark" ? "text-slate-300" : "text-slate-600")}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
