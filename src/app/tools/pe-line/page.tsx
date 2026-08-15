import type { Metadata } from "next";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import ProductRecommend from "@/components/ProductRecommend";
import { PE_LINE_TABLE } from "@/lib/pe-line";

const TITLE = "PEライン号数⇔lb換算 早見表";
const DESCRIPTION =
  "PEラインの号数とlb(ポンド)の対応がひと目でわかる早見表です。0.3号から10号まで、よく使う号数を掲載しています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/pe-line" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "PEラインの号数とlbはどういう関係ですか？",
    answer:
      "号数はラインの太さ(糸の断面積)を表す単位、lbはラインが切れるまでの強さ(強力)を表す単位です。目安として「号数×20lb」という関係が0.3〜2.5号くらいまではよく使われますが、それより太い号数になると、号数が増えるほど強さの伸びが緩やかになり、号数×20よりも低めの数値になっていきます。このツールの数値は、その傾向を踏まえた標準的な目安値です。",
  },
  {
    question: "同じ号数でもメーカーによって強さが違うのはなぜですか？",
    answer:
      "PEラインは複数の細い繊維を編み込んで作られており、使う原糸の質や本数(4本組・8本組など)、加工技術によって同じ太さでも強度が変わります。近年は高強度タイプも増えているため、正確な強力はパッケージの表記を確認するのが確実です。",
  },
  {
    question: "号数とlb、どちらを基準に選べばいいですか？",
    answer:
      "日本国内のタックルは号数表記が多く、海外製品や輸入ルアーの推奨ラインはlb表記が多い傾向があります。普段使っているタックルの表記に合わせて選び、迷ったときはこのツールで換算して確認すると安心です。",
  },
];

export default function PeLinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>PEライン換算</span>
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
              <th className="px-4 py-3 text-left font-medium">lb(目安)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sea-100">
            {PE_LINE_TABLE.map((row) => (
              <tr key={row.x}>
                <td className="px-4 py-3 font-medium text-sea-800">
                  {row.x}号
                </td>
                <td className="px-4 py-3 text-sea-700">{row.y}lb</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-sea-400">
        ※ 表示される数値は目安です。同じ号数でもメーカーやグレード(4本組・8本組など)によって実際の強力は変わります。購入前は必ずパッケージ記載の数値を確認してください。
      </p>

      <ProductRecommend title="PEラインを探す" keyword="PEライン" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          手持ちのPEラインの号数、または目安にしたいlb数を早見表から探すだけです。PEラインは0.3号・0.4号・0.5号…のように決まった号数でしか販売されていないため、途中の中間値を計算する必要はありません。
        </p>
      </section>

      <section aria-labelledby="explain-heading" className="mt-8">
        <h2 id="explain-heading" className="text-lg font-bold text-sea-900">
          PEラインの号数とlbについて
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          PEラインは複数の原糸を編み込んで作られる釣り糸で、同じ太さのナイロン・フロロカーボンラインよりも強度が高いのが特徴です。号数は太さの単位ですが、編み方やメーカーの技術によって強度が変わるため、号数だけで正確な強さは決まりません。特に3号を超えるような太い号数になると、メーカーやグレードによる強力表示のバラつきがより大きくなる傾向があります。このツールの換算値は、その傾向も踏まえた標準的な目安です。実際の釣行では、必ずライン本体やパッケージに記載された強力表示を確認してください。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="pe-line" />
    </div>
  );
}
