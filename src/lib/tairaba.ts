export type CurrentSpeed = "slow" | "normal" | "fast";

export const CURRENT_SPEED_LABEL: Record<CurrentSpeed, string> = {
  slow: "遅い",
  normal: "普通",
  fast: "速い",
};

const CURRENT_MULTIPLIER: Record<CurrentSpeed, number> = {
  slow: 0.8,
  normal: 1.0,
  fast: 1.3,
};

/**
 * 水深(m)から基準となるタイラバ重量(g)を求める。
 * 複数の釣り情報サイトで共通して紹介されている
 * 「水深(m)×2 ≒ 重さ(g)」という目安をベースにしている
 * (例: 水深20m→40g、水深30m→60g、水深50m→100g)。
 * 「水深とほぼ同じg数」というより軽めの目安もあり、
 * これはあくまで数ある目安のひとつ。
 */
function baseWeightFromDepth(depth: number): number {
  return depth * 2;
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
