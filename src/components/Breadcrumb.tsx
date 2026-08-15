import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * 見た目は既存ページのパンくず表示と同じ。BreadcrumbList構造化データを追加する。
 * items の最後の要素はリンクなし(現在地)として扱う。
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const full: BreadcrumbItem[] = [{ label: "トップ", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
      {full.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-1">/</span>}
          {item.href && i < full.length - 1 ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
