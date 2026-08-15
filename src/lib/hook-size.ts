export type HookSizeRow = {
  key: string;
  fishLabel: string;
  goLabel: string;
  keyword: string;
};

/**
 * 釣り針の号数⇔対象魚の目安。
 * 針は「袖(そで)針」を基準にしている。袖針は堤防・波止釣りで最も
 * 汎用的に使われるタイプで、サビキ・ウキ釣り・ちょい投げなど
 * 初心者が最初に触れる釣りの多くで採用されている(tsuribible.com、
 * hama-angler.com、mahiroapps.com/hook-size-guide 等で確認)。
 *
 * 重要な注意点: 針の号数は「袖」「丸せいご」「チヌ」「伊勢尼」など
 * 針の種類(形状)によって同じ号数でもサイズがまったく異なり、
 * 業界共通の統一規格ではない。ここでは初心者が最初に触れることが
 * 多い袖針を基準に、複数の情報源で共通して紹介されている
 * 「口の小さい魚は小さい号数、大きい魚・大きい口の魚は大きい号数」
 * という傾向をレンジで示している。断定的な1対1の対応ではない点に注意。
 */
export const HOOK_SIZE_TABLE: HookSizeRow[] = [
  {
    key: "wakasagi",
    fishLabel: "ワカサギ・極小のハゼ",
    goLabel: "1〜3号",
    keyword: "袖針 2号",
  },
  {
    key: "sayori",
    fishLabel: "サヨリ・小さいイワシ",
    goLabel: "3〜4号",
    keyword: "袖針 4号",
  },
  {
    key: "aji-iwashi",
    fishLabel: "アジ・イワシ・ハゼ(標準サイズ)",
    goLabel: "5〜6号",
    keyword: "袖針 6号",
  },
  {
    key: "aji-oo-saba-mebaru",
    fishLabel: "大型アジ・サバ・メバル",
    goLabel: "7〜9号",
    keyword: "袖針 8号",
  },
  {
    key: "kasago-chin",
    fishLabel: "カサゴ等の根魚・小型チヌ",
    goLabel: "10〜13号",
    keyword: "袖針 12号",
  },
  {
    key: "chin-oomono",
    fishLabel: "チヌ・大型根魚・青物のエサ釣り",
    goLabel: "15号前後〜",
    keyword: "袖針 15号",
  },
];
