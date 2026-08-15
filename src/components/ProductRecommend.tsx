import { rakutenSearchLink } from "@/lib/affiliate";

type ProductLink = {
  label: string;
  keyword: string;
};

export default function ProductRecommend({
  title = "関連商品を探す",
  links,
}: {
  title?: string;
  links: ProductLink[];
}) {
  return (
    <section aria-labelledby="product-heading" className="mt-8">
      <h2 id="product-heading" className="text-lg font-bold text-sea-900">
        {title}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.keyword}>
            <a
              href={rakutenSearchLink(link.keyword)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-2 rounded-xl border border-sea-100 bg-white px-4 py-3 text-sm text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
            >
              <span>{link.label}</span>
              <span className="text-sea-300" aria-hidden>
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-sea-400">
        楽天市場の商品検索結果が開きます。PR/広告リンクを含みます。
      </p>
    </section>
  );
}
