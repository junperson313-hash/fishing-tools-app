/**
 * 楽天市場商品検索API(IchibaItem Search)のサーバー専用クライアント。
 *
 * 2026年に楽天ウェブサービスのAPI基盤が刷新され、旧エンドポイント
 * (app.rakuten.co.jp)は2026-05-13で完全停止、新エンドポイント
 * (openapi.rakuten.co.jp)+ accessKeyによる認証に変わった。
 * 公式ドキュメント(webservice.rakuten.co.jp/documentation/ichiba-item-search
 * version:2026-07-01)で仕様を確認済み。新エンドポイントは実際に
 * curlでもaccessKey必須のエラーが返ることを確認している。
 *
 * RAKUTEN_APPLICATION_ID / RAKUTEN_ACCESS_KEY が未設定の場合は
 * null を返し、呼び出し側で検索リンクへのフォールバック表示にする。
 */
const ENDPOINT =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701";

const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID ?? "";
const ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY ?? "";
const AFFILIATE_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export type RakutenItem = {
  name: string;
  price: number;
  url: string;
  imageUrl: string | null;
  shopName: string;
};

type RakutenApiItem = {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl?: string;
  mediumImageUrls?: string[];
  shopName: string;
};

// ドキュメントの要約ではformatVersion=2で小文字"items"になるとあったが、
// 実際にcurlでテストしたところ大文字の"Items"が返ってきたため、
// 実測に合わせている(公式ドキュメントの記載よりAPIの実挙動を優先)。
type RakutenApiResponse = {
  Items?: RakutenApiItem[];
};

/**
 * キーワードに合う商品を検索する。1日1回程度の再検証(revalidate)で
 * キャッシュされるため、都度APIを叩かず、レート制限にもかかりにくい。
 * 認証情報が未設定、またはAPI呼び出しに失敗した場合はnullを返す。
 */
export async function searchRakutenItems(
  keyword: string,
  hits = 4
): Promise<RakutenItem[] | null> {
  if (!APPLICATION_ID || !ACCESS_KEY) return null;

  const params = new URLSearchParams({
    applicationId: APPLICATION_ID,
    keyword,
    hits: String(hits),
    format: "json",
    formatVersion: "2",
    sort: "standard",
  });
  if (AFFILIATE_ID) {
    params.set("affiliateId", AFFILIATE_ID);
  }

  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
      headers: {
        accessKey: ACCESS_KEY,
        Referer: SITE_URL,
        Origin: SITE_URL,
      },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;

    const data: RakutenApiResponse = await res.json();
    const items = data.Items ?? [];

    return items.map((item) => ({
      name: item.itemName,
      price: item.itemPrice,
      url: item.affiliateUrl || item.itemUrl,
      imageUrl: item.mediumImageUrls?.[0] ?? null,
      shopName: item.shopName,
    }));
  } catch {
    return null;
  }
}
