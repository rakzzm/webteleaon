"use client";

import { useEffect, useRef } from "react";

type ParticleCanvasProps = {
  maxParticles?: number;
  particleSizeMin?: number;
  particleSizeMax?: number;
  speedScale?: number;
  className?: string;
};

type WebGlState = {
  shaderProgram?: WebGLProgram | null;
  attribLocs?: {
    position: number;
    color: number;
  };
  buffers?: {
    position: WebGLBuffer | null;
    color: WebGLBuffer | null;
  };
  uniformLocs?: {
    resolution: WebGLUniformLocation | null;
    tick: WebGLUniformLocation | null;
  };
  data: {
    triangles: number[];
    colors: number[];
  };
};

type Dimensions = {
  width: number;
  height: number;
  cx: number;
  cy: number;
};

const vertexShader = `
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  attribute vec2 a_color;
  varying vec2 v_color;
  void main(){
    gl_Position = vec4(vec2(1, -1) * ((a_position / u_resolution) * 2.0 - 1.0), 0, 1);
    v_color = a_color;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 v_color;
  uniform float u_tick;
  float frac = 1.0 / 6.0;
  void main(){
    float hue = v_color.x + u_tick;
    hue = abs(hue - floor(hue));
    vec4 color = vec4(0, 0, 0, 1);
    if (hue < frac) {
      color.r = 1.0;
      color.g = hue / frac;
      color.b = 0.0;
    } else if (hue < frac * 2.0) {
      color.r = 1.0 - (hue - frac) / frac;
      color.g = 1.0;
      color.b = 0.0;
    } else if (hue < frac * 3.0) {
      color.r = 0.0;
      color.g = 1.0;
      color.b = (hue - frac * 2.0) / frac;
    } else if (hue < frac * 4.0) {
      color.r = 0.0;
      color.g = 1.0 - (hue - frac * 3.0) / frac;
      color.b = 1.0;
    } else if (hue < frac * 5.0) {
      color.r = (hue - frac * 4.0) / frac;
      color.g = 0.0;
      color.b = 1.0;
    } else {
      color.r = 1.0;
      color.g = 0.0;
      color.b = 1.0 - (hue - frac * 5.0) / frac;
    }
    color = vec4(color.rgb * v_color.y, v_color.y);
    gl_FragColor = color;
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertex: WebGLShader, fragment: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  return program;
}

function getCircleTriangles(x: number, y: number, radius: number) {
  const triangles: number[] = [];
  const increment = (Math.PI * 2) / 6;
  let previousX = x + radius;
  let previousY = y;

  for (let angle = 0; angle <= Math.PI * 2 + increment; angle += increment) {
    const nextX = x + radius * Math.cos(angle);
    const nextY = y + radius * Math.sin(angle);
    triangles.push(x, y, previousX, previousY, nextX, nextY);
    previousX = nextX;
    previousY = nextY;
  }

  return triangles;
}

class Particle {
  size = 0;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  time = 1;

  constructor(
    private dimensions: Dimensions,
    private webgl: WebGlState,
    private particleSizeMin: number,
    private particleSizeMax: number,
    private speedScale: number
  ) {
    this.reset();
  }

  reset() {
    this.size = this.particleSizeMin + (this.particleSizeMax - this.particleSizeMin) * Math.random();
    this.x = this.dimensions.cx;
    this.y = this.dimensions.cy;
    this.vx = (Math.random() - 0.5) * 2 * this.speedScale;
    this.vy = -2 - this.speedScale * Math.random();
    this.time = 1;
  }

  step() {
    this.x += (this.vx *= 0.995);
    this.y += (this.vy += 0.05);
    this.time *= 0.99;

    const triangles = getCircleTriangles(this.x, this.y, this.size * this.time);
    const hue = this.vy / 10;

    for (let index = 0; index < triangles.length; index += 2) {
      this.webgl.data.triangles.push(triangles[index], triangles[index + 1]);
      this.webgl.data.colors.push(hue, this.time);
    }

    if (this.y - this.size > this.dimensions.height) this.reset();
  }
}

export function ParticleCanvas({ maxParticles = 1000, particleSizeMin = 2, particleSizeMax = 5, speedScale = 2, className = "" }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const webgl: WebGlState = {
      shaderProgram: createProgram(gl, vertex, fragment),
      data: { triangles: [], colors: [] }
    };

    if (!webgl.shaderProgram) return;
    const shaderProgram = webgl.shaderProgram;

    webgl.attribLocs = {
      position: gl.getAttribLocation(webgl.shaderProgram, "a_position"),
      color: gl.getAttribLocation(webgl.shaderProgram, "a_color")
    };
    webgl.buffers = {
      position: gl.createBuffer(),
      color: gl.createBuffer()
    };
    webgl.uniformLocs = {
      resolution: gl.getUniformLocation(webgl.shaderProgram, "u_resolution"),
      tick: gl.getUniformLocation(webgl.shaderProgram, "u_tick")
    };

    const dimensions: Dimensions = {
      width: parent.clientWidth,
      height: parent.clientHeight,
      cx: parent.clientWidth / 2,
      cy: parent.clientHeight / 2
    };
    const particles: Particle[] = [];
    let tick = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(parent.clientWidth * dpr));
      const height = Math.max(1, Math.floor(parent.clientHeight * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      dimensions.width = parent.clientWidth;
      dimensions.height = parent.clientHeight;
      gl.viewport(0, 0, width, height);
      gl.useProgram(shaderProgram);
      gl.uniform2f(webgl.uniformLocs?.resolution ?? null, dimensions.width, dimensions.height);
    };

    gl.useProgram(shaderProgram);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enableVertexAttribArray(webgl.attribLocs.position);
    gl.enableVertexAttribArray(webgl.attribLocs.color);
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl.buffers.position);
    gl.vertexAttribPointer(webgl.attribLocs.position, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl.buffers.color);
    gl.vertexAttribPointer(webgl.attribLocs.color, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 0);
    resize();

    const clear = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      webgl.data.triangles = [];
      webgl.data.colors = [];
    };

    const draw = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, webgl.buffers?.position ?? null);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(webgl.data.triangles), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, webgl.buffers?.color ?? null);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(webgl.data.colors), gl.STATIC_DRAW);
      gl.drawArrays(gl.TRIANGLES, 0, webgl.data.triangles.length / 2);
    };

    let isVisible = false;
    let isRunning = false;

    const animate = () => {
      if (!isVisible || document.hidden) {
        isRunning = false;
        return;
      }

      clear();
      tick += 1;

      if (particles.length < maxParticles) {
        particles.push(new Particle(dimensions, webgl, particleSizeMin, particleSizeMax, speedScale));
      }

      particles.forEach((particle) => particle.step());
      gl.uniform1f(webgl.uniformLocs?.tick ?? null, tick / 100);
      draw();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      isRunning = false;

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      dimensions.cx = event.clientX - rect.left;
      dimensions.cy = event.clientY - rect.top;
    };

    parent.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);
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

    observer.observe(parent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      parent.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
    };
  }, [maxParticles, particleSizeMax, particleSizeMin, speedScale]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
