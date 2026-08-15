import type { Metadata } from "next";
import TripCostCalculator from "@/components/tools/TripCostCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";

const TITLE = "釣行費用計算ツール";
const DESCRIPTION =
  "ガソリン代・高速代・船代などを入力するだけで、釣行にかかる合計費用と1人あたりの割り勘額を計算する無料ツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/trip-cost" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "ガソリン代はどうやって計算していますか？",
    answer:
      "「走行距離÷燃費×ガソリン単価」というシンプルな式で概算しています。往復距離を入力すれば往復分の目安が、片道距離なら片道分の目安が計算されます。実際の燃費は道路状況や運転の仕方で変わるため、あくまで目安です。",
  },
  {
    question: "船代やレンタルタックル代も含められますか？",
    answer:
      "「船代・エサ代」「その他費用」の欄にまとめて入力できます。エサ代・氷代・レンタル代・駐車場代など、細かい費用はその他費用にまとめて入力すると簡単です。",
  },
  {
    question: "割り勘の計算方法を教えてください。",
    answer:
      "合計費用(ガソリン代+高速代+船代・エサ代+その他費用)を参加人数で均等に割った金額を表示しています。運転者の負担を軽くしたいなど、傾斜配分にしたい場合は合計費用を参考に手動で調整してください。",
  },
];

export default function TripCostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>釣行費用計算</span>
      </nav>

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        {DESCRIPTION}
      </p>

      <div className="mt-6">
        <TripCostCalculator />
      </div>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>走行距離・燃費・ガソリン単価を入力します(車で行かない場合は0でも構いません)。</li>
          <li>高速代・船代やエサ代・その他費用を入力します。</li>
          <li>参加人数を入力すると、合計費用と1人あたりの金額が自動で表示されます。</li>
        </ol>
      </section>

      <section aria-labelledby="explain-heading" className="mt-8">
        <h2 id="explain-heading" className="text-lg font-bold text-sea-900">
          釣行費用の考え方
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          釣行費用は、ガソリン代・高速代だけでなく、船代・エサ代・氷代・駐車場代など細かい出費が積み重なりがちです。事前にざっくりとした合計額を把握しておくと、当日の割り勘でもめにくくなります。この計算結果は入力した金額をもとにした単純な合計・割り勘であり、実際の請求額とは誤差が出ることがあります。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="trip-cost" />
    </div>
  );
}
