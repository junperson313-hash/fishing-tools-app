/**
 * 楽天市場商品検索API(IchibaItem Search)のサーバー専用クライアント。
 * RAKUTEN_APPLICATION_ID(楽天ウェブサービスのアプリID)が未設定の場合は
 * null を返し、呼び出し側で検索リンクへのフォールバック表示にする。
 *
 * エンドポイント・パラメータは公式ドキュメントを参照した2つの独立した
 * 情報源(so-zou.jp系解説、api-zukan.com)で一致を確認済み。
 * https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601
 */
const ENDPOINT =
  "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";

const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID ?? "";
const AFFILIATE_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID ?? "";

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

type RakutenApiResponse = {
  Items?: RakutenApiItem[];
};

/**
 * キーワードに合う商品を検索する。1日1回程度の再検証(revalidate)で
 * キャッシュされるため、都度APIを叩かず、レート制限にもかかりにくい。
 * APP IDが未設定、またはAPI呼び出しに失敗した場合はnullを返す。
 */
export async function searchRakutenItems(
  keyword: string,
  hits = 4
): Promise<RakutenItem[] | null> {
  if (!APPLICATION_ID) return null;

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
