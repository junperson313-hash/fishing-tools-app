import type { Metadata } from "next";
import LeaderCalculator from "@/components/tools/LeaderCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";
import { LEADER_TABLE } from "@/lib/leader";

const TITLE = "リーダー号数⇔lb換算ツール";
const DESCRIPTION =
  "フロロカーボン・ナイロンリーダーの号数とlb(ポンド)を相互に変換できる無料ツールです。早見表付き。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/leader" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "リーダーの号数はPEラインの号数と同じ意味ですか？",
    answer:
      "「号」という単位自体は共通ですが、対応するlbの値は異なります。リーダー(フロロ・ナイロン)は太さ(直径)がある程度規格化されているのに対し、PEラインは編み方によって強度が変わるため、同じ号数でも強力が違います。PEラインの換算はPEライン専用のツールをご利用ください。",
  },
  {
    question: "フロロカーボンとナイロンで換算値は変わりますか？",
    answer:
      "多少変わります。一般的にフロロカーボンはナイロンより硬く、比重も重い素材ですが、同じ号数であれば強力(lb)の目安は近い値になることが多いです。このツールは両素材で共通して使われることが多い標準的な目安値を採用しています。",
  },
  {
    question: "リーダーの太さは何号くらいが標準ですか？",
    answer:
      "対象魚やPEラインの号数によって大きく変わります。一般的にはPEラインの号数の2〜4倍程度の号数のリーダーを組み合わせることが多いですが、根ズレの多いポイントや大物狙いではさらに太いリーダーを使うこともあります。",
  },
];

export default function LeaderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>リーダー換算</span>
      </nav>

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        {DESCRIPTION}
      </p>

      <div className="mt-6">
        <LeaderCalculator />
      </div>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>「号数」欄に、手持ちのリーダーの号数を入力します。</li>
          <li>自動的に「強力(lb)」欄に目安のlb数が表示されます。</li>
          <li>逆に、lbを入力すれば号数の目安を確認できます。</li>
        </ol>
      </section>

      <section aria-labelledby="table-heading" className="mt-8">
        <h2 id="table-heading" className="text-lg font-bold text-sea-900">
          リーダー号数⇔lb 早見表
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
              {LEADER_TABLE.map((row) => (
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
          リーダーの号数とlbについて
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          リーダーはPEラインの先に結ぶ、根ズレや魚の歯から守るための糸で、フロロカーボンやナイロンが主に使われます。太さがJIS規格に近い基準で決まっているため、PEラインに比べると号数とlbの対応はメーカー間でそろいやすい傾向がありますが、それでも素材やグレードによって差はあります。正確な強力は、購入時にパッケージの表示を確認してください。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="leader" />
    </div>
  );
}
