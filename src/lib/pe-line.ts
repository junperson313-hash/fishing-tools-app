import { interpolateTable, roundTo, TablePoint } from "./convert";

/**
 * PEライン 号数 ⇔ lb（ポンド）の目安対応表。
 * 業界でよく参照される標準値（号数×20lb前後）を採用しているが、
 * メーカーや編み方（4本/8本組）、グレードによって実際の強度は変わる。
 */
export const PE_LINE_TABLE: TablePoint[] = [
  { x: 0.3, y: 6 },
  { x: 0.4, y: 8 },
  { x: 0.5, y: 10 },
  { x: 0.6, y: 12 },
  { x: 0.8, y: 16 },
  { x: 1, y: 20 },
  { x: 1.2, y: 25 },
  { x: 1.5, y: 30 },
  { x: 2, y: 40 },
  { x: 2.5, y: 50 },
  { x: 3, y: 60 },
  { x: 4, y: 80 },
  { x: 5, y: 100 },
  { x: 6, y: 120 },
  { x: 8, y: 150 },
  { x: 10, y: 180 },
];

export function goToLb(go: number): number {
  return roundTo(interpolateTable(PE_LINE_TABLE, go, "xToY"), 1);
}

export function lbToGo(lb: number): number {
  return roundTo(interpolateTable(PE_LINE_TABLE, lb, "yToX"), 2);
}
