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

/**
 * Amazonアフィリエイトのリンク生成。楽天と同じ考え方で、
 * NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG が未設定の間は素のAmazon検索リンクを返す
 * (リンクとしては機能するが、成果は発生しない)。タグを設定すると自動的に
 * アソシエイトリンクに切り替わる。架空のタグ・URLはここでは設定していない。
 */
const AMAZON_ASSOCIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? "";

export function amazonSearchLink(keyword: string): string {
  const searchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;

  if (!AMAZON_ASSOCIATE_TAG) {
    return searchUrl;
  }

  return `${searchUrl}&tag=${encodeURIComponent(AMAZON_ASSOCIATE_TAG)}`;
}
