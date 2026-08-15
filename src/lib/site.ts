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
};

export const TOOLS: ToolInfo[] = [
  {
    key: "pe-line",
    title: "PEライン号数⇔lb換算ツール",
    shortTitle: "PEライン換算",
    description: "PEラインの号数とlb(ポンド)を相互に変換します。",
    href: "/tools/pe-line",
    status: "available",
  },
  {
    key: "leader",
    title: "リーダー号数⇔lb換算ツール",
    shortTitle: "リーダー換算",
    description: "フロロ・ナイロンリーダーの号数とlbを相互に変換します。",
    href: "/tools/leader",
    status: "available",
  },
  {
    key: "tairaba",
    title: "タイラバ重量計算ツール",
    shortTitle: "タイラバ重量計算",
    description: "水深と潮の速さから、タイラバの重さの目安を計算します。",
    href: "/tools/tairaba",
    status: "available",
  },
  {
    key: "sinker",
    title: "オモリ号数⇔g換算ツール",
    shortTitle: "オモリ号数換算",
    description: "オモリ(鉛)の号数とグラムを相互に変換します。",
    href: "/tools/sinker",
    status: "available",
  },
  {
    key: "trip-cost",
    title: "釣行費用計算ツール",
    shortTitle: "釣行費用計算",
    description: "ガソリン代・高速代・船代などから、釣行費用と割り勘額を計算します。",
    href: "/tools/trip-cost",
    status: "available",
  },
];

export const UPCOMING_TOOLS: string[] = [
  "ライン巻量計算ツール",
  "水深別ジグ重量目安ツール",
  "魚種別仕掛け検索",
];
