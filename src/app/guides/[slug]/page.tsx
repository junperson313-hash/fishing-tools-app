import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import AffiliateBlock from "@/components/AffiliateBlock";
import { GUIDE_CONTENTS } from "@/lib/guides";
import { TOOLS } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(GUIDE_CONTENTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_CONTENTS[slug];
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDE_CONTENTS[slug];
  if (!guide) notFound();

  const relatedTools = TOOLS.filter((tool) =>
    guide.relatedToolKeys.includes(tool.key)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: guide.title,
      text: guide.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: guide.answer,
      },
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: guide.title }]} />

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{guide.title}</h1>

      <p className="mt-4 rounded-xl bg-sea-50 p-4 text-sm leading-relaxed text-sea-800">
        {guide.answer}
      </p>

      {guide.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sea-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-sea-50 text-sea-700">
              <tr>
                {guide.table.columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sea-100">
              {guide.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? "px-4 py-3 font-medium text-sea-800"
                          : "px-4 py-3 text-sea-700"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {guide.tableNote && (
        <p className="mt-3 text-xs leading-relaxed text-sea-400">
          ※ {guide.tableNote}
        </p>
      )}

      <AffiliateBlock
        category={guide.affiliateCategory}
        keyword={guide.affiliateKeyword}
        itemLabel={guide.affiliateItemLabel}
        itemNote={guide.affiliateItemNote}
      />

      {relatedTools.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-8">
          <h2 id="related-heading" className="text-lg font-bold text-sea-900">
            関連ツール
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <li key={tool.key}>
                <Link
                  href={tool.href}
                  className="block h-full rounded-xl border border-sea-100 bg-white p-4 transition-colors hover:border-sea-300 hover:bg-sea-50"
                >
                  <p className="font-semibold text-sea-800">
                    {tool.shortTitle}
                  </p>
                  <p className="mt-1 text-sm text-sea-500">
                    {tool.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
