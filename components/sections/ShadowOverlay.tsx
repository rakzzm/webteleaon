"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import { animate, useMotionValue, type AnimationPlaybackControls } from "framer-motion";

type AnimationConfig = {
  scale: number;
  speed: number;
};

type NoiseConfig = {
  opacity: number;
  scale: number;
};

type ShadowOverlayProps = {
  children?: ReactNode;
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
};

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

function useInstanceId() {
  const id = useId();
  return `shadowoverlay-${id.replace(/:/g, "")}`;
}

const shadowMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 900'%3E%3Cpath fill='black' d='M81 693C240 512 375 482 531 547c156 65 231 61 391-35 160-96 309-66 402 78 92 144 42 290-111 333-154 43-295-42-452-3-157 39-332 178-511 113C71 968-78 873 81 693Z'/%3E%3Cpath fill='black' opacity='.74' d='M186 154C327 43 493 78 598 197c105 119 135 197 305 209 170 12 289 103 273 229-17 126-177 166-330 111-153-56-244-105-414-45-170 60-360 39-424-89-64-128 37-347 178-458Z'/%3E%3C/svg%3E\")";

export function ShadowOverlay({
  children,
  color = "rgba(138, 143, 154, 0.9)",
  animation = { scale: 64, speed: 58 },
  noise = { opacity: 0.16, scale: 1.25 },
  style,
  className
}: ShadowOverlayProps) {
  const id = useInstanceId();
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);
  const animationEnabled = animation.scale > 0;
  const displacementScale = mapRange(animation.scale, 1, 100, 20, 100);
  const animationDuration = mapRange(animation.speed, 1, 100, 1000, 50);

  useEffect(() => {
    if (!feColorMatrixRef.current || !animationEnabled) return undefined;

    hueRotateAnimation.current?.stop();
    hueRotateMotionValue.set(0);
    hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
      duration: animationDuration / 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      ease: "linear",
      onUpdate: (value) => {
        feColorMatrixRef.current?.setAttribute("values", String(value));
      }
    });

    return () => {
      hueRotateAnimation.current?.stop();
    };
  }, [animationDuration, animationEnabled, hueRotateMotionValue]);

  return (
    <div className={className} style={{ overflow: "hidden", position: "absolute", inset: 0, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${id}) blur(4px)` : "none"
        }}
      >
        {animationEnabled ? (
          <svg aria-hidden="true" focusable="false" style={{ position: "absolute", height: 0, width: 0 }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix ref={feColorMatrixRef} in="undulation" type="hueRotate" values="180" />
                <feColorMatrix in="undulation" result="circulation" type="matrix" values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" />
                <feDisplacementMap in="SourceGraphic" in2="circulation" scale={displacementScale} result="dist" />
                <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
              </filter>
            </defs>
          </svg>
        ) : null}
        <div
          style={{
            backgroundColor: color,
            WebkitMaskImage: shadowMask,
            maskImage: shadowMask,
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            height: "100%",
            width: "100%"
          }}
        />
      </div>

      {children ? <div className="relative z-10 h-full">{children}</div> : null}

      {noise.opacity > 0 ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7) 0 1px, transparent 1px), radial-gradient(circle at 75% 65%, rgba(0,0,0,0.45) 0 1px, transparent 1px)",
            backgroundSize: `${noise.scale * 180}px ${noise.scale * 180}px`,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2
          }}
        />
      ) : null}
    </div>
  );
}
