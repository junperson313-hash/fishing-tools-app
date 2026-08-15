import { interpolateTable, roundTo, TablePoint } from "./convert";

/**
 * PEライン 号数 ⇔ lb（ポンド）の目安対応表。
 * 0.3〜2.5号は複数の情報源で一致する「号数×20lb」という標準的な
 * 目安値を採用している。2.5号を超えると、号数に対する強度の伸びが
 * 緩やかになる(号数×20は成立しなくなる)ことが複数の情報源で
 * 確認できたため、3号以上は号数×20より低めの実測に近い値
 * (fishing-fishing.com、tsurisoku.comの号数別早見表)を採用している。
 * それでもメーカーや編み方（4本/8本組）、グレードによって実際の
 * 強度は大きく変わるため、あくまで目安として扱うこと。
 */
export const PE_LINE_TABLE: TablePoint[] = [
  { x: 0.3, y: 6 },
  { x: 0.4, y: 8 },
  { x: 0.5, y: 10 },
  { x: 0.6, y: 12 },
  { x: 0.8, y: 16 },
  { x: 1, y: 20 },
  { x: 1.2, y: 24 },
  { x: 1.5, y: 30 },
  { x: 2, y: 40 },
  { x: 2.5, y: 50 },
  { x: 3, y: 55 },
  { x: 4, y: 60 },
  { x: 5, y: 80 },
  { x: 6, y: 90 },
  { x: 8, y: 100 },
  { x: 10, y: 130 },
];

export function goToLb(go: number): number {
  return roundTo(interpolateTable(PE_LINE_TABLE, go, "xToY"), 1);
}

export function lbToGo(lb: number): number {
  return roundTo(interpolateTable(PE_LINE_TABLE, lb, "yToX"), 2);
}
