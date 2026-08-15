import Image from "next/image";
import { rakutenSearchLink } from "@/lib/affiliate";
import { searchRakutenItems } from "@/lib/rakuten-api";

export default async function ProductRecommend({
  title = "関連商品を探す",
  keyword,
  hits = 4,
}: {
  title?: string;
  keyword: string;
  hits?: number;
}) {
  const items = await searchRakutenItems(keyword, hits);

  return (
    <section aria-labelledby="product-heading" className="mt-8">
      <h2 id="product-heading" className="text-lg font-bold text-sea-900">
        {title}
      </h2>

      {items && items.length > 0 ? (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="flex h-full gap-3 rounded-xl border border-sea-100 bg-white p-3 transition-colors hover:border-sea-300 hover:bg-sea-50"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    width={72}
                    height={72}
                    unoptimized
                    className="h-[72px] w-[72px] shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-[72px] w-[72px] shrink-0 rounded-lg bg-sea-50" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs text-sea-700">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-sea-900">
                    {item.price.toLocaleString()}円
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <a
          href={rakutenSearchLink(keyword)}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-sea-100 bg-white px-4 py-3 text-sm text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          <span>楽天市場で「{keyword}」を探す</span>
          <span className="text-sea-300" aria-hidden>
            →
          </span>
        </a>
      )}

      <p className="mt-2 text-xs text-sea-400">
        楽天市場の商品情報です。価格は変動することがあります。PR/広告リンクを含みます。
      </p>
    </section>
  );
}
