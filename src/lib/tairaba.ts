import { interpolateTable, roundTo, TablePoint } from "./convert";

export type CurrentSpeed = "slow" | "normal" | "fast";

export const CURRENT_SPEED_LABEL: Record<CurrentSpeed, string> = {
  slow: "遅い",
  normal: "普通",
  fast: "速い",
};

/**
 * 水深(m)ごとのタイラバ重量(g)目安。
 * 瀬戸内エリアの釣り情報サイトが公開している「水深×潮の速さ」の
 * 早見表(20/40/60/80/100m刻み)をもとにした、3段階(遅い/普通/速い)の
 * 対応表。同種の目安を紹介する別サイトの数値ともおおむね一致する。
 *
 * 「水深(m)×2 ≒ 重さ(g)」という単純な比例式は、実際には水深が
 * 深くなるほど成り立たなくなり(重さの伸びが緩やかになる)ため、
 * 単純な掛け算ではなく、実測に近い値を段階的に補間する方式にしている。
 */
const SLOW_TABLE: TablePoint[] = [
  { x: 10, y: 10 },
  { x: 20, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 60 },
  { x: 80, y: 80 },
  { x: 100, y: 100 },
  { x: 120, y: 120 },
];

const NORMAL_TABLE: TablePoint[] = [
  { x: 10, y: 15 },
  { x: 20, y: 30 },
  { x: 40, y: 60 },
  { x: 60, y: 80 },
  { x: 80, y: 100 },
  { x: 100, y: 120 },
  { x: 120, y: 140 },
];

const FAST_TABLE: TablePoint[] = [
  { x: 10, y: 30 },
  { x: 20, y: 60 },
  { x: 40, y: 80 },
  { x: 60, y: 100 },
  { x: 80, y: 120 },
  { x: 100, y: 150 },
  { x: 120, y: 180 },
];

const TABLE_BY_CURRENT: Record<CurrentSpeed, TablePoint[]> = {
  slow: SLOW_TABLE,
  normal: NORMAL_TABLE,
  fast: FAST_TABLE,
};

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
  const table = TABLE_BY_CURRENT[current];
  const base = interpolateTable(table, depth, "xToY");
  const recommended = roundToStep(base, 10);
  const min = roundToStep(base * 0.85, 10);
  const max = roundToStep(base * 1.2, 10);
  return {
    recommended: roundTo(recommended, 0),
    min: roundTo(min, 0),
    max: roundTo(max, 0),
  };
}
