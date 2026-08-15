import Image from "next/image";
import { rakutenSearchLink } from "@/lib/affiliate";
import { searchRakutenItems } from "@/lib/rakuten-api";
import AffiliateLink from "@/components/AffiliateLink";

export type AffiliateBlockProps = {
  /** 商品カテゴリ。見出しと計測イベントの両方に使う (例: "PEライン 1.5号") */
  category: string;
  /** 短いおすすめ理由。省略可 */
  reason?: string;
  /** 楽天API検索・フォールバック検索リンクの両方に使うキーワード */
  keyword: string;
  /**
   * 商品カードに表示する短い商品名。楽天の商品名は長いため全文表示せず、
   * サイト側でこの短い名前に置き換える(例: "コスパ重視のPEライン")。
   */
  itemLabel: string;
  /** 商品カードに表示する一言説明。省略可 */
  itemNote?: string;
  hits?: number;
};

/**
 * 楽天市場の商品を検索して表示する共通ブロック。
 * IDやURL生成は src/lib/affiliate.ts / src/lib/rakuten-api.ts に集約されており、
 * このコンポーネントはそれらを呼ぶだけ(直接URLを組み立てない)。
 * 将来Amazon等を追加する場合は、この2つのlibに並行のクライアントを足し、
 * ここでソースを切り替える形を想定している。
 */
export default async function AffiliateBlock({
  category,
  reason,
  keyword,
  itemLabel,
  itemNote,
  hits = 3,
}: AffiliateBlockProps) {
  const items = await searchRakutenItems(keyword, hits);

  return (
    <section aria-labelledby="product-heading" className="mt-8">
      <h2 id="product-heading" className="text-lg font-bold text-sea-900">
        {category}を探す
      </h2>
      {reason && <p className="mt-1 text-sm text-sea-500">{reason}</p>}

      {items && items.length > 0 ? (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.url}>
              <AffiliateLink
                href={item.url}
                category={category}
                keyword={keyword}
                className="flex h-full flex-col gap-2 rounded-xl border border-sea-100 bg-white p-3 transition-colors hover:border-sea-300 hover:bg-sea-50"
              >
                <div className="flex gap-3">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 shrink-0 rounded-lg bg-sea-50" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-sea-800">
                      {itemLabel}
                    </p>
                    {itemNote && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-sea-500">
                        {itemNote}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-bold text-sea-900">
                      {item.price.toLocaleString()}円
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center gap-1 rounded-lg bg-sea-600 py-1.5 text-xs font-medium text-white">
                  楽天市場で見る
                  <span aria-hidden>›</span>
                </span>
              </AffiliateLink>
            </li>
          ))}
        </ul>
      ) : (
        <AffiliateLink
          href={rakutenSearchLink(keyword)}
          category={category}
          keyword={keyword}
          className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-sea-100 bg-white px-4 py-3 text-sm text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          <span>楽天市場で「{keyword}」を探す</span>
          <span className="text-sea-300" aria-hidden>
            →
          </span>
        </AffiliateLink>
      )}

      <p className="mt-2 text-xs text-sea-400">
        楽天市場の商品情報です。価格は変動することがあります。PR・広告リンクを含みます。
      </p>
    </section>
  );
}
