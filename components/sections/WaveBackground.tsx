"use client";

import { useEffect, useRef } from "react";

const vertex = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 uResolution;
  uniform float uTime;
  uniform int uDarkTheme;

  vec3 lightPalette(float t) {
    return mix(
      vec3(0.9, 0.95, 1.0),
      vec3(0.2, 0.4, 0.8),
      0.5 + 0.5 * sin(6.2831 * t)
    );
  }

  vec3 darkPalette(float t) {
    return mix(
      vec3(0.05, 0.1, 0.2),
      vec3(0.1, 0.6, 0.9),
      0.5 + 0.5 * cos(6.2831 * t)
    );
  }

  float wave(vec2 uv, float speed, float offset) {
    return sin(uv.x * 3.0 + uTime * speed + offset) * 0.3 +
      cos(uv.y * 2.0 - uTime * speed * 0.5 + offset) * 0.2;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float w1 = wave(uv, 1.2, 0.0);
    float w2 = wave(uv, 0.8, 2.0);
    float w3 = wave(uv, 1.5, 4.0);
    float pattern = (w1 + w2 + w3) * 0.5;

    vec3 col;
    if (uDarkTheme == 1) {
      col = darkPalette(pattern + uTime * 0.05);
    } else {
      col = lightPalette(pattern + uTime * 0.05);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

type WaveBackgroundProps = {
  darkTheme?: boolean;
  resolutionScale?: number;
  className?: string;
};

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Wave shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Wave shader link error:", gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

export function WaveBackground({ darkTheme = false, resolutionScale = 1, className = "" }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    const buffer = gl.createBuffer();
    if (!buffer) return;

    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const darkThemeLocation = gl.getUniformLocation(program, "uDarkTheme");

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    let frame = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = 1;
      const width = Math.max(1, Math.floor(parent.clientWidth * dpr * resolutionScale));
      const height = Math.max(1, Math.floor(parent.clientHeight * dpr * resolutionScale));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, parent.clientWidth, parent.clientHeight);
    };

    let isVisible = false;
    let isRunning = false;

    const render = () => {
      if (!isVisible || document.hidden) {
        isRunning = false;
        return;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(timeLocation, (performance.now() - start) / 1000);
      gl.uniform1i(darkThemeLocation, darkTheme ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        frame = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isRunning = false;
      cancelAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
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

    observer.observe(parent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
    };
  }, [darkTheme, resolutionScale]);

  return <canvas ref={canvasRef} className={`absolute inset-0 block h-full w-full ${className}`} aria-hidden="true" />;
}
