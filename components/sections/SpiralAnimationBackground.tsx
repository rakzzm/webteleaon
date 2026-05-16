"use client";

import { useEffect, useRef } from "react";

class Vector2D {
  constructor(
    public x: number,
    public y: number
  ) {}
}

class Vector3D {
  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {}
}

class SpiralStar {
  private angle: number;
  private distance: number;
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private rotationDirection: number;
  private expansionRate: number;
  private finalScale: number;

  constructor(cameraZ: number, cameraTravelDistance: number, random: () => number) {
    this.angle = random() * Math.PI * 2;
    this.distance = 30 * random() + 15;
    this.rotationDirection = random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + random() * 0.8;
    this.finalScale = 0.7 + random() * 0.6;
    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);
    this.spiralLocation = (1 - Math.pow(1 - random(), 3)) / 1.3;
    this.z = cameraZ * 0.5 + random() * (cameraTravelDistance + cameraZ - cameraZ * 0.5);
    this.z = this.z * (1 - 0.3 * this.spiralLocation) + (cameraTravelDistance / 2) * (0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(random(), 2);
  }

  render(progress: number, controller: SpiralController) {
    const spiralPos = controller.spiralPath(this.spiralLocation);
    const q = progress - this.spiralLocation;

    if (q <= 0) return;

    const displacementProgress = controller.constrain(4 * q, 0, 1);
    const linearEasing = displacementProgress;
    const elasticEasing = controller.easeOutElastic(displacementProgress);
    const powerEasing = Math.pow(displacementProgress, 2);
    let easing = elasticEasing;

    if (displacementProgress < 0.3) {
      easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3);
    } else if (displacementProgress < 0.7) {
      easing = controller.lerp(powerEasing, elasticEasing, (displacementProgress - 0.3) / 0.4);
    }

    let screenX = spiralPos.x;
    let screenY = spiralPos.y;

    if (displacementProgress < 0.3) {
      screenX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
      screenY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
    } else if (displacementProgress < 0.7) {
      const midProgress = (displacementProgress - 0.3) / 0.4;
      const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;
      const baseX = spiralPos.x + this.dx * 0.3;
      const baseY = spiralPos.y + this.dy * 0.3;
      const targetX = spiralPos.x + this.dx * 0.7;
      const targetY = spiralPos.y + this.dy * 0.7;
      screenX = controller.lerp(baseX, targetX, midProgress) - this.dy * 0.4 * curveStrength * midProgress;
      screenY = controller.lerp(baseY, targetY, midProgress) + this.dx * 0.4 * curveStrength * midProgress;
    } else {
      const finalProgress = (displacementProgress - 0.7) / 0.3;
      const targetDistance = this.distance * this.expansionRate * 1.5;
      const spiralAngle = this.angle + 1.2 * this.rotationDirection * finalProgress * Math.PI;
      screenX = controller.lerp(spiralPos.x + this.dx * 0.7, spiralPos.x + targetDistance * Math.cos(spiralAngle), finalProgress);
      screenY = controller.lerp(spiralPos.y + this.dy * 0.7, spiralPos.y + targetDistance * Math.sin(spiralAngle), finalProgress);
    }

    const vx = ((this.z - controller.cameraZ) * screenX) / controller.viewZoom;
    const vy = ((this.z - controller.cameraZ) * screenY) / controller.viewZoom;
    const sizeMultiplier = displacementProgress < 0.6 ? 1 + displacementProgress * 0.2 : controller.lerp(1.2, this.finalScale, (displacementProgress - 0.6) / 0.4);

    controller.showProjectedDot(new Vector3D(vx, vy, this.z), 8.5 * this.strokeWeightFactor * sizeMultiplier);
  }
}

class SpiralController {
  public readonly cameraZ = -400;
  public readonly viewZoom = 100;

  private readonly cameraTravelDistance = 3400;
  private readonly changeEventTime = 0.32;
  private readonly startDotYOffset = 28;
  private readonly trailLength = 80;
  private readonly numberOfStars = 2200;
  private ctx: CanvasRenderingContext2D;
  private size = 1;
  private time = 0;
  private stars: SpiralStar[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.createStars();
  }

  setSize(size: number) {
    this.size = Math.max(size, 1);
  }

  render(elapsedSeconds: number) {
    this.time = (elapsedSeconds % 15) / 15;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.94)";
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.ctx.save();
    this.ctx.translate(this.size / 2, this.size / 2);

    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1);
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);

    this.ctx.rotate(-Math.PI * this.ease(t2, 2.7));
    this.drawTrail(t1);
    this.ctx.fillStyle = "rgba(255,255,255,0.92)";

    for (const star of this.stars) {
      star.render(t1, this);
    }

    this.drawStartDot();
    this.ctx.restore();
  }

  ease(p: number, g: number) {
    return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  easeOutElastic(x: number) {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }

  map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  constrain(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
  }

  spiralPath(p: number) {
    const eased = this.ease(this.constrain(1.2 * p, 0, 1), 1.8);
    const theta = 2 * Math.PI * 6 * Math.sqrt(eased);
    const r = 170 * Math.sqrt(eased);
    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset);
  }

  showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

    if (position.z <= newCameraZ) return;

    const dotDepthFromCamera = position.z - newCameraZ;
    const x = (this.viewZoom * position.x) / dotDepthFromCamera;
    const y = (this.viewZoom * position.y) / dotDepthFromCamera;
    const sw = Math.max((400 * sizeFactor) / dotDepthFromCamera, 0.18);

    this.ctx.beginPath();
    this.ctx.arc(x, y, sw, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private createStars() {
    let seed = 1234;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    this.stars = Array.from({ length: this.numberOfStars }, () => new SpiralStar(this.cameraZ, this.cameraTravelDistance, random));
  }

  private drawStartDot() {
    if (this.time <= this.changeEventTime) return;

    const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
    this.showProjectedDot(new Vector3D(0, dy, this.cameraTravelDistance), 2.5);
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3 * Math.sin(Math.PI * t1)) * f;
      const position = this.spiralPath(t1 - 0.00015 * i);
      const rotated = this.rotate(position, new Vector2D(position.x + 5, position.y + 5), Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0);

      this.ctx.fillStyle = "rgba(255,255,255,0.96)";
      this.ctx.beginPath();
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean) {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    const dx = v1.x - middle.x;
    const dy = v1.y - middle.y;
    const angle = Math.atan2(dy, dx);
    const r = Math.sqrt(dx * dx + dy * dy);
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);
    const direction = orientation ? -1 : 1;

    return new Vector2D(
      middle.x + r * (1 + bounce) * Math.cos(angle + direction * Math.PI * this.easeOutElastic(p)),
      middle.y + r * (1 + bounce) * Math.sin(angle + direction * Math.PI * this.easeOutElastic(p))
    );
  }
}

export function SpiralAnimationBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const controller = new SpiralController(ctx);
    let animationId = 0;
    let start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      const size = Math.max(width, height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.style.left = `${(width - size) / 2}px`;
      canvas.style.top = `${(height - size) / 2}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      controller.setSize(size);
    };

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    resize();

    const animate = (now: number) => {
      controller.render((now - start) / 1000);
      animationId = requestAnimationFrame(animate);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      start = performance.now();
      controller.render(8);
    } else {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute max-w-none" />
    </div>
  );
}
