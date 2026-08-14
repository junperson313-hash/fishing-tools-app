# 釣り便利ツール

釣りに役立つ計算・換算ツールをまとめた無料サイトです。外部APIを使わず、すべてブラウザ内で計算が完結します。

## 収録ツール

- PEライン号数⇔lb換算ツール (`/tools/pe-line`)
- リーダー号数⇔lb換算ツール (`/tools/leader`)
- タイラバ重量計算ツール (`/tools/tairaba`)

## 技術構成

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- 外部APIなし（すべてクライアント側で計算）
- Vercel / Cloudflare Pages のどちらにもデプロイ可能な構成

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## ビルド

```bash
npm run build
```

## 環境変数

`NEXT_PUBLIC_SITE_URL` に本番ドメインを設定すると、sitemap.xml や robots.txt、OGP情報に反映されます（未設定時は `https://example.com` が使われます）。

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## デプロイ

### Vercel

GitHubリポジトリと連携し、そのままデプロイ可能です。

### Cloudflare Pages

`@cloudflare/next-on-pages` の利用を推奨します。詳細は [Cloudflare公式ドキュメント](https://developers.cloudflare.com/pages/framework-guides/nextjs/) を参照してください。

## 今後追加予定のツール

- ライン巻量計算ツール
- オモリ号数換算ツール
- 水深別ジグ重量目安ツール
- 魚種別仕掛け検索
- 釣行費用計算ツール

新しいツールを追加する際は、`src/lib/` に計算ロジック、`src/components/tools/` に入力UI、`src/app/tools/<tool-name>/page.tsx` にページを追加し、`src/lib/site.ts` の `TOOLS` に登録してください。
