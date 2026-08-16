import { PE_LINE_GUIDE_TABLE } from "./pe-line-guide";
import { RIG_SIZE_TABLE } from "./rig-size";

export type PurposeKey =
  | "tairaba"
  | "eging"
  | "seabass"
  | "ajing"
  | "sabiki"
  | "choinage"
  | "aomono"
  | "other";

export const PURPOSE_OPTIONS: { key: PurposeKey; label: string }[] = [
  { key: "tairaba", label: "タイラバ" },
  { key: "eging", label: "エギング" },
  { key: "seabass", label: "シーバス" },
  { key: "ajing", label: "アジング" },
  { key: "sabiki", label: "サビキ釣り" },
  { key: "choinage", label: "ちょい投げ" },
  { key: "aomono", label: "青物" },
  { key: "other", label: "その他・まだ決めていない" },
];

export type ExperienceKey = "first" | "few" | "experienced";

export const EXPERIENCE_OPTIONS: { key: ExperienceKey; label: string }[] = [
  { key: "first", label: "初めて" },
  { key: "few", label: "数回経験あり" },
  { key: "experienced", label: "経験者" },
];

export type BudgetKey = "5000" | "10000" | "20000" | "any";

export const BUDGET_OPTIONS: { key: BudgetKey; label: string }[] = [
  { key: "5000", label: "5,000円以内" },
  { key: "10000", label: "10,000円以内" },
  { key: "20000", label: "20,000円以内" },
  { key: "any", label: "予算を気にしない" },
];

export type OwnedKey =
  | "rod"
  | "reel"
  | "peline"
  | "leader"
  | "lure"
  | "tool"
  | "none";

export const OWNED_OPTIONS: { key: OwnedKey; label: string }[] = [
  { key: "rod", label: "ロッド" },
  { key: "reel", label: "リール" },
  { key: "peline", label: "PEライン" },
  { key: "leader", label: "リーダー" },
  { key: "lure", label: "ルアー・仕掛け" },
  { key: "tool", label: "プライヤーなど小物" },
  { key: "none", label: "何も持っていない" },
];

export type GearPlanItem = {
  key: string;
  name: string;
  /** 「すでに持っているもの」で選ばれたらこの項目を除外する */
  ownedCategory: OwnedKey | null;
  reason: string;
  /** 号数・重さ等の目安(あれば) */
  note?: string;
  useCase: string;
  pickingPoint: string;
  priceRange: string;
  keyword: string;
};

function peLineNote(purposeGuideKey: string): string | undefined {
  return PE_LINE_GUIDE_TABLE.find((r) => r.key === purposeGuideKey)?.peRange;
}
function leaderNote(purposeGuideKey: string): string | undefined {
  return PE_LINE_GUIDE_TABLE.find((r) => r.key === purposeGuideKey)?.leaderRange;
}
function rigNote(genreKey: string, field: "hook" | "harisu" | "doito" | "sinker") {
  return RIG_SIZE_TABLE.find((r) => r.key === genreKey)?.[field];
}

/**
 * 釣りジャンル別の「初心者に必要な道具」プラン。
 * PEライン・リーダーの号数目安は既存の pe-line-guide.ts、
 * 仕掛けの号数目安は既存の rig-size.ts のデータをそのまま再利用しており、
 * このファイルで数値を重複定義していない(値が変わればどちらのツールでも
 * 同じ数値が反映される)。
 *
 * 「なぜ必要か」は断定を避け、あくまで一般的な目安として記述している。
 * 価格目安はAmazon・楽天でよく見かける入門〜中級グレードのレンジの体感値。
 */
