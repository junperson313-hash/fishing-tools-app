import { interpolateTable, roundTo, TablePoint } from "./convert";

/**
 * PEライン 号数 ⇔ lb（ポンド）の目安対応表。
 * 複数の釣り情報サイトで共通して紹介されている「号数×20lb」という
 * 標準的な目安値を採用している(0.3〜4号は独立した2つの情報源で
 * 数値が一致)。ただし号数×10〜×15とする、より控えめな目安を
 * 紹介するサイトもあり、メーカーや編み方（4本/8本組）、グレードに
 * よって実際の強度は大きく変わる。
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
