export type GuideTable = {
  columns: string[];
  rows: string[][];
};

export type GuideContent = {
  slug: string;
  title: string;
  description: string;
  /** 見出し直下に置く、質問への直接的な回答 */
  answer: string;
  table?: GuideTable;
  tableNote?: string;
  relatedToolKeys: string[];
  affiliateCategory: string;
  affiliateKeyword: string;
  affiliateItemLabel: string;
  affiliateItemNote?: string;
};

/**
 * 購入意欲の高いロングテールQ&Aページの中身。
 * 「回答→根拠となる早見表/目安→関連ツール→購入導線」の4点構成に固定し、
 * SEO目的だけの水増しはしない。今後追加する分もこの型に従うこと。
 *
 * 現在公開しているのは aomono-pe-line のみ。残りは
 * src/lib/site.ts の GUIDES に coming-soon として登録済みで、
 * 実装する際は個別にWeb検索で裏取りしてからここに追加する。
 */
export const GUIDE_CONTENTS: Record<string, GuideContent> = {
  "aomono-pe-line": {
    slug: "aomono-pe-line",
    title: "青物用PEラインは何号？",
    description:
      "ショアジギングで青物(ブリ・ヒラマサ・カンパチ等)を狙うときのPEライン号数の目安を、対象魚のサイズ別にまとめました。",
    answer:
      "狙うサイズによって変わりますが、迷ったら1.5号を基準に、小型なら0.8〜1.5号、ブリクラス(60〜80cm)なら2〜3号、ヒラマサ・カンパチや磯からの大型狙いなら3〜5号が目安です。",
    table: {
      columns: ["ターゲット", "目安サイズ", "PEラインの目安"],
      rows: [
        ["ワカシ・イナダ・サゴシ", "〜50cm", "0.8〜1.5号"],
        ["ワラサ・ブリ(堤防・サーフ)", "60〜80cm", "2〜3号"],
        ["ブリ・ヒラマサ(磯)", "80cm〜", "3〜5号"],
      ],
    },
    tableNote:
      "ヒラマサやカンパチは根に突っ込む習性があり根ズレでラインブレイクしやすいため、ブリより太めのラインが目安になります。地域や釣り場の根の荒さによっても調整してください。",
    relatedToolKeys: ["pe-line", "leader"],
    affiliateCategory: "青物用PEライン",
    affiliateKeyword: "PEライン ショアジギング",
    affiliateItemLabel: "青物狙いにおすすめのPEライン",
    affiliateItemNote: "高強度タイプの定番PEラインです",
  },
};
