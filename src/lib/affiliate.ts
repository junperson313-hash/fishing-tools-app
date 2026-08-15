/**
 * 楽天アフィリエイトのリンク生成。
 * NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID が未設定の間は、素の楽天検索リンクを返す
 * (リンクとしては機能するが、成果は発生しない)。IDを設定すると自動的に
 * アフィリエイトリンクに切り替わる。
 */
const RAKUTEN_AFFILIATE_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID ?? "";

export function rakutenSearchLink(keyword: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
    keyword
  )}/`;

  if (!RAKUTEN_AFFILIATE_ID) {
    return searchUrl;
  }

  const encoded = encodeURIComponent(searchUrl);
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=${encoded}&m=${encoded}`;
}
