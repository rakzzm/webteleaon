import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export function TestimonialSection({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {testimonials.map((item) => (
        <figure
          key={item.name}
          className={cn(
            "rounded-2xl border p-6 backdrop-blur-xl",
            variant === "dark" && "border-white/10 bg-white/[0.025]",
            variant === "light" && "border-white/60 bg-white/70 shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
          )}
        >
          <blockquote className={cn("text-base leading-7", variant === "dark" ? "text-slate-200" : "text-slate-800")}>&ldquo;{item.quote}&rdquo;</blockquote>
          <figcaption className={cn("mt-6 border-t pt-5", variant === "dark" ? "border-white/10" : "border-slate-200/80")}>
            <div className={cn("font-semibold", variant === "dark" ? "text-white" : "text-slate-950")}>{item.name}</div>
            <div className={cn("mt-1 text-sm", variant === "dark" ? "text-slate-400" : "text-slate-600")}>{item.role}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
