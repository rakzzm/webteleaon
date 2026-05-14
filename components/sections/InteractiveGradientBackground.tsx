"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type InteractiveGradientBackgroundProps = {
  className?: string;
  children?: ReactNode;
  intensity?: number;
  interactive?: boolean;
  initialOffset?: { x?: number; y?: number };
  dark?: boolean;
};

export function InteractiveGradientBackground({
  className = "",
  children,
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = false
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<PointerEvent | Touch | null>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.style.setProperty("--posX", String(initialOffset?.x ?? 0));
    host.style.setProperty("--posY", String(initialOffset?.y ?? 0));

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const currentHost = ref.current;
        const ev = pendingRef.current;
        if (!currentHost || !ev) return;

        const rect = currentHost.getBoundingClientRect();
        const px = ("clientX" in ev ? ev.clientX : 0) - rect.left - rect.width / 2;
        const py = ("clientY" in ev ? ev.clientY : 0) - rect.top - rect.height / 2;
        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const k = prefersReduced ? 0.1 : intensity;

        currentHost.style.setProperty("--posX", String(px * k));
        currentHost.style.setProperty("--posY", String(py * k));
      });
    };

    if (!interactive) return undefined;

    const onPointer = (event: PointerEvent) => {
      pendingRef.current = event;
      schedule();
    };
    const onTouch = (event: TouchEvent) => {
      if (!event.touches.length) return;
      pendingRef.current = event.touches[0];
      schedule();
    };
    const reset = () => {
      host.style.setProperty("--posX", "0");
      host.style.setProperty("--posY", "0");
    };

    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });
    host.addEventListener("pointerleave", reset);
    host.addEventListener("touchend", reset);
    host.addEventListener("touchcancel", reset);

    return () => {
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("touchmove", onTouch);
      host.removeEventListener("pointerleave", reset);
      host.removeEventListener("touchend", reset);
      host.removeEventListener("touchcancel", reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity, initialOffset?.x, initialOffset?.y]);

  return (
    <div
      ref={ref}
      aria-label="Interactive gradient background"
      role="img"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        "--posX": "0",
        "--posY": "0"
      } as CSSProperties}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 0 : 1,
          transition: "opacity 0.5s ease",
          background: `
            linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(200 200 200), rgb(22 0 45)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(250 255 0), rgb(36 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(20 175 125), rgb(0 10 255)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(255 77 0), rgb(0 200 255)),
            linear-gradient(60deg, rgb(255 0 0), rgb(120 86 255))
          `,
          backgroundBlendMode: "overlay, overlay, difference, difference, difference, normal"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: `
            linear-gradient(115deg, rgb(15 30 20), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(80 80 100), rgb(10 0 25)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(100 120 0), rgb(15 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(10 80 60), rgb(0 5 120)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(120 35 0), rgb(0 100 140)),
            linear-gradient(60deg, rgb(100 0 0), rgb(60 40 150))
          `,
          backgroundBlendMode: "overlay, overlay, difference, difference, difference, normal"
        }}
      />
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}

export default InteractiveGradientBackground;
