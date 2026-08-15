@AGENTS.md

# 収益化Webサービス制作ルールブック

このファイルは、Claude Codeが「小さな便利ツールサイトを継続的に作って収益化する」ために読む
ルールブックです。このプロジェクト(釣り便利ツール)は量産テンプレートの第1号サイトであり、
ここで確立した設計・命名・手順を、今後作る2個目・3個目のサイトでも踏襲します。

**このファイルの更新について**: 新しい判断パターンが確立したら、このファイル自体を更新してよい。
ただし冒頭の `@AGENTS.md` の行(Next.jsが自動生成・再生成する)は削除・改変しないこと。

## 1. サイトの位置づけ

- テーマ: 釣りに関する「号数・重さ・巻き量」などの実用計算ツール集
- 収益源: 楽天アフィリエイト(実装済み)。将来的にAmazon・広告・Pro課金を追加予定
- 方針: **記事を大量生成するSEOサイトではなく、実際に使われる無料ツールを中心にする**
  - OK: 計算ツール、診断ツール、シミュレーター、比較ツール、早見表、商品選び支援ツール
  - NG: AIで文章だけを量産するページ、内容の薄いキーワード稼ぎページ

## 2. 技術スタック

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Vercel Hobby(無料枠)でホスティング、GitHubで管理
- 静的生成(SSG)+ 楽天APIの結果のみ ISR(`revalidate: 60*60*24`)
- 外部DBなし。ツールのデータはすべて `src/lib/*.ts` にコードとして持つ(小規模サイトなので十分)
- ルート直下の `AGENTS.md` は `next dev` が自動生成・上書きする、このNext.jsバージョン固有の
  注意点ファイル。手で編集しない。`CLAUDE.md` からは `@AGENTS.md` で読み込むだけにする。

## 3. ディレクトリ構成と役割

```
src/
  app/
    page.tsx                 トップページ(ヒーロー + ツール一覧 + 今後追加予定)
    layout.tsx                共通レイアウト、GA4スクリプトの条件付き読み込み
    sitemap.ts / robots.ts    TOOLS/GUIDES配列から自動生成(手動更新不要)
    opengraph-image.tsx       動的OGP画像
    about/ privacy/           固定ページ(運営目的・広告表記・免責事項)
    tools/<tool-key>/page.tsx 各ツールのページ(1ツール=1ルート)
    guides/[slug]/page.tsx    ロングテールQ&Aページ(動的ルート)
  components/
    tools/ToolPageLayout.tsx  ツールページの共通レイアウト(最重要)
    tools/SelectableTable.tsx 早見表(行タップで購入導線を出す汎用コンポーネント)
    tools/ToolViewTracker.tsx ページ表示を計測する非表示コンポーネント
    AffiliateBlock.tsx        商品紹介ブロック(楽天API+フォールバック)
    AffiliateLink.tsx         クリック計測付きの外部リンクラッパー
    ShareButton.tsx           結果シェアボタン(Web Share API / コピー)
    AdSlot.tsx                広告プレースホルダー(未使用時は差し込まない)
    Breadcrumb.tsx            パンくず + BreadcrumbList構造化データ
    Faq.tsx                   FAQ + FAQPage構造化データ
    RelatedTools.tsx          関連ツール(TOOLS配列から自動生成)
    Header.tsx / Footer.tsx   共通ヘッダー・フッター
  lib/
    site.ts                   ★ツール登録の中心。TOOLS/GUIDES/UPCOMING_TOOLSを管理
    affiliate.ts               楽天アフィリエイトのURL生成(IDはここに集約)
    rakuten-api.ts              楽天商品検索APIクライアント(認証情報はサーバー専用env)
    analytics.ts                trackEvent + イベント名の定数・ヘルパー
    guides.ts                   ロングテールQ&Aページのデータ
    <tool-name>.ts               各ツール固有の変換表・計算式(裏取りコメント必須)
```

## 4. 新しいツールを追加する手順(標準フロー)

ユーザーが「○○ツールを追加して」とだけ言った場合、以下を**自分で判断して**進める。
判断に必要な視点は本ファイル末尾の「12. 新ツール企画時に自分で考えること」を使う。

1. `src/lib/<tool-key>.ts` に変換表・計算式を実装する。数値・換算式は必ずWeb検索で裏取りし、
   根拠をコード内コメントに残す(「業界標準がある値」と「メーカーでバラつく値」を区別し、
   後者はレンジで示す)。詳細は9章参照。
