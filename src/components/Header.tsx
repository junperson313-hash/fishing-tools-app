import Link from "next/link";
import { SITE_NAME, TOOLS } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sea-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            🎣
          </span>
          <span className="text-lg font-bold tracking-tight text-sea-900">
            {SITE_NAME}
          </span>
        </Link>
        <nav aria-label="ツール一覧" className="-mx-1 overflow-x-auto">
          <ul className="flex gap-1 whitespace-nowrap text-sm">
            {TOOLS.map((tool) => (
              <li key={tool.key}>
                <Link
                  href={tool.href}
                  className="inline-block rounded-full px-3 py-1.5 text-sea-800 hover:bg-sea-50 hover:text-sea-900"
                >
                  {tool.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
