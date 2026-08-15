import { roundTo } from "./convert";

/**
 * オモリ(鉛)の号数は、日本の伝統的な重さの単位「匁(もんめ)」に由来し、
 * 1号 = 1匁 = 3.75g で固定されている。PEラインなどと違い、メーカーによる
 * ブレがほとんどない、業界共通の正確な換算値。
 */
export const GRAMS_PER_GO = 3.75;

export function goToGram(go: number): number {
  return roundTo(go * GRAMS_PER_GO, 2);
}

export function gramToGo(gram: number): number {
  return roundTo(gram / GRAMS_PER_GO, 2);
}

export const SINKER_QUICK_TABLE = [0.5, 1, 2, 3, 5, 6, 8, 10, 15, 20, 25, 30, 40, 50];
