/**
 * エギ号数⇔重さ(g)の目安。
 * オモリの号数(1号=3.75gで固定)と違い、エギの号数には
 * JIS規格のような統一基準がなく、メーカー・製品によって重さに幅がある
 * ことが複数の情報源(trend-neta.com、ダイワ/シマノ/ヤマシタ各社の
 * 実製品重量)で確認できたため、単一の数値ではなく実測レンジで示す。
 * 号数が同じでも製品によって重さが大きく変わりうる点に注意。
 */
export type EgiRow = { go: string; range: string; keyword: string };

export const EGI_TABLE: EgiRow[] = [
  { go: "2号", range: "6g前後", keyword: "エギ 2号" },
  { go: "2.5号", range: "9〜10g", keyword: "エギ 2.5号" },
  { go: "3号", range: "13.5〜18.5g", keyword: "エギ 3号" },
  { go: "3.5号", range: "18.5〜21g", keyword: "エギ 3.5号" },
  { go: "4号", range: "22〜25g", keyword: "エギ 4号" },
  { go: "4.5号", range: "30〜33g", keyword: "エギ 4.5号" },
];
