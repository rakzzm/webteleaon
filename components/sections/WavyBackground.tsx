"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const ZOOM_FACTOR = 0.3;
const BASE_WAVE_AMPLITUDE = 0.2;
const RANDOM_WAVE_FACTOR = 0.15;
const WAVE_FREQUENCY = 4.0;
const TIME_FACTOR = 0.25;
const BASE_SWIRL_STRENGTH = 1.2;
const SWIRL_TIME_MULT = 5.0;
const NOISE_SWIRL_FACTOR = 0.2;
const FBM_OCTAVES = 10;

const seaColors = [
  [0.0, 0.02, 0.05],
  [0.0, 0.04, 0.08],
  [0.0, 0.06, 0.12],
  [0.0, 0.08, 0.18],
  [0.0, 0.1, 0.24],
  [0.0, 0.14, 0.32],
  [0.0, 0.2, 0.4],
  [0.0, 0.24, 0.48],
  [0.0, 0.3, 0.55],
  [0.05, 0.35, 0.6],
  [0.08, 0.4, 0.65],
  [0.1, 0.45, 0.7],
  [0.15, 0.5, 0.75],
  [0.2, 0.58, 0.8],
  [0.25, 0.65, 0.85],
  [0.3, 0.72, 0.9],
  [0.4, 0.78, 0.92],
  [0.5, 0.85, 0.95],
  [0.7, 0.9, 0.97],
  [0.85, 0.95, 1.0]
];

function buildFragmentShader() {
  const colorArraySrc = seaColors.map((color) => `vec3(${color[0]}, ${color[1]}, ${color[2]})`).join(",\n  ");

  return `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
#define NUM_COLORS 20
vec3 seaColors[NUM_COLORS] = vec3[](
  ${colorArraySrc}
);
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
float noise2D(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.792843 - 0.853734 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float freq = 1.0;
  for (int i = 0; i < ${Math.floor(FBM_OCTAVES)}; i++) {
    value += amplitude * noise2D(st * freq);
    freq *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}
void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;
  uv *= float(${ZOOM_FACTOR});
  float t = uTime * float(${TIME_FACTOR});
  float waveAmp = float(${BASE_WAVE_AMPLITUDE}) + float(${RANDOM_WAVE_FACTOR}) * noise2D(vec2(t, 27.7));
  uv.x += waveAmp * sin(uv.y * float(${WAVE_FREQUENCY}) + t);
  uv.y += waveAmp * sin(uv.x * float(${WAVE_FREQUENCY}) - t);
  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float swirlStrength = float(${BASE_SWIRL_STRENGTH}) * (1.0 - smoothstep(0.0, 1.0, r));
  angle += swirlStrength * sin(uTime + r * float(${SWIRL_TIME_MULT}));
  uv = vec2(cos(angle), sin(angle)) * r;
  float n = fbm(uv);
  n += float(${NOISE_SWIRL_FACTOR}) * sin(t + n * 3.0);
  float noiseVal = 0.5 * (n + 1.0);
  float idx = clamp(noiseVal, 0.0, 1.0) * float(NUM_COLORS - 1);
  int iLow = int(floor(idx));
  int iHigh = int(min(float(iLow + 1), float(NUM_COLORS - 1)));
  float f = fract(idx);
  vec3 color = mix(seaColors[iLow], seaColors[iHigh], f);
  outColor = (iLow == 0 && iHigh == 0) ? vec4(color, 0.0) : vec4(color, 1.0);
}`;
}

const vertexShaderSource = `#version 300 es
precision mediump float;
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

function createShaderProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;

  gl.shaderSource(vertexShader, vertexSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader));
    return null;
  }

  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader));
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not link WebGL program:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function WavyBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const gl = canvas.getContext("webgl2", { alpha: true });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const program = createShaderProgram(gl, vertexShaderSource, buildFragmentShader());
    if (!program) return;

    gl.useProgram(program);

    const quadVertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "uResolution");
    const time = gl.getUniformLocation(program, "uTime");
    const startTime = performance.now();
    let animationId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(wrapper.clientWidth, 1);
      const height = Math.max(wrapper.clientHeight, 1);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    resize();

    const render = () => {
      animationId = requestAnimationFrame(render);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, (performance.now() - startTime) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative w-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ background: "transparent" }} />
      {children}
    </div>
  );
}