export const GEAR_PLANS: Record<PurposeKey, GearPlanItem[]> = {
  tairaba: [
    {
      key: "tairaba-rod",
      name: "タイラバロッド",
      ownedCategory: "rod",
      reason: "タイラバの巻き上げに向いた、しなやかな乗り調子のロッドです。専用ロッドの方が魚の乗りが良くなるとされています。",
      useCase: "タイラバ全般",
      pickingPoint: "初めては6〜6.6ft前後、ミディアムクラスが扱いやすい目安です。",
      priceRange: "5,000〜15,000円程度",
      keyword: "タイラバロッド 初心者",
    },
    {
      key: "tairaba-reel",
      name: "ベイトリール(タイラバ用)",
      ownedCategory: "reel",
      reason: "タイラバは一定速度で巻き続ける釣りのため、ベイトリールが扱いやすいとされています。",
      useCase: "タイラバ全般",
      pickingPoint: "ハンドル1回転あたりの巻き取り長さが表示された、タイラバ対応モデルが目安です。",
      priceRange: "6,000〜20,000円程度",
      keyword: "タイラバ ベイトリール",
    },
    {
      key: "tairaba-peline",
      name: "PEライン",
      ownedCategory: "peline",
      reason: "感度と飛距離のバランスがよく、タイラバで広く使われています。",
      note: peLineNote("tairaba"),
      useCase: "タイラバ",
      pickingPoint: "8本編み、150〜200m程度巻いておくのが目安です。",
      priceRange: "1,500〜3,000円程度",
      keyword: "PEライン タイラバ",
    },
    {
      key: "tairaba-leader",
      name: "フロロリーダー",
      ownedCategory: "leader",
      reason: "根ズレや魚の歯からPEラインを守るため、先に結んで使います。",
      note: leaderNote("tairaba"),
      useCase: "タイラバ",
      pickingPoint: "50m前後の単品を用意しておくと結び替えに困りません。",
      priceRange: "800〜1,500円程度",
      keyword: "フロロリーダー タイラバ",
    },
    {
      key: "tairaba-head",
      name: "タイラバヘッド",
      ownedCategory: "lure",
      reason: "水深・潮の速さに応じた重さを選びます。「タイラバ重量計算ツール」で目安を確認できます。",
      useCase: "タイラバ",
      pickingPoint: "最初は60〜100g前後を数個そろえておくと状況に対応しやすいです。",
      priceRange: "600〜1,200円程度(1個)",
      keyword: "タイラバ ヘッド",
    },
    {
      key: "tairaba-neckti",
      name: "ネクタイ・フック",
      ownedCategory: "lure",
      reason: "消耗品のため予備を用意しておくと安心です。色を変えると反応が変わることもあります。",
      useCase: "タイラバ",
      pickingPoint: "定番カラー(オレンジ・グリーン系)を数種類そろえるのがおすすめです。",
      priceRange: "500〜1,000円程度",
      keyword: "タイラバ ネクタイ フック",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "針を外したり、ラインを切ったりするときに使う必須の小物です。",
      useCase: "全般",
      pickingPoint: "サビ止め加工がされたものが長持ちします。",
      priceRange: "1,500〜3,000円程度",
      keyword: "プライヤー 釣り",
    },
    {
      key: "fish-grip",
      name: "フィッシュグリップ",
      ownedCategory: "tool",
      reason: "魚を安全につかんで、針を外しやすくする道具です。",
      useCase: "全般",
      pickingPoint: "片手で使えるコンパクトなものが扱いやすいです。",
      priceRange: "1,000〜2,500円程度",
      keyword: "フィッシュグリップ",
    },
  ],
  eging: [
    {
      key: "eging-rod",
      name: "エギングロッド",
      ownedCategory: "rod",
      reason: "エギを軽快に操作できる、エギング専用の張りのあるロッドです。",
      useCase: "エギング",
      pickingPoint: "8ft前後のUL〜Lクラスが最初の1本として扱いやすい目安です。",
      priceRange: "6,000〜15,000円程度",
      keyword: "エギングロッド 初心者",
    },
    {
      key: "eging-reel",
      name: "スピニングリール",
      ownedCategory: "reel",
      reason: "遠投とアクションのしやすさから、エギングではスピニングリールが基本です。",
      useCase: "エギング",
      pickingPoint: "2500〜3000番手が扱いやすい目安です。",
      priceRange: "5,000〜15,000円程度",
      keyword: "スピニングリール エギング",
    },
    {
      key: "eging-peline",
      name: "PEライン",
      ownedCategory: "peline",
      reason: "軽いエギを遠くまで飛ばすため、細くて強いPEラインが使われます。",
      note: peLineNote("eging"),
      useCase: "エギング",
      pickingPoint: "150〜200m巻いておくのが目安です。",
      priceRange: "1,500〜3,000円程度",
      keyword: "PEライン エギング",
    },
    {
      key: "eging-leader",
      name: "フロロリーダー",
      ownedCategory: "leader",
      reason: "根ズレ対策と、エギの動きを自然に見せるために使います。",
      note: leaderNote("eging"),
      useCase: "エギング",
      pickingPoint: "30〜50m単品での購入が目安です。",
      priceRange: "800〜1,500円程度",
      keyword: "フロロリーダー エギング",
    },
    {
      key: "egi",
      name: "エギ",
      ownedCategory: "lure",
      reason: "号数(サイズ)と重さの目安は「エギ号数⇔重量 早見表」で確認できます。",
      useCase: "エギング",
      pickingPoint: "最初は3〜3.5号を数色そろえるのが定番です。",
      priceRange: "800〜1,500円程度(1個)",
      keyword: "エギ 3.5号",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "エギ交換や針周りの作業に必須の小物です。",
      useCase: "全般",
      pickingPoint: "サビ止め加工がされたものが長持ちします。",
      priceRange: "1,500〜3,000円程度",
      keyword: "プライヤー 釣り",
    },
  ],
  seabass: [
    {
      key: "seabass-rod",
      name: "シーバスロッド",
      ownedCategory: "rod",
      reason: "ルアーを遠くまで飛ばし、シーバス特有の引きをいなすためのロッドです。",
      useCase: "シーバス",
      pickingPoint: "8.6ft前後、L〜MLクラスが港湾・河川で扱いやすい目安です。",
      priceRange: "6,000〜15,000円程度",
      keyword: "シーバスロッド 初心者",
    },
    {
      key: "seabass-reel",
      name: "スピニングリール",
      ownedCategory: "reel",
      reason: "遠投性と汎用性の高さから、シーバスではスピニングリールが基本です。",
      useCase: "シーバス",
      pickingPoint: "3000〜4000番手が扱いやすい目安です。",
      priceRange: "6,000〜15,000円程度",
      keyword: "スピニングリール シーバス",
    },
    {
      key: "seabass-peline",
      name: "PEライン",
      ownedCategory: "peline",
      reason: "感度と飛距離を両立できるため、シーバスゲームで広く使われています。",
      note: peLineNote("seabass"),
      useCase: "シーバス",
      pickingPoint: "150m前後巻いておくのが目安です。",
      priceRange: "1,500〜3,000円程度",
      keyword: "PEライン シーバス",
    },
    {
      key: "seabass-leader",
      name: "フロロリーダー",
      ownedCategory: "leader",
      reason: "根ズレ対策と、ルアーの自然な動きを保つために使います。",
      note: leaderNote("seabass"),
      useCase: "シーバス",
      pickingPoint: "30〜50m単品での購入が目安です。",
      priceRange: "800〜1,500円程度",
      keyword: "フロロリーダー シーバス",
    },
    {
      key: "seabass-lure",
      name: "ミノー・バイブレーション等のルアー",
      ownedCategory: "lure",
      reason: "最初はレンジ(泳がせる水深)の違うルアーを数種類そろえておくと状況に対応しやすいです。",
      useCase: "シーバス",
      pickingPoint: "9〜11cm前後のフローティングミノューから始めるのが定番です。",
      priceRange: "1,000〜2,000円程度(1個)",
      keyword: "シーバスルアー 初心者セット",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "フックを外すときに使う必須の小物です。シーバスは歯が鋭いので特に重要です。",
      useCase: "全般",
      pickingPoint: "サビ止め加工がされたものが長持ちします。",
      priceRange: "1,500〜3,000円程度",
      keyword: "プライヤー 釣り",
    },
    {
      key: "fish-grip",
      name: "フィッシュグリップ",
      ownedCategory: "tool",
      reason: "シーバスは口の周りが硬く歯もあるため、安全につかむ道具があると安心です。",
      useCase: "全般",
      pickingPoint: "片手で使えるコンパクトなものが扱いやすいです。",
      priceRange: "1,000〜2,500円程度",
      keyword: "フィッシュグリップ",
    },
  ],
  ajing: [
    {
      key: "ajing-rod",
      name: "アジングロッド",
      ownedCategory: "rod",
      reason: "軽いジグヘッドの操作とアジの繊細なアタリを感じ取るための専用ロッドです。",
      useCase: "アジング",
      pickingPoint: "6〜7ft前後、UL(ウルトラライト)クラスが最初の1本として扱いやすい目安です。",
      priceRange: "5,000〜12,000円程度",
      keyword: "アジングロッド 初心者",
    },
    {
      key: "ajing-reel",
      name: "小型スピニングリール",
      ownedCategory: "reel",
      reason: "軽いリグを扱いやすい、アジング向けの小型リールです。",
      useCase: "アジング",
      pickingPoint: "1000〜2000番手が扱いやすい目安です。",
      priceRange: "4,000〜12,000円程度",
      keyword: "スピニングリール アジング",
    },
    {
      key: "ajing-peline",
      name: "PEライン",
      ownedCategory: "peline",
      reason: "極細でも強度があり、アジングの繊細な釣りに向いています。",
      note: peLineNote("ajing"),
      useCase: "アジング",
      pickingPoint: "150m前後巻いておくのが目安です。",
      priceRange: "1,500〜3,000円程度",
      keyword: "PEライン アジング",
    },
    {
      key: "ajing-leader",
      name: "フロロリーダー",
      ownedCategory: "leader",
      reason: "極細PEラインの結束強度を補うために使います。",
      note: leaderNote("ajing"),
      useCase: "アジング",
      pickingPoint: "30m前後単品での購入が目安です。",
      priceRange: "700〜1,200円程度",
      keyword: "フロロリーダー アジング",
    },
    {
      key: "ajing-jighead",
      name: "ジグヘッド・ワーム",
      ownedCategory: "lure",
      reason: "重さの違うジグヘッドを数種類そろえておくと、レンジ(泳がせる水深)を調整しやすくなります。",
      useCase: "アジング",
      pickingPoint: "0.5〜2g程度を数種類、ワームは定番カラーを数色そろえるのが目安です。",
      priceRange: "500〜1,000円程度(セット)",
      keyword: "アジング ジグヘッド ワームセット",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "針を外したり、ラインを切ったりするときに使う小物です。",
      useCase: "全般",
      pickingPoint: "小型のアジング向けサイズが扱いやすいです。",
      priceRange: "1,200〜2,500円程度",
      keyword: "プライヤー アジング",
    },
  ],
  sabiki: [
    {
      key: "sabiki-rod",
      name: "サビキ釣り用ロッド(またはのべ竿)",
      ownedCategory: "rod",
      reason: "堤防からの手軽なサビキ釣りに適した、2〜3m前後の竿です。",
      useCase: "サビキ釣り",
      pickingPoint: "初めては万能竿(汎用の投げ竿)でも代用できます。",
      priceRange: "3,000〜8,000円程度",
      keyword: "サビキ釣り ロッド セット",
    },
    {
      key: "sabiki-reel",
      name: "スピニングリール",
      ownedCategory: "reel",
      reason: "サビキ釣りでは扱いやすさ重視で、小〜中型のスピニングリールが基本です。",
      useCase: "サビキ釣り",
      pickingPoint: "2000〜3000番手が扱いやすい目安です。",
      priceRange: "3,000〜8,000円程度",
      keyword: "スピニングリール サビキ",
    },
    {
      key: "sabiki-line",
      name: "道糸",
      ownedCategory: "peline",
      reason: "リールに巻いておく糸です。サビキ釣りではナイロンラインが主流です。",
      note: rigNote("sabiki", "doito"),
      useCase: "サビキ釣り",
      pickingPoint: "初めから巻かれている「ライン付きリール」を選ぶと手間がかかりません。",
      priceRange: "1,000〜2,000円程度",
      keyword: "ナイロンライン サビキ釣り",
    },
    {
      key: "sabiki-rig",
      name: "サビキ仕掛け",
      ownedCategory: "lure",
      reason: "初心者は針・幹糸・ハリスがセットになった市販の完成仕掛けを使うのが簡単です。",
      note: rigNote("sabiki", "hook"),
      useCase: "サビキ釣り",
      pickingPoint: "「仕掛け号数早見表」も参考に、号数を確認してから選ぶと安心です。",
      priceRange: "300〜600円程度",
      keyword: "サビキ仕掛け 初心者",
    },
    {
      key: "sabiki-sinker",
      name: "オモリ・コマセカゴ",
      ownedCategory: "tool",
      reason: "仕掛けを沈め、撒き餌(コマセ)で魚を寄せるための道具です。",
      note: rigNote("sabiki", "sinker"),
      useCase: "サビキ釣り",
      pickingPoint: "「オモリ号数⇔g換算 早見表」も参考にしてください。",
      priceRange: "500〜1,000円程度",
      keyword: "サビキ釣り オモリ コマセカゴ",
    },
    {
      key: "bucket",
      name: "バケツ・水汲みバケツ",
      ownedCategory: "tool",
      reason: "コマセの準備や手を洗うために、あると便利な道具です。",
      useCase: "サビキ釣り",
      pickingPoint: "ロープ付きの水汲みバケツが定番です。",
      priceRange: "500〜1,500円程度",
      keyword: "水汲みバケツ 釣り",
    },
  ],
  choinage: [
    {
      key: "choinage-rod",
      name: "投げ竿(ちょい投げ用)",
      ownedCategory: "rod",
      reason: "オモリを軽く投げやすい、2〜3m前後のライトな投げ竿です。",
      useCase: "ちょい投げ",
      pickingPoint: "初めては万能竿でも代用できます。",
      priceRange: "3,000〜8,000円程度",
      keyword: "ちょい投げ ロッド 初心者",
    },
    {
      key: "choinage-reel",
      name: "スピニングリール",
      ownedCategory: "reel",
      reason: "扱いやすさ重視で、小〜中型のスピニングリールが基本です。",
      useCase: "ちょい投げ",
      pickingPoint: "2000〜3000番手が扱いやすい目安です。",
      priceRange: "3,000〜8,000円程度",
      keyword: "スピニングリール ちょい投げ",
    },
    {
      key: "choinage-line",
      name: "道糸",
      ownedCategory: "peline",
      reason: "リールに巻いておく糸です。",
      note: rigNote("choinage", "doito"),
      useCase: "ちょい投げ",
      pickingPoint: "初めから巻かれている「ライン付きリール」を選ぶと手間がかかりません。",
      priceRange: "1,000〜2,000円程度",
      keyword: "ナイロンライン ちょい投げ",
    },
    {
      key: "choinage-rig",
      name: "投げ釣り仕掛け",
      ownedCategory: "lure",
      reason: "市販の完成仕掛け(針・ハリス付き)を使うと準備が簡単です。",
      note: rigNote("choinage", "hook"),
      useCase: "ちょい投げ",
      pickingPoint: "キス・ハゼ用の2本鈎仕掛けが定番です。",
      priceRange: "300〜600円程度",
      keyword: "ちょい投げ 仕掛け 初心者",
    },
    {
      key: "choinage-tenbin",
      name: "天秤・オモリ",
      ownedCategory: "tool",
      reason: "仕掛けを底まで沈め、絡みを防ぐための道具です。",
      note: rigNote("choinage", "sinker"),
      useCase: "ちょい投げ",
      pickingPoint: "オモリ一体型のL型天秤が扱いやすい定番です。",
      priceRange: "300〜700円程度",
      keyword: "ちょい投げ 天秤 オモリ",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "針を外したり、ラインを切ったりするときに使う小物です。",
      useCase: "全般",
      pickingPoint: "サビ止め加工がされたものが長持ちします。",
      priceRange: "1,500〜3,000円程度",
      keyword: "プライヤー 釣り",
    },
  ],
  aomono: [
    {
      key: "aomono-rod",
      name: "ショアジギングロッド",
      ownedCategory: "rod",
      reason: "重めのメタルジグを遠投し、青物の強い引きに耐えるための硬めのロッドです。",
      useCase: "青物・ショアジギング",
      pickingPoint: "9〜10ft前後、狙うサイズに応じてMクラス前後から検討するのが目安です。",
      priceRange: "8,000〜20,000円程度",
      keyword: "ショアジギングロッド 初心者",
    },
    {
      key: "aomono-reel",
      name: "大型スピニングリール",
      ownedCategory: "reel",
      reason: "強い引きに耐えるドラグ性能と、太いラインを巻ける糸巻き量が必要です。",
      useCase: "青物・ショアジギング",
      pickingPoint: "4000〜5000番手が扱いやすい目安です。",
      priceRange: "8,000〜20,000円程度",
      keyword: "スピニングリール ショアジギング",
    },
    {
      key: "aomono-peline",
      name: "PEライン",
      ownedCategory: "peline",
      reason: "大型魚の強い引きに耐える強度と、遠投性能を両立できます。",
      note: peLineNote("aomono"),
      useCase: "青物・ショアジギング",
      pickingPoint: "200m前後巻いておくのが目安です。「対象魚別PEライン号数目安」も参考にしてください。",
      priceRange: "2,000〜4,000円程度",
      keyword: "PEライン ショアジギング",
    },
    {
      key: "aomono-leader",
      name: "フロロ・ナイロンリーダー",
      ownedCategory: "leader",
      reason: "根ズレや魚の歯からPEラインを守るため、太めのリーダーを使います。",
      note: leaderNote("aomono"),
      useCase: "青物・ショアジギング",
      pickingPoint: "30m前後単品での購入が目安です。",
      priceRange: "1,000〜2,000円程度",
      keyword: "リーダー ショアジギング",
    },
    {
      key: "aomono-jig",
      name: "メタルジグ",
      ownedCategory: "lure",
      reason: "水深や潮の速さに応じた重さを選びます。最初は複数の重さをそろえておくと安心です。",
      useCase: "青物・ショアジギング",
      pickingPoint: "30〜40g前後を数個そろえるのが定番です。",
      priceRange: "800〜1,500円程度(1個)",
      keyword: "メタルジグ ショアジギング",
    },
    {
      key: "pliers",
      name: "プライヤー(大型対応)",
      ownedCategory: "tool",
      reason: "太いフックを外すため、通常サイズより大きめのプライヤーがあると安心です。",
      useCase: "全般",
      pickingPoint: "口の開きが大きい、大物対応モデルが目安です。",
      priceRange: "2,000〜4,000円程度",
      keyword: "プライヤー 大型魚",
    },
    {
      key: "fish-grip",
      name: "フィッシュグリップ",
      ownedCategory: "tool",
      reason: "青物は歯や体表が鋭いことがあるため、安全につかむ道具がほぼ必須です。",
      useCase: "全般",
      pickingPoint: "大型魚にも対応できる、しっかりしたグリップ力のものが目安です。",
      priceRange: "1,500〜3,000円程度",
      keyword: "フィッシュグリップ 大型魚",
    },
  ],
  other: [
    {
      key: "other-rod-reel",
      name: "汎用ロッド・リールセット",
      ownedCategory: "rod",
      reason: "釣り方がまだ決まっていない場合は、複数の釣りに使える汎用セットから始めるのが失敗しにくいです。",
      useCase: "初めての釣り全般",
      pickingPoint: "サビキ・ちょい投げ・ルアー釣りにある程度対応できる万能セットが目安です。",
      priceRange: "5,000〜10,000円程度",
      keyword: "初心者 釣り竿リールセット",
    },
    {
      key: "other-line",
      name: "道糸(ナイロンライン)",
      ownedCategory: "peline",
      reason: "扱いやすく、初めての釣りに向いている糸です。",
      useCase: "初めての釣り全般",
      pickingPoint: "2〜3号程度が汎用的な目安です。",
      priceRange: "1,000〜2,000円程度",
      keyword: "ナイロンライン 初心者",
    },
    {
      key: "other-rig",
      name: "仕掛けセット(サビキ・ちょい投げ等)",
      ownedCategory: "lure",
      reason: "やりたい釣りが決まったら「仕掛け号数早見表」も参考に、目的に合った仕掛けを選んでください。",
      useCase: "初めての釣り全般",
      pickingPoint: "まずは市販の完成仕掛けから始めるのがおすすめです。",
      priceRange: "300〜800円程度",
      keyword: "初心者 釣り仕掛けセット",
    },
    {
      key: "pliers",
      name: "プライヤー",
      ownedCategory: "tool",
      reason: "針を外したり、ラインを切ったりするときに使う必須の小物です。",
      useCase: "全般",
      pickingPoint: "サビ止め加工がされたものが長持ちします。",
      priceRange: "1,500〜3,000円程度",
      keyword: "プライヤー 釣り",
    },
    {
      key: "tackle-box",
      name: "タックルボックス",
      ownedCategory: "tool",
      reason: "仕掛けや小物をまとめて持ち運べると、現場での準備がスムーズになります。",
      useCase: "全般",
      pickingPoint: "仕切りが調整できるタイプが使いやすい目安です。",
      priceRange: "1,000〜3,000円程度",
      keyword: "タックルボックス 初心者",
    },
  ],
};

