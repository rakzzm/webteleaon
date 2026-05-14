import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan/60 focus:ring-offset-2 focus:ring-offset-ink",
        variant === "primary" &&
          "min-w-[300px] rounded-lg bg-cyan text-ink shadow-[0_0_34px_rgba(40,199,232,0.26)] hover:bg-white",
        variant === "secondary" &&
          "min-w-[300px] rounded-lg border border-white/15 bg-transparent text-white hover:border-cyan/50 hover:bg-cyan/10",
        variant === "ghost" && "text-silver hover:text-white",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
