import Image from "next/image";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, TOOLS, UPCOMING_TOOLS } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "ja",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden rounded-2xl px-6 py-10 text-white">
        <Image
          src="/images/hero-fish.png"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sea-950/95 via-sea-950/75 to-sea-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-950/70 via-transparent to-transparent" />
        <div className="relative drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:max-w-[65%]">
          <h1 className="text-2xl font-bold leading-snug sm:text-3xl">
            釣りの「換算・計算」を、
            <br />
            スマホでサッと。
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sea-100 sm:text-base">
            {SITE_DESCRIPTION}
          </p>
        </div>
      </section>

      <section aria-labelledby="tools-heading" className="mt-8">
        <h2 id="tools-heading" className="text-lg font-bold text-sea-900">
          ツール一覧
        </h2>
        <ul className="mt-4 grid gap-4">
          {TOOLS.map((tool) => (
            <li key={tool.key}>
              <Link
                href={tool.href}
                className="flex items-center justify-between gap-4 rounded-2xl border border-sea-100 bg-white p-5 shadow-sm transition-colors hover:border-sea-300 hover:bg-sea-50"
              >
                <div>
                  <p className="font-semibold text-sea-900">{tool.title}</p>
                  <p className="mt-1 text-sm text-sea-500">
                    {tool.description}
                  </p>
                </div>
                <span
                  className="shrink-0 text-sea-300"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="upcoming-heading" className="mt-8">
        <h2 id="upcoming-heading" className="text-lg font-bold text-sea-900">
          今後追加予定のツール
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {UPCOMING_TOOLS.map((name) => (
            <li
              key={name}
              className="rounded-full border border-dashed border-sea-200 bg-sea-50 px-3 py-1.5 text-xs text-sea-500"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-heading" className="mt-10">
        <h2 id="about-heading" className="text-lg font-bold text-sea-900">
          このサイトについて
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          釣り便利ツールは、釣りをするときに毎回悩みがちな「号数とlbの換算」や「タイラバの重さ選び」を、その場でサッと確認できるようにまとめた無料の計算ツール集です。数値はすべて目安であり、詳しくは
          <Link href="/about" className="text-sea-700 underline">
            このサイトについて
          </Link>
          をご覧ください。
        </p>
      </section>
    </div>
  );
}
