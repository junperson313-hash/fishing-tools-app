import type { Metadata } from "next";
import PeLineCalculator from "@/components/tools/PeLineCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";
import { PE_LINE_TABLE } from "@/lib/pe-line";

const TITLE = "PEライン号数⇔lb換算ツール";
const DESCRIPTION =
  "PEラインの号数とlb(ポンド)を相互に変換できる無料ツールです。0.5号や1.5号など、よく使う号数の早見表付き。";

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

      <div className="mt-6">
        <PeLineCalculator />
      </div>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>「号数」欄に、手持ちのPEラインの号数を入力します。</li>
          <li>自動的に「強力(lb)」欄に目安のlb数が表示されます。</li>
          <li>逆に、lbを入力すれば号数の目安を確認できます。</li>
        </ol>
      </section>

      <section aria-labelledby="table-heading" className="mt-8">
        <h2 id="table-heading" className="text-lg font-bold text-sea-900">
          PEライン号数⇔lb 早見表
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-sea-100">
          <table className="w-full min-w-[280px] text-sm">
            <thead className="bg-sea-50 text-sea-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium">号数</th>
                <th className="px-4 py-2 text-left font-medium">lb(目安)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sea-100">
              {PE_LINE_TABLE.map((row) => (
                <tr key={row.x}>
                  <td className="px-4 py-2 text-sea-800">{row.x}号</td>
                  <td className="px-4 py-2 text-sea-800">{row.y}lb</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
