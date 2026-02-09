import type { Mat2 } from "./math";

export type UIRefs = {
  a11: HTMLInputElement;
  a12: HTMLInputElement;
  a21: HTMLInputElement;
  a22: HTMLInputElement;
  t: HTMLInputElement;
  detEl: HTMLElement;
};

export function getUI(): UIRefs {
  const must = (id: string) => {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Elemento #${id} não encontrado no HTML`);
    return el;
  };

  return {
    a11: must("a11") as HTMLInputElement,
    a12: must("a12") as HTMLInputElement,
    a21: must("a21") as HTMLInputElement,
    a22: must("a22") as HTMLInputElement,
    t: must("t") as HTMLInputElement,
    detEl: must("det") as HTMLElement,
  };
}

export function readMatrix(ui: UIRefs): Mat2 {
  return {
    a11: Number(ui.a11.value),
    a12: Number(ui.a12.value),
    a21: Number(ui.a21.value),
    a22: Number(ui.a22.value),
  };
}
