export type HookTypeKey = "sode" | "chinu" | "maruseigo" | "isea";

export type HookType = {
  key: HookTypeKey;
  label: string;
  /** タブ選択時に表示する短い説明(針の特徴・向いている釣り) */
  description: string;
};

/**
 * 針の種類ごとの特徴。号数の基準は針の種類ごとに異なるため、
 * 種類を切り替えると下の号数早見表も切り替わる構成にしている。
 * 出典: tsuribible.com「釣り針の号数」、tacklenote.jp各種針の選び方記事、
 * TSURI HACK、TSURINEWS、fishing-fishing.com 等(いずれも複数の
 * 情報源で共通して紹介されている内容を採用)。
 */
export const HOOK_TYPES: HookType[] = [
  {
    key: "sode",
    label: "袖針",
    description:
      "堤防釣り・サビキ・ウキ釣りなど、初心者が最初に触れることが多い汎用タイプ。",
  },
  {
    key: "chinu",
    label: "チヌ針",
    description:
      "軸が長くフトコロ(針の内側の幅)が広め。チヌ(クロダイ)釣りの定番で、他の魚にも使われる。",
  },
  {
    key: "maruseigo",
    label: "丸セイゴ",
    description:
      "フトコロが狭く、口の小さい魚でも吸い込みやすい形状。スズキ狙いのほか、ぶっこみ釣り全般で使われる汎用タイプ。",
  },
  {
    key: "isea",
    label: "伊勢尼",
    description:
      "軸が太くフトコロが広いため強度が高い。マダイやコイなど、大物とのやり取りを想定したぶっこみ釣り向け。",
  },
];

export type HookSizeRow = {
  key: string;
  fishLabel: string;
  goLabel: string;
};

/**
 * 針の種類ごとの号数⇔対象魚の目安。
 * いずれも「業界共通の統一規格」ではなく、複数の情報源で共通して
 * 紹介されている傾向(号数が大きいほど大きい魚・太い糸に対応)を
 * レンジで示したものであり、断定的な1対1の対応表ではない。
 * メーカー・製品によって同じ号数でもサイズは異なる。
 *
 * 号数だけで判断がつきにくい伊勢尼の細かい号数刻みなど、
 * 裏取りが十分に取れなかった範囲は掲載せず、確認できた
 * レンジのみを掲載している。
 */
export const HOOK_SIZE_TABLES: Record<HookTypeKey, HookSizeRow[]> = {
  sode: [
    { key: "1-2", fishLabel: "ワカサギ・小型のハゼなど", goLabel: "1〜2号" },
    { key: "3-4", fishLabel: "小アジ・小サバ・ハゼなど", goLabel: "3〜4号" },
    { key: "5-6", fishLabel: "アジ・イワシ・小型の堤防魚(標準サイズ)", goLabel: "5〜6号" },
    { key: "7-8", fishLabel: "良型アジ・サバなど", goLabel: "7〜8号" },
    { key: "9-10", fishLabel: "やや大型の魚向け", goLabel: "9〜10号" },
  ],
  chinu: [
    { key: "1-2", fishLabel: "食い渋り時・小型のチヌ(20〜30cm程度)", goLabel: "1〜2号" },
    { key: "3-4", fishLabel: "標準的なサイズのチヌ", goLabel: "3〜4号" },
    { key: "5-6", fishLabel: "活性が高いとき・やや大きめのチヌ", goLabel: "5〜6号" },
    { key: "7", fishLabel: "大型のチヌ狙い", goLabel: "7号前後〜" },
  ],
  maruseigo: [
    { key: "4-7", fishLabel: "小型のスズキ・アジ・カサゴなど", goLabel: "4〜7号" },
    { key: "8-9", fishLabel: "堤防釣りの標準サイズ(汎用性が高い)", goLabel: "8〜9号" },
    { key: "10-11", fishLabel: "やや大きめの魚・ぶっこみ釣り", goLabel: "10〜11号" },
  ],
  isea: [
    { key: "10", fishLabel: "コイのぶっこみ釣りの目安", goLabel: "10号前後" },
    { key: "10-13", fishLabel: "マダイ狙い", goLabel: "10〜13号" },
    { key: "10-15", fishLabel: "大物とのファイトを想定した強度重視のサイズ", goLabel: "10〜15号" },
  ],
};

/**
 * 対象魚・針の種類・号数レンジから、そのまま商品検索に使える
 * キーワードを組み立てる(例: "アジ 袖針 5号 6号")。
 */
export function buildHookKeyword(
  fishLabel: string,
  hookTypeLabel: string,
  goLabel: string
): string {
  const numbers = goLabel.match(/\d+(?:\.\d+)?/g) ?? [];
  const sizePart =
    numbers.length > 0 ? numbers.map((n) => `${n}号`).join(" ") : goLabel;
  return `${fishLabel} ${hookTypeLabel} ${sizePart}`;
}
