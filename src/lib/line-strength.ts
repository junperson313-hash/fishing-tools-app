/**
 * lb(ポンド)⇔kg の換算。1lb = 0.45359237kg は国際的に定義された固定値で、
 * メーカーによるブレはない(オモリのg⇔ozと同じ「業界標準」区分の値)。
 * 号数⇔lbの換算は、既存の src/lib/pe-line.ts / src/lib/leader.ts の
 * 対応表と src/lib/convert.ts の interpolateTable をそのまま再利用する
 * (このファイルではデータを重複定義しない)。
 */
export const KG_PER_LB = 0.45359237;

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}

export function kgToLb(kg: number): number {
  return kg / KG_PER_LB;
}
