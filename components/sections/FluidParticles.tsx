"use client";

import { useEffect, useRef } from "react";

type FluidParticlesProps = {
  particleDensity?: number;
  particleSize?: number;
  particleColor?: string;
  activeColor?: string;
  maxBlastRadius?: number;
  hoverDelay?: number;
  interactionDistance?: number;
  className?: string;
};

type ParticleState = {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  vx: number;
  vy: number;
  friction: number;
};

export function FluidParticles({
  particleDensity = 1050,
  particleSize = 1.15,
  particleColor = "rgba(37,99,235,0.28)",
  activeColor = "rgba(224,0,131,0.78)",
  maxBlastRadius = 220,
  hoverDelay = 120,
  interactionDistance = 52,
  className = ""
}: FluidParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<ParticleState[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });
  const blastRef = useRef({ active: false, x: 0, y: 0, radius: 0, maxRadius: maxBlastRadius });
  const animationRef = useRef<number>(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      return;
    }

    contextRef.current = ctx;
    ctx.globalCompositeOperation = "lighter";

    const createParticle = (x: number, y: number): ParticleState => {
      const density = Math.random() * 3 + 1;

      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * particleSize + 0.5,
        density,
        color: particleColor,
        vx: 0,
        vy: 0,
        friction: 0.9 - 0.01 * density
      };
    };

    const initParticles = () => {
      const { width, height } = sizeRef.current;
      const particleCount = Math.min(650, Math.max(80, Math.floor((width * height) / particleDensity)));

      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(Math.random() * width, Math.random() * height)
      );
    };

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const pixelRatio = window.devicePixelRatio || 1;

      sizeRef.current = { width, height };
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.globalCompositeOperation = "lighter";
      initParticles();
    };

    const drawParticle = (particle: ParticleState) => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const updateParticle = (particle: ParticleState) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= particle.friction;
      particle.vy *= particle.friction;

      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < interactionDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (interactionDistance - distance) / interactionDistance;

        particle.x -= forceDirectionX * force * particle.density * 0.65;
        particle.y -= forceDirectionY * force * particle.density * 0.65;
        particle.color = activeColor;
      } else {
        particle.x -= (particle.x - particle.baseX) / 20;
        particle.y -= (particle.y - particle.baseY) / 20;
        particle.color = particleColor;
      }

      if (blastRef.current.active) {
        const blastDx = particle.x - blastRef.current.x;
        const blastDy = particle.y - blastRef.current.y;
        const blastDistance = Math.sqrt(blastDx * blastDx + blastDy * blastDy);

        if (blastDistance < blastRef.current.radius) {
          const blastForceX = blastDx / (blastDistance || 1);
          const blastForceY = blastDy / (blastDistance || 1);
          const blastForce = (blastRef.current.radius - blastDistance) / blastRef.current.radius;

          particle.vx += blastForceX * blastForce * 12;
          particle.vy += blastForceY * blastForce * 12;
          particle.color = `rgba(224,0,131,${Math.min(0.85, 0.2 + blastForce * 0.7)})`;
        }
      }

      drawParticle(particle);
    };

    const easeOutQuad = (value: number) => value * (2 - value);

    const triggerBlast = (x: number, y: number) => {
      blastRef.current = {
        active: true,
        x,
        y,
        radius: 0,
        maxRadius: maxBlastRadius
      };

      const startTime = performance.now();
      const duration = 300;

      const expandBlast = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        blastRef.current.radius = easeOutQuad(progress) * blastRef.current.maxRadius;

        if (progress < 1) {
          requestAnimationFrame(expandBlast);
        } else {
          window.setTimeout(() => {
            blastRef.current.active = false;
          }, 100);
        }
      };

      requestAnimationFrame(expandBlast);

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };

    const localPoint = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const point = localPoint(event);
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;

      mouseRef.current = { x: point.x, y: point.y, prevX, prevY };

      const dx = point.x - prevX;
      const dy = point.y - prevY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) {
        if (hoverTimerRef.current === null) {
          hoverTimerRef.current = setTimeout(() => triggerBlast(point.x, point.y), hoverDelay);
        }
      } else if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, prevX: -9999, prevY: -9999 };

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = localPoint(event);
      triggerBlast(point.x, point.y);
    };

    let isVisible = false;
    let isRunning = false;

    const animate = () => {
      if (!isVisible || document.hidden) {
        isRunning = false;
        return;
      }

      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach(updateParticle);
      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      isRunning = false;
      cancelAnimationFrame(animationRef.current);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(parent);
    resizeCanvas();

    parent.addEventListener("pointermove", handlePointerMove);
    parent.addEventListener("pointerleave", handlePointerLeave);
    parent.addEventListener("pointerdown", handlePointerDown);
    const visibilityObserver = new IntersectionObserver(
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

    visibilityObserver.observe(parent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
      parent.removeEventListener("pointerdown", handlePointerDown);

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [activeColor, hoverDelay, interactionDistance, maxBlastRadius, particleColor, particleDensity, particleSize]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
