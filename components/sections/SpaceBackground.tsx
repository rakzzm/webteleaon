"use client";

import { useEffect, useRef } from "react";

type Particle = {
  color: string;
  radius: number;
  x: number;
  y: number;
  ring: number;
  move: number;
  random: number;
};

type SpaceBackgroundProps = {
  particleCount?: number;
  particleColor?: string;
  backgroundColor?: string;
  className?: string;
};

export function SpaceBackground({ particleCount = 450, particleColor = "rgba(40,199,232,0.72)", backgroundColor = "transparent", className = "" }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ratio = window.innerHeight < 400 ? 0.6 : 1;
    const state = {
      particles: [] as Particle[],
      r: 120,
      counter: 0
    };

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(ratio * dpr, 0, 0, -ratio * dpr, canvas.width / 2, canvas.height / 2);
    };

    const createParticle = () => {
      state.particles.push({
        color: particleColor,
        radius: Math.random() * 5,
        x: Math.cos(Math.random() * 7 + Math.PI) * state.r,
        y: Math.sin(Math.random() * 7 + Math.PI) * state.r,
        ring: Math.random() * state.r * 3,
        move: (Math.random() * 4 + 1) / 500,
        random: Math.random() * 7
      });
    };

    const moveParticle = (particle: Particle) => {
      particle.ring = Math.max(particle.ring - 1, state.r);
      particle.random += particle.move;
      particle.x = Math.cos(particle.random + Math.PI) * particle.ring;
      particle.y = Math.sin(particle.random + Math.PI) * particle.ring;
    };

    const resetParticle = (particle: Particle) => {
      particle.ring = Math.random() * state.r * 3;
      particle.radius = Math.random() * 5;
    };

    const disappear = (particle: Particle) => {
      if (particle.radius < 0.8) resetParticle(particle);
      particle.radius *= 0.994;
    };

    const draw = (particle: Particle) => {
      ctx.beginPath();
      ctx.fillStyle = particle.color;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    let isVisible = false;
    let isRunning = false;

    const loop = () => {
      if (!isVisible || document.hidden) {
        isRunning = false;
        return;
      }

      ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
      if (state.counter < state.particles.length) state.counter += 1;

      for (let index = 0; index < state.counter; index += 1) {
        const particle = state.particles[index];
        disappear(particle);
        moveParticle(particle);
        draw(particle);
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      isRunning = false;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    setupCanvas();
    for (let index = 0; index < particleCount; index += 1) createParticle();

    const handleResize = () => {
      ratio = window.innerHeight < 400 ? 0.6 : 1;
      setupCanvas();
    };

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

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      stopAnimation();
    };
  }, [particleColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ background: backgroundColor }}
      aria-hidden="true"
    />
  );
}
