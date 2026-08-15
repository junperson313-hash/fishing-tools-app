export const SITE_NAME = "釣り便利ツール";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const SITE_DESCRIPTION =
  "PEライン号数⇔lb換算、リーダー号数⇔lb換算、タイラバ重量の目安など、釣りに役立つ計算ツールをまとめた無料サイトです。";

export type ToolInfo = {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  /** トップページのツールカードに表示する小さなバッジ(任意)。例: "🔥 よく使われています" */
  badge?: string;
  /** カード等に表示する絵文字アイコン(任意、現状は未使用だが登録項目として用意) */
  icon?: string;
  /** ツールのカテゴリ分類(任意、ツール数が増えて分類表示が必要になったら使う) */
  category?: string;
};

export const TOOLS: ToolInfo[] = [
  {
    key: "pe-line",
    title: "PEライン号数⇔lb換算 早見表",
    shortTitle: "PEライン換算",
    description: "PEラインの号数とlb(ポンド)の対応が早見表でわかります。",
    href: "/tools/pe-line",
    status: "available",
    badge: "🔥 よく使われています",
  },
  {
    key: "leader",
    title: "リーダー号数⇔lb換算 早見表",
    shortTitle: "リーダー換算",
    description: "フロロ・ナイロンリーダーの号数とlbの対応が早見表でわかります。",
    href: "/tools/leader",
    status: "available",
  },
  {
    key: "tairaba",
    title: "タイラバ重量計算ツール",
    shortTitle: "タイラバ重量計算",
    description: "水深帯と潮の速さから、タイラバの重さの目安が早見表でわかります。",
    href: "/tools/tairaba",
    status: "available",
  },
  {
    key: "sinker",
    title: "オモリ号数⇔g換算 早見表",
    shortTitle: "オモリ号数換算",
    description: "オモリ(鉛)の号数とグラムの対応が早見表でわかります。",
    href: "/tools/sinker",
    status: "available",
  },
  {
    key: "sinker-oz",
    title: "シンカー oz⇔g⇔号 換算 早見表",
    shortTitle: "シンカーoz換算",
    description: "海外シンカー・ジグヘッドのoz表記とg・号数の対応が早見表でわかります。",
    href: "/tools/sinker-oz",
    status: "available",
  },
  {
    key: "egi",
    title: "エギ号数⇔重量 早見表",
    shortTitle: "エギ号数換算",
    description: "エギングのエギの号数と重さの目安が早見表でわかります。",
    href: "/tools/egi",
    status: "available",
  },
  {
    key: "line-capacity",
    title: "PEライン巻き量計算ツール",
    shortTitle: "PEライン巻き量計算",
    description: "号数を変えたときの糸巻き量(m)の目安を計算できます。",
    href: "/tools/line-capacity",
    status: "available",
  },
  {
    key: "pe-line-guide",
    title: "対象魚別PEライン号数目安",
    shortTitle: "PEライン号数目安",
    description: "魚種・釣りジャンルを選ぶだけでPEラインとリーダーの号数目安がわかります。",
    href: "/tools/pe-line-guide",
    status: "available",
  },
  {
    key: "line-strength-converter",
    title: "ライン強度 kg⇔lb⇔号数 換算ツール",
    shortTitle: "ライン強度換算",
    description: "号数・lb・kgのどれか1つを入力すると、残り2つの目安がわかります。",
    href: "/tools/line-strength-converter",
    status: "available",
  },
  {
    key: "rig-size-guide",
    title: "仕掛け号数早見表",
    shortTitle: "仕掛け号数早見表",
    description: "サビキ・ちょい投げ等、ジャンルを選ぶと針・ハリス・道糸・オモリの号数目安がわかります。",
    href: "/tools/rig-size-guide",
    status: "available",
  },
  {
    key: "hook-size-guide",
    title: "フックサイズ⇔対象魚の目安表",
    shortTitle: "フックサイズ目安",
    description: "針の種類(袖・チヌ・丸セイゴ・伊勢尼)ごとに、対象魚⇔号数の目安が探せます。",
    href: "/tools/hook-size-guide",
    status: "available",
  },
];

/**
 * 今後追加予定のツール(優先順位順)。
 * 中〜低優先度のものは、追加時に個別のWeb検索による裏取りが
 * 必要になる(タイラバと同水準の検証コスト)。
 */
export const UPCOMING_TOOLS: string[] = [
  "水深・潮流別ジグ重量計算",
  "リール下巻き量計算",
  "潮見表・タイドグラフ計算",
  "釣行前チェックリスト",
  "釣り場別タックル診断",
];

export type GuideInfo = {
  slug: string;
  title: string;
  question: string;
  status: "available" | "coming-soon";
};

/**
 * 「PE1号に合うリーダーは何号？」のような、購入意欲の高い
 * ロングテールQ&Aページ。/guides/[slug] で公開する。
 * 水増しした薄いページを量産しないため、公開は実際に中身のある
 * ものだけに絞り、残りはロードマップとしてここに残す。
 */
export const GUIDES: GuideInfo[] = [
  {
    slug: "aomono-pe-line",
    title: "青物用PEラインは何号？",
    question: "青物用PEラインは何号？",
    status: "available",
  },
  {
    slug: "pe1-leader",
    title: "PE1号に合うリーダーは何号？",
    question: "PE1号に合うリーダーは何号？",
    status: "coming-soon",
  },
  {
    slug: "suishin60-tairaba",
    title: "水深60mのタイラバは何g？",
    question: "水深60mのタイラバは何g？",
    status: "coming-soon",
  },
  {
    slug: "eging-leader",
    title: "エギングのリーダーは何号？",
    question: "エギングのリーダーは何号？",
    status: "coming-soon",
  },
  {
    slug: "shore-jigging-pe",
    title: "ショアジギングのPEラインは何号？",
    question: "ショアジギングのPEラインは何号？",
    status: "coming-soon",
  },
];
