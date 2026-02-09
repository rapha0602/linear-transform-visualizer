export type Vec2 = { x: number; y: number };
export type Mat2 = { a11: number; a12: number; a21: number; a22: number };

export const I: Mat2 = { a11: 1, a12: 0, a21: 0, a22: 1 };

export function mulMatVec(A: Mat2, v: Vec2): Vec2 {
  return { x: A.a11 * v.x + A.a12 * v.y, y: A.a21 * v.x + A.a22 * v.y };
}

export function det(A: Mat2): number {
  return A.a11 * A.a22 - A.a12 * A.a21;
}

export function lerpMat(A: Mat2, B: Mat2, t: number): Mat2 {
  return {
    a11: A.a11 + (B.a11 - A.a11) * t,
    a12: A.a12 + (B.a12 - A.a12) * t,
    a21: A.a21 + (B.a21 - A.a21) * t,
    a22: A.a22 + (B.a22 - A.a22) * t,
  };
}