2. 入力方式を決める: 号数・サイズのように**現実に決まった刻みでしか商品が存在しない値**は
   `SelectableTable`(早見表タップ式)を優先する。連続値・ユーザー固有の値(巻き量計算の
   「今の巻き量(m)」のような値)だけ数値入力にする。数値入力の乱用はしない。
3. 結果UIが早見表以外に必要な場合(スライダー・ボタン選択など)は
   `src/components/tools/<ToolName>Calculator.tsx` を`"use client"`で作る
   (`TairabaCalculator.tsx` / `LineCapacityCalculator.tsx` を参考にする)。
4. `src/app/tools/<tool-key>/page.tsx` を作り、`ToolPageLayout` を呼び出す。
   title/description/canonical/OGPは`metadata`エクスポートで設定する。
   FAQは3問前後、検索意図に沿った自然な日本語にする(キーワード詰め込み禁止)。
5. `AffiliateBlock` に `category` / `keyword` / `itemLabel`(短い商品名) / `itemNote`
   (一言説明)を渡す。結果に連動したキーワードにする(汎用キーワードで済ませない)。
6. `src/lib/site.ts` の `TOOLS` 配列に1エントリ追加する。これだけで
   トップページ・ヘッダー・関連ツール・サイトマップに自動反映される。
7. `npm run build` を実行し、TypeScript・buildエラーがないことを確認する。
8. Playwrightで390px幅のスクリーンショットを撮り、レイアウト崩れがないか目視確認する。
9. 完了後、変更ファイル・追加機能・収益化ポイント・SEO意図を簡潔に報告する。

**このフローに従えば、新ツール追加で書くコードは「lib 1ファイル + page 1ファイル
(+ 必要ならcalculatorコンポーネント1つ) + site.tsへの1エントリ追加」で完結する。**
ページ全体のマークアップを毎回書き直す必要はない。

## 5. 共通コンポーネント一覧

| コンポーネント | 役割 |
|---|---|
| `ToolPageLayout` | パンくず→H1→説明→ツール本体→購入導線→使い方→(注意書き)→解説→FAQ→(広告枠)→関連ツール、という固定構成を出す |
| `SelectableTable` | 早見表(行タップ→その値の検索リンク表示)。InputForm+ResultCardを1つにした汎用部品 |
| `AffiliateBlock` | 商品カード(短い商品名・一言説明・価格・「楽天市場で見る」ボタン)+PR表記。API失敗時は検索リンクにフォールバック |
| `AffiliateLink` | 外部リンク+クリック計測(`affiliate_click`)の薄いラッパー |
| `ShareButton` | 結果のシェア(Web Share API、非対応時はURLコピー)+`share_click`計測 |
| `AdSlot` | 広告プレースホルダー。**渡さない限り何も表示されない**ので、AdSense未設置でもレイアウトは崩れない |
| `Breadcrumb` | パンくず表示+`BreadcrumbList`構造化データ |
| `Faq` | アコーディオンFAQ+`FAQPage`構造化データ |
| `RelatedTools` | `TOOLS`配列から自動生成される関連ツール一覧 |
| `ToolViewTracker` | `ToolPageLayout`に内蔵。ページ表示時に`tool_view`を自動計測 |

新しいツール固有の入力UIが必要な場合だけ `<ToolName>Calculator.tsx` を追加する
(`"use client"`、状態はそのコンポーネント内に閉じる)。

## 6. ツール登録システム(`src/lib/site.ts`)

```ts
export type ToolInfo = {
  key: string;            // toolKey、URLの/tools/以下、関連ツール判定に使う一意なID
  title: string;          // ページのH1・title
  shortTitle: string;     // ヘッダー・関連ツールカードの短い表記
  description: string;    // カード・meta descriptionのベース
  href: string;           // /tools/xxx
  status: "available" | "coming-soon";
  badge?: string;         // トップページの小さなバッジ(例: "🔥 よく使われています")。多用しない
  icon?: string;          // 絵文字アイコン(将来カードに表示する用、現状は登録のみ)
  category?: string;      // カテゴリ分類(ツール数が増えたら絞り込みに使う)
};
```

`TOOLS`配列に追加するだけで、トップページ・ヘッダーナビ・`RelatedTools`・`sitemap.ts`の
全てに自動反映される。**この配列以外の場所でツール一覧をハードコードしない。**

