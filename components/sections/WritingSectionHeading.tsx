"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WritingSectionHeading({
  title,
  description,
  className
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval = 0;

    const startTimer = window.setTimeout(() => {
      if (prefersReducedMotion) {
        setVisibleTitle(title);
        return;
      }

      setVisibleTitle("");
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setVisibleTitle(title.slice(0, index));

        if (index >= title.length) {
          window.clearInterval(interval);
        }
      }, 42);
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
    };
  }, [title]);

  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <h2
        aria-label={title}
        className="text-balance text-3xl font-semibold tracking-normal text-black sm:text-4xl lg:text-[3.25rem] lg:leading-tight"
      >
        <span aria-hidden="true">{visibleTitle}</span>
        <span className="writing-cursor" aria-hidden="true" />
      </h2>
      {description ? <p className="mt-4 text-base font-medium leading-8 text-black/80 sm:text-lg">{description}</p> : null}
    </div>
  );
}
