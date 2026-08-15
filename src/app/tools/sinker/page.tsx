import type { Metadata } from "next";
import SinkerCalculator from "@/components/tools/SinkerCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";
import { GRAMS_PER_GO, SINKER_QUICK_TABLE, goToGram } from "@/lib/sinker";

const TITLE = "オモリ号数⇔g換算ツール";
const DESCRIPTION =
  "オモリ(鉛)の号数とグラム(g)を相互に変換できる無料ツールです。1号=3.75gの基準で正確に計算します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/sinker" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "オモリの号数はなぜ1号=3.75gなのですか？",
    answer:
      "オモリの号数は、日本で昔から使われてきた重さの単位「匁(もんめ)」がもとになっています。1匁=3.75gと定められており、鉛オモリの世界では1号=1匁として扱われてきたため、1号=3.75gという換算が業界標準として広く使われています。",
  },
  {
    question: "PEラインやリーダーの号数と同じ考え方ですか？",
    answer:
      "単位の名前は同じ「号」ですが、意味はまったく異なります。ラインの号数は太さを表す単位で、メーカーによって強度に差が出ますが、オモリの号数は重さそのものを表す単位で、3.75gという固定値をかけるだけで正確に求められます。",
  },
  {
    question: "号数とgのどちらで選べばいいですか？",
    answer:
      "国内の船釣り・堤防釣りでは号数表記のオモリが主流ですが、ルアーのシンカーやジグヘッドはg表記が多い傾向があります。仕掛けの指定に合わせて、このツールで換算しながら選ぶとスムーズです。",
  },
];

export default function SinkerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>オモリ号数換算</span>
      </nav>

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        {DESCRIPTION}
      </p>

      <div className="mt-6">
        <SinkerCalculator />
      </div>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>「号数」欄に、使いたいオモリの号数を入力します。</li>
          <li>自動的に「重さ(g)」欄にグラム数が表示されます。</li>
          <li>逆に、gを入力すれば号数を確認できます。</li>
        </ol>
      </section>

      <section aria-labelledby="table-heading" className="mt-8">
        <h2 id="table-heading" className="text-lg font-bold text-sea-900">
          オモリ号数⇔g 早見表
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-sea-100">
          <table className="w-full min-w-[280px] text-sm">
            <thead className="bg-sea-50 text-sea-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium">号数</th>
                <th className="px-4 py-2 text-left font-medium">g</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sea-100">
              {SINKER_QUICK_TABLE.map((go) => (
                <tr key={go}>
                  <td className="px-4 py-2 text-sea-800">{go}号</td>
                  <td className="px-4 py-2 text-sea-800">{goToGram(go)}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="explain-heading" className="mt-8">
        <h2 id="explain-heading" className="text-lg font-bold text-sea-900">
          オモリの号数について
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          オモリの号数は「1号={GRAMS_PER_GO}g」という固定の基準で決まっており、ラインの号数のようにメーカーによるブレはほとんどありません。仕掛け図やタックル指定で号数とg表記が混在していても、この換算式を使えば正確に対応関係を求められます。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="sinker" />
    </div>
  );
}
