import type { Vec2, Mat2 } from "./math";
import { mulMatVec } from "./math";

export type RenderState = {
  A: Mat2;      // matriz atual (A(t))
  t: number;
  square: Vec2[]; // figura base
};

export type View = {
  scale: number;       // pixels por unidade
  origin: Vec2;        // origem em pixels
};

function toScreen(v: Vec2, view: View): { x: number; y: number } {
  return {
    x: view.origin.x + v.x * view.scale,
    y: view.origin.y - v.y * view.scale,
  };
}

export function draw(ctx: CanvasRenderingContext2D, state: RenderState) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  const view: View = {
    scale: Math.min(w, h) / 8, // 8 unidades na tela
    origin: { x: w / 2, y: h / 2 },
  };

  ctx.clearRect(0, 0, w, h);

  drawGrid(ctx, view);
  drawAxes(ctx, view);

  // figura original
  drawPolygon(ctx, state.square, view, "rgba(0,0,0,0.15)", "rgba(0,0,0,0.6)");

  // figura transformada
  const transformed = state.square.map((p) => mulMatVec(state.A, p));
  drawPolygon(ctx, transformed, view, "rgba(255,0,0,0.15)", "rgba(255,0,0,0.9)");

  // vetores base e imagens
  drawVector(ctx, { x: 1, y: 0 }, view, "rgba(0,0,255,0.9)");
  drawVector(ctx, { x: 0, y: 1 }, view, "rgba(0,0,255,0.9)");

  drawVector(ctx, mulMatVec(state.A, { x: 1, y: 0 }), view, "rgba(255,0,0,0.9)");
  drawVector(ctx, mulMatVec(state.A, { x: 0, y: 1 }), view, "rgba(255,0,0,0.9)");
}

function drawGrid(ctx: CanvasRenderingContext2D, view: View) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const step = view.scale;

  ctx.beginPath();
  for (let x = view.origin.x % step; x <= w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = view.origin.y % step; y <= h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawAxes(ctx: CanvasRenderingContext2D, view: View) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.beginPath();
  ctx.moveTo(0, view.origin.y);
  ctx.lineTo(w, view.origin.y);
  ctx.moveTo(view.origin.x, 0);
  ctx.lineTo(view.origin.x, h);
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  pts: Vec2[],
  view: View,
  fill: string,
  stroke: string
) {
  if (pts.length === 0) return;
  const p0 = toScreen(pts[0], view);

  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  for (let i = 1; i < pts.length; i++) {
    const p = toScreen(pts[i], view);
    ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();

  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawVector(ctx: CanvasRenderingContext2D, v: Vec2, view: View, color: string) {
  const o = toScreen({ x: 0, y: 0 }, view);
  const p = toScreen(v, view);

  ctx.beginPath();
  ctx.moveTo(o.x, o.y);
  ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // pontinha
  ctx.beginPath();
  ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
