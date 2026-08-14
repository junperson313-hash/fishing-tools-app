import { interpolateTable, roundTo, TablePoint } from "./convert";

/**
 * リーダー（フロロカーボン・ナイロン）の 号数 ⇔ lb 目安対応表。
 * リーダーは太さ（直径）がJIS規格に近い基準で決まっているため、
 * PEラインより号数とlbの対応がメーカー間でそろいやすい。
 * ただし素材（フロロ／ナイロン）やメーカーによる差は依然としてある。
 */
export const LEADER_TABLE: TablePoint[] = [
  { x: 0.8, y: 3 },
  { x: 1, y: 4 },
  { x: 1.2, y: 5 },
  { x: 1.5, y: 6 },
  { x: 2, y: 8 },
  { x: 2.5, y: 10 },
  { x: 3, y: 12 },
  { x: 4, y: 16 },
  { x: 5, y: 20 },
  { x: 6, y: 25 },
  { x: 7, y: 28 },
  { x: 8, y: 30 },
  { x: 10, y: 40 },
  { x: 12, y: 50 },
  { x: 14, y: 55 },
  { x: 16, y: 60 },
  { x: 20, y: 70 },
];

export function goToLb(go: number): number {
  return roundTo(interpolateTable(LEADER_TABLE, go, "xToY"), 1);
}

export function lbToGo(lb: number): number {
  return roundTo(interpolateTable(LEADER_TABLE, lb, "yToX"), 2);
}
