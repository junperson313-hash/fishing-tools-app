/**
 * オモリ(鉛)の号数は、日本の伝統的な重さの単位「匁(もんめ)」に由来し、
 * 1号 = 1匁 = 3.75g で固定されている。PEラインなどと違い、メーカーによる
 * ブレがほとんどない、業界共通の正確な換算値(TSURI HACKの号数早見表とも
 * 完全一致を確認済み)。
 */
export const GRAMS_PER_GO = 3.75;

export type SinkerRow = { go: number; gram: number };

export const SINKER_TABLE: SinkerRow[] = [
  0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100,
].map((go) => ({ go, gram: Math.round(go * GRAMS_PER_GO * 100) / 100 }));
