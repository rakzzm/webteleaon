"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type BackgroundGradientAnimationProps = {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
};

export function BackgroundGradientAnimation({
  firstColor = "242, 0, 137",
  secondColor = "209, 0, 209",
  thirdColor = "161, 0, 242",
  fourthColor = "45, 0, 247",
  fifthColor = "242, 0, 137",
  pointerColor = "209, 0, 209",
  size = "50%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement | null>(null);
  const curXRef = useRef(0);
  const curYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;

    const rect = interactiveRef.current.getBoundingClientRect();
    targetXRef.current = event.clientX - rect.left;
    targetYRef.current = event.clientY - rect.top;

    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!interactiveRef.current) {
        animationFrameRef.current = null;
        return;
      }

      curXRef.current += (targetXRef.current - curXRef.current) / 8;
      curYRef.current += (targetYRef.current - curYRef.current) / 8;
      interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`;
      animationFrameRef.current = null;
    });
  };

  const style = {
    "--gradient-background-start": "#ffffff",
    "--gradient-background-end": "#ffffff",
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative left-0 top-0 min-h-[520px] w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]", containerClassName)}
      style={style}
      onMouseMove={handleMouseMove}
    >
      <svg className="hidden">
        <defs>
          <filter id="testimonialBlurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("relative z-10", className)}>{children}</div>

      <div className="gradients-container absolute inset-0 h-full w-full blur-2xl md:[filter:url(#testimonialBlurMe)_blur(40px)]">
        <div className="animate-first absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-center bg-[radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)] opacity-100 [mix-blend-mode:var(--blending-value)]" />
        <div className="animate-second absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] bg-[radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)] opacity-100 [mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-400px)]" />
        <div className="animate-third absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] bg-[radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)] opacity-100 [mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%+400px)]" />
        <div className="animate-fourth absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] bg-[radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)] opacity-70 [mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-200px)]" />
        <div className="animate-fifth absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] bg-[radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)] opacity-100 [mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-800px)_calc(50%+800px)]" />

        {interactive ? (
          <div
            ref={interactiveRef}
            className="absolute -left-1/2 -top-1/2 h-full w-full bg-[radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)] opacity-70 [mix-blend-mode:var(--blending-value)]"
          />
        ) : null}
      </div>
    </div>
  );
}
