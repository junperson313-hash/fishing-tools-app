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
    title: "PEライン号数⇔lb換算 早見表",
    shortTitle: "PEライン換算",
    description: "PEラインの号数とlb(ポンド)の対応が早見表でわかります。",
    href: "/tools/pe-line",
    status: "available",
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
];

export const UPCOMING_TOOLS: string[] = [
  "ライン巻量計算ツール",
  "水深別ジグ重量目安ツール",
  "魚種別仕掛け検索",
];
