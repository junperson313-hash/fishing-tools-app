/**
 * PEラインの糸巻き量(スプールに巻ける長さ)の号数間換算。
 *
 * 日本釣用品工業会(JAFMA)標準規格の号数⇔直径(mm)対応表
 * (fishing-fishing.com「PEライン換算表」で確認、0.3〜10号の全ポイントで
 * 直径(mm) ≒ 0.171 × √号数 という関係にほぼ完全一致することを確認済み)。
 * これはつまり「号数は直径の2乗(=断面積)にほぼ比例する」ことを意味する。
 *
 * スプールに巻けるラインの体積(≒断面積×長さ)はほぼ一定とみなせるため、
 *   長さ ∝ 1 / 断面積 ∝ 1 / 号数
 * という反比例の関係になる。実際に複数のリールメーカーの糸巻き量表
 * (例: 0.6号200m/0.8号150m/1号120m相当)とも比率が一致することを確認済み。
 *
 * ただしこれはあくまで「同じ太さの規格に沿ったPEライン同士」を仮定した
 * 近似値であり、メーカーやコーティングの有無、ライン種類(PE/ナイロン/
 * フロロ)によって実際の直径・巻き量は変わる。
 */
export function estimateLineCapacity(
  baseGo: number,
  baseMeters: number,
  targetGo: number
): number {
  if (baseGo <= 0 || targetGo <= 0 || baseMeters <= 0) return 0;
  return Math.round(baseMeters * (baseGo / targetGo));
}