export function getGearPlan(
  purpose: PurposeKey,
  owned: OwnedKey[]
): GearPlanItem[] {
  if (owned.includes("none")) return GEAR_PLANS[purpose];
  return GEAR_PLANS[purpose].filter(
    (item) => !item.ownedCategory || !owned.includes(item.ownedCategory)
  );
}

/**
 * 予算・経験に応じた一言アドバイス。個別商品の価格フィルタリングまでは
 * 行わず(実売価格は変動するため)、優先順位の目安を示すだけにとどめている。
 */
export function getBudgetAdvice(
  budget: BudgetKey,
  experience: ExperienceKey
): string {
  if (budget === "5000") {
    return "予算5,000円以内の場合、道具をすべて新しく揃えるのは難しいことが多いです。まずはロッド・リールなど大物から中古品やセット品を検討し、消耗品(ライン・仕掛け・ルアー等)から少しずつ揃えていくのがおすすめです。";
  }
  if (budget === "10000") {
    return "予算10,000円以内であれば、入門向けのロッド・リールのどちらか1つと、消耗品一式を揃えられることが多いです。もう一方は次回以降にステップアップするのも一つの方法です。";
  }
  if (budget === "20000") {
    return "予算20,000円以内であれば、入門〜中級グレードのロッド・リールと、最初に必要な消耗品を一通り揃えやすい目安です。";
  }
  return experience === "first"
    ? "初めての場合は、価格よりも「扱いやすさ」を重視した入門モデルから始めるのがおすすめです。"
    : "予算に余裕がある場合も、まずは必要な道具から優先して揃え、使ってみてから買い足すのが失敗しにくい進め方です。";
}
