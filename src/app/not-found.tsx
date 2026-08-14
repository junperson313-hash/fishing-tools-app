import Link from "next/link";
import { TOOLS } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <p className="text-5xl" aria-hidden>
        🐟
      </p>
      <h1 className="mt-4 text-2xl font-bold text-sea-900">
        ページが見つかりませんでした
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        お探しのページは移動または削除された可能性があります。以下のツールから探してみてください。
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.key}>
            <Link
              href={tool.href}
              className="block rounded-xl border border-sea-100 bg-white p-4 text-left transition-colors hover:border-sea-300 hover:bg-sea-50"
            >
              <p className="font-semibold text-sea-800">{tool.shortTitle}</p>
              <p className="mt-1 text-sm text-sea-500">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-sea-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-sea-800"
      >
        トップに戻る
      </Link>
    </div>
  );
}
