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

/**
 * oz(オンス)はヤード・ポンド法の重さの単位で、1oz = 28.349523125g が
 * 国際的な定義値(1lb=453.59237gの1/16)。海外製シンカー・ジグヘッドの
 * 表記でよく使われる。号(=g)との換算は上のGRAMS_PER_GOと組み合わせて
 * 求められる。ジグヘッド・海外ルアーでよく使われる分数oz表記を採用。
 */
export const GRAMS_PER_OZ = 28.35;

export type OzRow = { ozLabel: string; oz: number; gram: number; go: number };

const OZ_VALUES: { label: string; oz: number }[] = [
  { label: "1/32oz", oz: 1 / 32 },
  { label: "1/16oz", oz: 1 / 16 },
  { label: "1/8oz", oz: 1 / 8 },
  { label: "3/16oz", oz: 3 / 16 },
  { label: "1/4oz", oz: 1 / 4 },
  { label: "5/16oz", oz: 5 / 16 },
  { label: "3/8oz", oz: 3 / 8 },
  { label: "1/2oz", oz: 1 / 2 },
  { label: "5/8oz", oz: 5 / 8 },
  { label: "3/4oz", oz: 3 / 4 },
  { label: "1oz", oz: 1 },
  { label: "1.5oz", oz: 1.5 },
  { label: "2oz", oz: 2 },
  { label: "3oz", oz: 3 },
  { label: "4oz", oz: 4 },
  { label: "5oz", oz: 5 },
  { label: "6oz", oz: 6 },
  { label: "8oz", oz: 8 },
  { label: "10oz", oz: 10 },
];

export const OZ_TABLE: OzRow[] = OZ_VALUES.map(({ label, oz }) => {
  const gram = Math.round(oz * GRAMS_PER_OZ * 100) / 100;
  const go = Math.round((gram / GRAMS_PER_GO) * 100) / 100;
  return { ozLabel: label, oz, gram, go };
});
