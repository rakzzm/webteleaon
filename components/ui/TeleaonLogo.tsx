import Image from "next/image";
import { cn } from "@/lib/utils";

export function TeleaonLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        className
      )}
      aria-label="Teleaon AI"
    >
      <Image
        src="/images/teleaon-logo.png"
        alt="Teleaon AI"
        width={1093}
        height={269}
        priority
        className={cn("relative h-auto w-[245px] object-contain", compact && "w-[72px]")}
      />
    </span>
  );
}
