export type PeLineGuideRow = {
  key: string;
  label: string;
  peRange: string;
  leaderRange: string;
  beginnerNote: string;
  caution: string;
};

/**
 * 魚種・釣りジャンル別のPEライン号数の目安。
 * 複数の情報源(釣具のポイント公式「PEライン早見表」、TSURI HACK、
 * sakana-za.com「PEとリーダーの太さ一覧」、tsuriikitai.com、
 * fishing.sunline.co.jp等)を横断して確認した、一般的に紹介されている
 * 号数レンジをもとにしている。号数と強度はメーカー・釣り場・魚のサイズに
 * よって変わるため、断定はせず「一般的な目安」として扱うこと。
 * リーダーは、既存のリーダー換算ツールのFAQにもある
 * 「PE号数の3〜5倍」という一般的な考え方とも矛盾しない範囲で設定している。
 */
export const PE_LINE_GUIDE_TABLE: PeLineGuideRow[] = [
  {
    key: "seabass",
    label: "シーバス",
    peRange: "0.6〜1.2号(基本は0.8〜1号)",
    leaderRange: "フロロカーボン 3〜5号",
    beginnerNote:
      "河川や港湾での近距離戦なら細め、サーフや大型狙いなら太めが目安です。迷ったら0.8号から始めると扱いやすいです。",
    caution:
      "ランカークラスや障害物の多いポイントを狙う場合は、太め側を選ぶと安心です。",
  },
  {
    key: "eging",
    label: "エギング",
    peRange: "0.6〜0.8号(オールシーズンなら0.8号)",
    leaderRange: "フロロカーボン 1.5〜2号",
    beginnerNote:
      "0.6号は秋の小型〜中型イカ狙いで飛距離・操作性重視、0.8号は春の大型イカや藻場・根周りに向きます。",
    caution:
      "エギのサイズと重さの目安は「エギ号数⇔重量 早見表」も参考にしてください。",
  },
  {
    key: "lightgame",
    label: "ライトゲーム(アジング・メバリング全般)",
    peRange: "0.3〜0.4号",
    leaderRange: "フロロカーボン 0.6〜1号",
    beginnerNote: "アジング・メバリングのどちらにも使える万能クラスです。",
    caution:
      "極細PEのためライントラブルが起きやすく、リールのドラグはやや緩めに設定するのがおすすめです。",
  },
  {
    key: "ajing",
    label: "アジング",
    peRange: "0.2〜0.4号(標準は0.3号)",
    leaderRange: "フロロカーボン 0.6〜0.8号",
    beginnerNote:
      "ジグ単(ジグヘッド単体)がメインなら0.3号が扱いやすい標準サイズです。",
    caution:
      "0.2号などの極細ラインはライントラブルが増えやすいため、慣れてから使うのがおすすめです。",
  },
  {
    key: "mebaring",
    label: "メバリング",
    peRange: "0.3〜0.4号",
    leaderRange: "フロロカーボン 0.6〜1号",
    beginnerNote: "アジングとほぼ共通のタックルで兼用しやすいジャンルです。",
    caution: "根の荒いポイントでは、リーダーをやや太めにすると安心です。",
  },
  {
    key: "aomono",
    label: "青物(ショアジギング)",
    peRange: "1.5〜3号(小型は1〜1.5号、大型は3号以上)",
    leaderRange: "フロロ・ナイロン 5〜10号",
    beginnerNote:
      "狙うサイズが読みにくいジャンルなので、迷ったら1.5〜2号から始めるのが無難です。",
    caution:
      "対象魚のサイズ別の目安は「青物用PEラインは何号？」ページでさらに詳しく解説しています。",
  },
  {
    key: "shorejigging",
    label: "ショアジギング",
    peRange: "1〜2号",
    leaderRange: "フロロ・ナイロン 5〜8号",
    beginnerNote: "堤防・磯からのジギング全般に使える標準的な太さです。",
    caution: "根の荒い磯場ではリーダーを太めにしてください。",
  },
  {
    key: "offshorejigging",
    label: "オフショアジギング",
    peRange: "1.5〜4号(大型青物狙いは3号以上)",
    leaderRange: "フロロ・ナイロン 8〜20号",
    beginnerNote:
      "船からのジギングは大型魚が掛かりやすいため、陸っぱりより太め・強めが基本です。",
    caution:
      "船宿・ジャンルによって指定号数が決まっている場合があるので、乗船前に確認してください。",
  },
  {
    key: "tairaba",
    label: "タイラバ",
    peRange: "0.6〜1号(標準は0.8号)",
    leaderRange: "フロロカーボン 2〜3号",
    beginnerNote: "初心者はまず0.8号から始めると扱いやすいです。",
    caution:
      "ヘッドの重さの目安は「タイラバ重量計算ツール」も参考にしてください。",
  },
  {
    key: "surf",
    label: "サーフ",
    peRange: "1〜1.5号",
    leaderRange: "フロロカーボン 4〜6号",
    beginnerNote: "遠投重視のサーフゲーム全般で使われる太さです。",
    caution:
      "ヒラメ・マゴチ狙いは、下のヒラメ専用の目安もあわせて確認してください。",
  },
  {
    key: "hirame",
    label: "ヒラメ",
    peRange: "1〜1.5号(初心者は1.2号から)",
    leaderRange: "フロロカーボン 3〜6号(エイの多い場所は太め)",
    beginnerNote:
      "1.2号から始め、慣れてきたら1号に細くしていくのがおすすめです。",
    caution:
      "エイや根が多い場所では、リーダーを太め(6号以上)にすると安心です。",
  },
  {
    key: "rockfish",
    label: "ロックフィッシュ",
    peRange: "0.6〜1.5号(ライトロックは0.6〜0.8号、通常は1〜1.5号)",
    leaderRange: "フロロ・ナイロン 3〜5号",
    beginnerNote:
      "狙う根魚のサイズやポイントの荒さに合わせて号数を選びます。",
    caution: "岩礁帯が多いジャンルのため、根ズレによるライン切れに注意してください。",
  },
];
