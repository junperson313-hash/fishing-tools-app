import { amazonSearchLink, rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";

export type GearProductCardProps = {
  name: string;
  reason: string;
  note?: string;
  useCase: string;
  pickingPoint: string;
  priceRange: string;
  keyword: string;
};

/**
 * 診断結果・各ツールの結果画面で使う、道具1点ぶんの紹介カード。
 * 特定の商品(ASIN等)を紐付けるのではなく、キーワード検索リンクで
 * Amazon・楽天の両方に誘導する(AffiliateBlockの商品API連携とは別の、
 * 「カテゴリ単位で検索導線を出す」軽量な部品)。
 */
export default function GearProductCard({
  name,
  reason,
  note,
  useCase,
  pickingPoint,
  priceRange,
  keyword,
}: GearProductCardProps) {
  return (
    <div className="rounded-xl border border-sea-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-semibold text-sea-900">{name}</p>
        {note && (
          <p className="text-sm font-bold text-sea-700">{note}</p>
        )}
      </div>
      <p className="mt-1 text-sm leading-relaxed text-sea-600">{reason}</p>
      <dl className="mt-2 space-y-0.5 text-xs text-sea-500">
        <div>
          <dt className="inline font-medium text-sea-600">用途: </dt>
          <dd className="inline">{useCase}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-sea-600">選ぶポイント: </dt>
          <dd className="inline">{pickingPoint}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-sea-600">価格目安: </dt>
          <dd className="inline">{priceRange}</dd>
        </div>
      </dl>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <AffiliateLink
          href={amazonSearchLink(keyword)}
          category={name}
          keyword={keyword}
          className="flex items-center justify-center rounded-lg border border-sea-200 bg-white px-3 py-2 text-xs font-medium text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          Amazonで探す
        </AffiliateLink>
        <AffiliateLink
          href={rakutenSearchLink(keyword)}
          category={name}
          keyword={keyword}
          className="flex items-center justify-center rounded-lg border border-sea-200 bg-white px-3 py-2 text-xs font-medium text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          楽天で探す
        </AffiliateLink>
      </div>
    </div>
  );
}
