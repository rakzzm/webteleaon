"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  angle: number;
  radius: number;
  size: number;
  speed: number;
  hue: number;
  life: number;
  maxLife: number;
};

type StarTrailBackgroundProps = {
  className?: string;
  particleAmount?: number;
};

export function StarTrailBackground({ className, particleAmount = 420 }: StarTrailBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let animationId = 0;
    let particles: Particle[] = [];
    const dpr = 1;
    const particleBudget = Math.min(520, particleAmount);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const random = (min: number, max: number) => min + Math.random() * (max - min);

    const resetParticle = (): Particle => ({
      angle: random(0, Math.PI * 2),
      radius: random(153, 225),
      size: random(0.2, 0.8),
      speed: random(-0.1, 0.1) * 0.012,
      hue: random(174, 200),
      life: random(0, 20000),
      maxLife: random(10000, 20000)
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: reduceMotion ? 120 : particleBudget }, resetParticle);
    };

    const render = () => {
      if (!isVisible || document.hidden) {
        isRunning = false;
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.angle += particle.speed;
        particle.life += 16;

        if (particle.life > particle.maxLife) {
          Object.assign(particle, resetParticle());
        }

        const pulse = 0.55 + Math.sin(frame * 0.018 + particle.angle * 2) * 0.35;
        const orbitX = centerX + Math.cos(particle.angle) * particle.radius * 1.75;
        const orbitY = centerY + Math.sin(particle.angle) * particle.radius * 0.58;
        const opacity = Math.max(0.08, Math.min(0.65, pulse));

        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${opacity})`;
        context.shadowColor = `hsla(${particle.hue}, 100%, 50%, 0.8)`;
        context.shadowBlur = particle.size * 7;
        context.arc(orbitX, orbitY, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      frame += 1;
      animationId = requestAnimationFrame(render);
    };

    let isVisible = false;
    let isRunning = false;

    const startAnimation = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animationId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isRunning = false;
      cancelAnimationFrame(animationId);
    };

    resize();
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "80px" }
    );
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    observer.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [particleAmount]);

  return (
    <div className={cn("relative h-[500px] w-full overflow-hidden rounded-[15px] bg-black", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.08)_42%,#000_82%)]" />
    </div>
  );
}
