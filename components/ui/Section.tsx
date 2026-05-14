import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = "left"
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <h2 className="text-balance text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-[3.25rem] lg:leading-tight">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">{description}</p> : null}
    </div>
  );
}
