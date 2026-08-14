export type TablePoint = { x: number; y: number };

/**
 * 表の点列を使って線形補間する。
 * direction が "xToY" なら x→y、"yToX" なら y→x を返す。
 * 範囲外の値は表の両端でクランプする。
 */
export function interpolateTable(
  table: TablePoint[],
  value: number,
  direction: "xToY" | "yToX"
): number {
  const points = [...table].sort((a, b) =>
    direction === "xToY" ? a.x - b.x : a.y - b.y
  );

  const get = (p: TablePoint) => (direction === "xToY" ? p.x : p.y);
  const out = (p: TablePoint) => (direction === "xToY" ? p.y : p.x);

  if (value <= get(points[0])) return out(points[0]);
  const last = points[points.length - 1];
  if (value >= get(last)) return out(last);

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const av = get(a);
    const bv = get(b);
    if (value >= av && value <= bv) {
      const ratio = (value - av) / (bv - av);
      return out(a) + ratio * (out(b) - out(a));
    }
  }
  return out(last);
}

export function roundTo(value: number, digits: number): number {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}