`GUIDES`配列(`GuideInfo`)も同じ考え方で、`/guides/[slug]`のロングテールQ&Aページを管理する。
中身のデータは`src/lib/guides.ts`の`GUIDE_CONTENTS`に置く。

`UPCOMING_TOOLS`は「今後追加予定」としてトップページに薄く表示するだけの文字列配列。
実装したら`TOOLS`に昇格させ、ここからは消す。

## 7. デザイン原則

- 白背景中心、清潔感、スマホファースト、カード型UI、大きめのタップ領域、十分な余白
- 広告っぽさを出しすぎない(バナーだらけにしない、AdSlotは未実装中は非表示)
- 不要なアニメーションは使わない(hoverの色変化程度にとどめる)
- 基本構成: タイトル → 短い説明 → ツール → 結果 → 関連情報(使い方/解説/FAQ) →
  おすすめ商品 → 別の便利ツール、という順序を`ToolPageLayout`が固定で担保する
- 入力項目は極力少なく。専門知識がなくても迷わず使えることを最優先する
- 結果はひと目で分かる大きな数字・短い文言で表示し、SNSでシェアしたくなる見た目にする

## 8. SEO(実装済み・新規ツールでも必ず維持する)

- 各ページ`export const metadata`で `title` / `description` / `alternates.canonical` /
  `openGraph` を設定する(テンプレートは`layout.tsx`の`title.template`で統一)
- `Breadcrumb`(`BreadcrumbList`)、`Faq`(`FAQPage`)、ガイドページは`QAPage`の構造化データ
- トップページに`WebSite`構造化データ
- `sitemap.ts` / `robots.ts`は`TOOLS`/`GUIDES`配列から自動生成(新規追加時の手動更新不要)
- 動的OGP画像(`opengraph-image.tsx`)
- 内部リンクは`RelatedTools`(全ツール相互リンク)+ ツール↔ガイドの相互リンク
- **SEOのためだけの不自然な文章・キーワード詰め込みは禁止**。FAQ・解説文は実際に読者の
  役に立つ内容だけを書く

## 9. 数値・計算式の裏取りルール(最重要・過去に問題化した経緯あり)

- 換算値・計算式は必ずWeb検索で複数の独立したソースと突き合わせてから公開する
- 「業界標準がある値」(例: オモリ1号=3.75g、oz=28.35g)は断定して良い
- 「メーカー・製品でバラつく値」(例: PEラインの強度、エギの号数と重さ)は断定せず、
  レンジで示し、限界・注意書きをページ内に明記する
- 裏取りの根拠(参照した情報源・確認した一致度)は`src/lib/<tool>.ts`のコメントに残す
- 公式ドキュメントの要約だけを信じず、可能な場合は実際にAPI等をcurlで叩いて確認する
  (楽天APIで実際にドキュメント記載と異なるレスポンス形式だった前例あり)

## 10. 収益化の設計ルール

### アフィリエイト
- IDやURL生成ロジックは`src/lib/affiliate.ts`(URL生成)・`src/lib/rakuten-api.ts`
  (商品検索API)の2ファイルに集約する。コンポーネントから直接URLを組み立てない
- 新しい提携先(Amazon等)を追加する場合も、同じ2ファイルに並行するクライアントを足す形にする
- 商品紹介は「結果→おすすめ商品→商品を見る」という自然な流れを`AffiliateBlock`で統一する。
  広告だらけにしない(1ブロックあたり2〜4商品程度)
- 全ての商品リンクに「PR・広告リンクを含みます」を明記する(ステマ規制対応)
- **既存のアフィリエイトID・APIキーは、明示的な指示がない限り変更しない**

### 広告(AdSense等)
- `AdSlot`コンポーネントを用意済み。`ToolPageLayout`の`adSlot`propに渡すと
  FAQと関連ツールの間に表示される
- **AdSense未審査・未契約の間は、どのページからも`adSlot`を渡さない**
  (空のプレースホルダーを本番に出さない。渡さなければ何も表示されずレイアウトも崩れない)
- 審査が通ったら`adSlot`の中身をAdSenseのタグに差し替える

### 有料化(Pro版・将来)
- 現状は未実装。人気が出たツールが出てきたら検討する
- 想定: 無料版はそのまま維持し、Pro版は「保存機能」「複数条件の一括計算」「広告非表示」等の
  付加価値を追加する形にする(無料版の機能を削って有料化しない)
- 価格帯の目安: 月額300〜980円、または買い切り980〜2,980円
- Stripe連携は`src/app/api/`配下にAPIルートを追加する形を想定(未実装)。
  **Stripe等の外部決済サービスの契約・APIキー発行はユーザーの承認なしに行わない**

