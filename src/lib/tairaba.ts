export type CurrentSpeed = "slow" | "normal" | "fast";

export const CURRENT_SPEED_LABEL: Record<CurrentSpeed, string> = {
  slow: "遅い",
  normal: "普通",
  fast: "速い",
};

export type TairabaBand = {
  key: string;
  label: string;
  slow: string;
  normal: string;
  fast: string;
};

/**
 * 水深の帯(バンド)ごとのタイラバ重量の目安。
 * 瀬戸内エリアの釣り情報サイトが公開している「水深×潮の速さ」の
 * 早見表(〜20m/20〜40m/40〜60m/60〜80m/80〜100m)をそのまま採用。
 * 大手釣具チェーン「釣具のポイント」の「40〜80gは浅場、60〜100gが
 * スタンダード、150g以上は深場・早潮」という区分とも矛盾しない。
 *
 * 以前はこの帯データを1m単位の数値に補間して連続的に見せていたが、
 * 実際の釣行で水深を1m単位で気にする人はいないうえ、根拠のない
 * 補間区間(特に浅場)で不自然な傾きが出る問題があったため撤廃し、
 * 情報源にある帯そのままの数値を表示する方式にした。
 */
export const TAIRABA_BANDS: TairabaBand[] = [
  { key: "20", label: "〜20m", slow: "20g以下", normal: "20〜30g", fast: "40〜60g" },
  { key: "20-40", label: "20〜40m", slow: "30〜40g", normal: "40〜60g", fast: "60〜80g" },
  { key: "40-60", label: "40〜60m", slow: "60g", normal: "60〜80g", fast: "80〜100g" },
  { key: "60-80", label: "60〜80m", slow: "80g", normal: "80〜100g", fast: "100〜120g" },
  { key: "80-100", label: "80〜100m", slow: "100g", normal: "100〜120g", fast: "130〜150g" },
];
