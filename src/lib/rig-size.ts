export type RigGuideRow = {
  key: string;
  label: string;
  hook: string;
  harisu: string;
  doito: string;
  sinker: string;
  note: string;
};

/**
 * 初心者向けジャンル別「仕掛け」号数の目安。
 * TSURI HACK、rakuraku-fishing-guide.com、TSURINEWS、シマノ公式
 * 初心者ガイド等、複数の情報源で共通して紹介されている号数レンジを
 * まとめたもの。仕掛けは市販の完成品を使うのが基本という前提のもと、
 * 号数の目安を把握するための参考情報として位置づける。
 * 釣り場・対象魚のサイズによって適切な号数は変わるため、
 * 断定的な単一の数値ではなくレンジで示している。
 */
export const RIG_SIZE_TABLE: RigGuideRow[] = [
  {
    key: "sabiki",
    label: "サビキ釣り",
    hook: "袖 5〜6号(市販サビキ仕掛けの標準サイズ)",
    harisu: "市販仕掛けに内蔵(幹糸1.5〜2号程度が多い)",
    doito: "ナイロン 2〜3号",
    sinker: "4〜8号(ウキ併用の遠投なら6〜15号)",
    note: "初心者は市販の完成サビキ仕掛けをそのまま使うのが基本です。オモリは10号以下だと扱いやすいです。",
  },
  {
    key: "choinage",
    label: "ちょい投げ",
    hook: "キツネ・袖 4〜6号",
    harisu: "市販仕掛けに内蔵(1〜2号程度が多い)",
    doito: "ナイロン 3号前後(PEなら0.8〜1号)",
    sinker: "天秤オモリ 3〜10号",
    note: "L型天秤+市販の投げ仕掛け(2本鈎・全長1m以下)が定番の組み合わせです。",
  },
  {
    key: "bukkomi",
    label: "ぶっこみ釣り",
    hook: "丸セイゴ 10〜13号前後",
    harisu: "フロロカーボン 3〜5号",
    doito: "ナイロン 3〜5号(PEなら1〜1.5号)",
    sinker: "10〜18号(遠投時はやや重め)",
    note: "オモリ・スイベル・ハリス・ハリのシンプルな構成です。対象魚に合わせてハリのサイズを調整します。",
  },
  {
    key: "ukizuri",
    label: "ウキ釣り",
    hook: "袖 5〜6号(対象魚により調整)",
    harisu: "フロロカーボン 1〜1.5号",
    doito: "ナイロン 2〜3号",
    sinker: "ウキの浮力に合わせたガン玉〜中通しオモリ",
    note: "初心者は、ウキ・オモリ・ハリスがセットになった市販の完成仕掛けを使うと迷いにくいです。",
  },
];
