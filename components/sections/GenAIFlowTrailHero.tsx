"use client";

import { useEffect, useRef } from "react";

type TrailNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type TrailLine = {
  spring: number;
  friction: number;
  nodes: TrailNode[];
};

const settings = {
  friction: 0.52,
  trails: 46,
  size: 34,
  dampening: 0.026,
  tension: 0.99
};

export function GenAIFlowTrailHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let frame = 0;
    let huePhase = Math.random() * Math.PI * 2;
    let running = true;
    const pointer = { x: parent.clientWidth * 0.52, y: parent.clientHeight * 0.48 };
    let lines: TrailLine[] = [];

    const createNode = (): TrailNode => ({ x: pointer.x, y: pointer.y, vx: 0, vy: 0 });

    const createLines = () => {
      lines = Array.from({ length: settings.trails }, (_, index) => ({
        spring: 0.34 + (index / settings.trails) * 0.026 + 0.1 * Math.random() - 0.05,
        friction: settings.friction + 0.01 * Math.random() - 0.005,
        nodes: Array.from({ length: settings.size }, createNode)
      }));
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width * 0.52;
      pointer.y = height * 0.48;
      createLines();
    };

    const updateLine = (line: TrailLine) => {
      let spring = line.spring;
      const first = line.nodes[0];
      first.vx += (pointer.x - first.x) * spring;
      first.vy += (pointer.y - first.y) * spring;

      for (let index = 0; index < line.nodes.length; index++) {
        const node = line.nodes[index];
        if (index > 0) {
          const previous = line.nodes[index - 1];
          node.vx += (previous.x - node.x) * spring;
          node.vy += (previous.y - node.y) * spring;
          node.vx += previous.vx * settings.dampening;
          node.vy += previous.vy * settings.dampening;
        }
        node.vx *= line.friction;
        node.vy *= line.friction;
        node.x += node.vx;
        node.y += node.vy;
        spring *= settings.tension;
      }
    };

    const drawLine = (line: TrailLine) => {
      const first = line.nodes[0];
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      for (let index = 1; index < line.nodes.length - 2; index++) {
        const node = line.nodes[index];
        const next = line.nodes[index + 1];
        ctx.quadraticCurveTo(node.x, node.y, (node.x + next.x) * 0.5, (node.y + next.y) * 0.5);
      }

      const penultimate = line.nodes[line.nodes.length - 2];
      const last = line.nodes[line.nodes.length - 1];
      ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
      ctx.stroke();
      ctx.closePath();
    };

    const render = () => {
      if (!running) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const idleX = width * (0.52 + Math.sin(frame * 0.008) * 0.22);
      const idleY = height * (0.48 + Math.cos(frame * 0.011) * 0.18);
      pointer.x += (idleX - pointer.x) * 0.006;
      pointer.y += (idleY - pointer.y) * 0.006;

      huePhase += 0.0015;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(285 + Math.sin(huePhase) * 85)}, 100%, 55%, 0.036)`;
      ctx.lineWidth = 8;

      lines.forEach((line) => {
        updateLine(line);
        drawLine(line);
      });

      frame += 1;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(parent);
    canvas.addEventListener("pointermove", handlePointerMove);
    resizeCanvas();
    render();

    return () => {
      running = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
