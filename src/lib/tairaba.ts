export type CurrentSpeed = "slow" | "normal" | "fast";

export const CURRENT_SPEED_LABEL: Record<CurrentSpeed, string> = {
  slow: "遅い",
  normal: "普通",
  fast: "速い",
};

const CURRENT_MULTIPLIER: Record<CurrentSpeed, number> = {
  slow: 0.8,
  normal: 1.0,
  fast: 1.25,
};

/**
 * 水深(m)から基準となるタイラバ重量(g)を求める。
 * 「水深10mごとに20g前後プラス」という、船釣り現場でよく使われる
 * ざっくりした目安をベースにしている。あくまで出発点の数値。
 */
function baseWeightFromDepth(depth: number): number {
  if (depth <= 10) return 40;
  if (depth <= 20) return 60;
  if (depth <= 30) return 80;
  if (depth <= 40) return 100;
  if (depth <= 50) return 120;
  if (depth <= 60) return 140;
  return 140 + Math.ceil((depth - 60) / 20) * 20;
}

function roundToStep(value: number, step: number): number {
  return Math.max(step, Math.round(value / step) * step);
}

export type TairabaResult = {
  recommended: number;
  min: number;
  max: number;
};

export function calcTairabaWeight(
  depth: number,
  current: CurrentSpeed
): TairabaResult {
  const base = baseWeightFromDepth(depth) * CURRENT_MULTIPLIER[current];
  const recommended = roundToStep(base, 10);
  const min = roundToStep(base * 0.8, 10);
  const max = roundToStep(base * 1.25, 10);
  return { recommended, min, max };
}
