import Link from "next/link";
import { TOOLS } from "@/lib/site";

export default function RelatedTools({ currentKey }: { currentKey: string }) {
  const others = TOOLS.filter((tool) => tool.key !== currentKey);
  if (others.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-8">
      <h2 id="related-heading" className="text-lg font-bold text-sea-900">
        関連ツール
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {others.map((tool) => (
          <li key={tool.key}>
            <Link
              href={tool.href}
              className="block h-full rounded-xl border border-sea-100 bg-white p-4 transition-colors hover:border-sea-300 hover:bg-sea-50"
            >
              <p className="font-semibold text-sea-800">{tool.shortTitle}</p>
              <p className="mt-1 text-sm text-sea-500">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
