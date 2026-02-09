import { I, det, lerpMat } from "./math";
import { draw } from "./render";
import { getUI, readMatrix } from "./ui";

const canvas = document.querySelector<HTMLCanvasElement>("#c")!;
const ctx = canvas.getContext("2d")!;
const ui = getUI();

const tLabel = document.getElementById("tLabel")!;
const areaEl = document.getElementById("area")!;
const orientEl = document.getElementById("orient")!;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

let playing = false;
let raf = 0;

function render() {
  const A = readMatrix(ui);
  const t = Number(ui.t.value);
  const At = lerpMat(I, A, t);

  const d = det(A);
  ui.detEl.textContent = `det(A) = ${d.toFixed(2)}`;
  areaEl.textContent = `escala de área = ${Math.abs(d).toFixed(2)}`;
  orientEl.textContent = `orientação: ${d < 0 ? "invertida" : "preservada"}`;
  tLabel.textContent = `t = ${t.toFixed(2)}`;

  draw(ctx, { A: At, t, square: unitSquare });
}

const unitSquare = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
];

function hookInputs() {
  const rerender = () => render();
  ["input", "change"].forEach((evt) => {
    ui.a11.addEventListener(evt, rerender);
    ui.a12.addEventListener(evt, rerender);
    ui.a21.addEventListener(evt, rerender);
    ui.a22.addEventListener(evt, rerender);
    ui.t.addEventListener(evt, rerender);
  });
}

function step() {
  if (!playing) return;
  let t = Number(ui.t.value);
  t += 0.01;
  if (t > 1) t = 0;
  ui.t.value = String(t);
  render();
  raf = requestAnimationFrame(step);
}

playBtn.addEventListener("click", () => {
  playing = !playing;
  if (playing) raf = requestAnimationFrame(step);
  else cancelAnimationFrame(raf);
});

resetBtn.addEventListener("click", () => {
  ui.a11.value = "1";
  ui.a12.value = "0";
  ui.a21.value = "0";
  ui.a22.value = "1";
  ui.t.value = "1";
  render();
});

hookInputs();
render();
