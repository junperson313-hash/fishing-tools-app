import type { Metadata } from "next";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";
import { GRAMS_PER_GO, SINKER_TABLE } from "@/lib/sinker";

const TITLE = "オモリ号数⇔g換算 早見表";
const DESCRIPTION =
  "オモリ(鉛)の号数とグラム(g)の対応がひと目でわかる早見表です。1号=3.75gの基準で正確に計算しています。";

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

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sea-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-sea-50 text-sea-700">
            <tr>
              <th className="px-4 py-3 text-left font-medium">号数</th>
              <th className="px-4 py-3 text-left font-medium">g</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sea-100">
            {SINKER_TABLE.map((row) => (
              <tr key={row.go}>
                <td className="px-4 py-3 font-medium text-sea-800">
                  {row.go}号
                </td>
                <td className="px-4 py-3 text-sea-700">{row.gram}g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-sea-400">
        ※ 1号=3.75g(匁)という業界共通の基準で計算しています。ごく一部の特殊な製品では表記が異なる場合があるため、購入前にパッケージも確認してください。
      </p>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          使いたいオモリの号数、または目安にしたいグラム数を早見表から探すだけです。
        </p>
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