## 11. Analyticsイベント設計

`src/lib/analytics.ts`の`ANALYTICS_EVENTS`定数に統一する。新しいイベントを追加する場合も
ここに追記し、呼び出し側は文字列を直接書かずこの定数を使う。

| イベント名 | 発火タイミング | 主なパラメータ |
|---|---|---|
| `tool_view` | ツールページ表示時(`ToolViewTracker`が自動送信) | `tool`(toolKey) |
| `result_view` | 診断・計算の結果が表示された時(必要なツールで個別に呼ぶ) | `tool`, `result` |
| `affiliate_click` | 商品リンク・検索リンクのクリック(`AffiliateLink`が自動送信) | `category`, `keyword` |
| `share_click` | シェアボタンのクリック(`ShareButton`が自動送信) | `tool`, `method`(native_share/copy_link) |

GA4本体は`NEXT_PUBLIC_GA_ID`が設定されている場合のみ`layout.tsx`で読み込まれる
(未設定でもビルド・表示は壊れない)。`trackEvent`系の関数はGA4未接続でも安全に呼べる。

## 12. 新ツール企画時に自分で考えること

「○○ツールを追加して」とだけ言われた場合、以下を自分で判断してから実装する
(毎回細かい仕様を聞き返さない):

1. ユーザーが何を入力するか(できるだけ少なく、専門知識不要に)
2. どんな結果を返すか(ひと目で分かる、シェアしたくなる見せ方)
3. 何が便利なのか(既存ツールとの違い・独自性)
4. どこで収益化できるか(結果に自然に連動する商品カテゴリは何か)
5. SEO上どんな検索意図があるか(想定される検索キーワード、FAQで拾うべき疑問)

一般的に妥当な内容(号数の刻み、計算式の近似方法、FAQの内容等)は自分で判断して進めてよい。
ただし数値の裏取り(9章)は省略しない。

## 13. 勝手に実行してはいけないこと

以下は必ずユーザーに確認してから行う:

- お金が発生する処理(決済実装・課金設定)
- 本番環境の重要な変更(環境変数の削除・書き換え、既存機能を壊す可能性のある大規模変更)
- データ削除
- APIキーの発行・変更・外部サービスの契約(Stripe、広告アカウント等)
- 法的に問題になる可能性がある内容(誇大な効能表示、著作権侵害など)
- `git push --force`、`vercel --prod`を含む本番デプロイ(pushまでは可、本番デプロイは
  基本的に一声かけてから実行する。これまでの運用踏襲)

## 14. リリース前チェックリスト(毎回・省略しない)

- [ ] `npx tsc --noEmit` でTypeScriptエラーが無い
- [ ] `npm run build` が成功する
- [ ] 新規ページ・変更ページのリンク切れが無い(`curl`でステータスコード確認)
- [ ] Playwright等で390px幅のスマホ表示を確認(崩れ・はみ出しが無いか)
- [ ] 数値入力系ツールで 0・空欄・異常値(負の数、極端に大きい数)を入れても壊れない
- [ ] 新規ツールが`TOOLS`配列に追加され、サイトマップ・関連ツールに反映されている
- [ ] title/description/canonical/構造化データが設定されている
- [ ] 既存ページの見た目・機能に意図しない影響が出ていない(差分を確認する)
- [ ] 既存のアフィリエイトID・APIキーを変更していない

エラーやチェック漏れを残した状態で「完了」と報告しない。

## 15. 次のサイトを作るとき(量産フェーズ)

2個目以降のサイトを作る際は、この`fishing-tools-app`を土台にする:

1. リポジトリを複製し、`src/lib/site.ts`のテーマ情報・`src/lib/affiliate.ts`のID・
   `src/lib/rakuten-api.ts`の環境変数名・カラートークン(`sea-*`)をテーマに合わせて差し替える
2. `src/components/`配下の共通コンポーネント(ToolPageLayout, AffiliateBlock,
   AffiliateLink, ShareButton, AdSlot, Breadcrumb, Faq, RelatedTools)はそのまま流用する
3. `src/lib/<tool>.ts` + `src/app/tools/<key>/page.tsx`のペアを、新テーマのツール分だけ作る
4. 本CLAUDE.mdをコピーし、1章(サイトの位置づけ)だけ新サイト用に書き換える。
   2章以降のルールはそのまま使う
