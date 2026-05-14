"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref"> & {
  particleColor?: "dark" | "light";
};

export function DottedSurface({ className, particleColor = "light", ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const separation = 150;
    const amountX = 40;
    const amountY = 60;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(scene.fog.color, 0);
    container.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];
    const color = particleColor === "dark" ? [0.05, 0.08, 0.14] : [0.84, 0.94, 1];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions.push(
          ix * separation - (amountX * separation) / 2,
          0,
          iy * separation - (amountY * separation) / 2
        );
        colors.push(color[0], color[1], color[2]);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId = 0;

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const positionAttribute = geometry.attributes.position;
      const positionArray = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          const index = i * 3;
          positionArray[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.08;
    };

    animate();
    sceneRef.current = { scene, renderer, animationId };

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((item) => item.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      sceneRef.current = null;
    };
  }, [particleColor]);

  return <div ref={containerRef} className={cn("pointer-events-none absolute inset-0", className)} {...props} />;
}
