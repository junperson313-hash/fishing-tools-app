import type { Metadata } from "next";
import TairabaCalculator from "@/components/tools/TairabaCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";

const TITLE = "タイラバ重量計算ツール";
const DESCRIPTION =
  "水深帯と潮の速さを選ぶだけで、タイラバ(鯛ラバ)のヘッド重量の目安が早見表でわかる無料ツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/tairaba" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "タイラバの重さはどうやって決めればいいですか？",
    answer:
      "「水深(m)×2≒重さ(g)」という単純な計算がよく紹介されますが、水深60m・80mと深くなるにつれて、実際にはこの計算式ほどには重さが増えません(例えば水深80〜100mでも、潮が緩ければ100g前後、速くても130〜150g程度が目安です)。このツールは、水深を5段階の帯(〜20m/20〜40m/40〜60m/60〜80m/80〜100m)に分け、それぞれ潮の速さ別の目安をまとめた早見表です。水深は1m単位で気にする必要はなく、だいたいの水深帯と潮の速さを選べば十分です。",
  },
  {
    question: "潮が速い・遅いはどう判断すればいいですか？",
    answer:
      "船長からのアナウンスがあればそれに従うのが一番確実です。目安がない場合は、ラインが真下からどれくくらい斜めに流されるかで判断されることが多く、ほぼ真下なら「遅い」、斜め45度以上流されるようなら「速い」と考えるとよいでしょう。迷う場合は「普通」を選んで、実際の当たり方や着底のしやすさで調整してください。",
  },
  {
    question: "同じ水深でも重さを変えたほうがいい場合はありますか？",
    answer:
      "はい。潮の速さ以外にも、船の流し方(ドテラ流しか垂直に近い流し方か)、風の強さ、他の乗船者とのオマツリ回避などの理由で重さを変えることがあります。この計算結果はあくまで出発点の目安として使い、実際の釣行では底が取れる範囲でできるだけ軽いウエイトを選ぶのが基本です。",
  },
];

export default function TairabaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>タイラバ重量計算</span>
      </nav>

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        {DESCRIPTION}
      </p>

      <div className="mt-6">
        <TairabaCalculator />
      </div>

      <AdSlot className="mt-6" />

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>ポイントの「水深帯」を、〜20m〜80〜100mの5段階から選びます。</li>
          <li>その日の「潮の速さ」を、遅い・普通・速いから選びます。</li>
          <li>重さの目安と、全パターンの早見表が表示されます。</li>
        </ol>
      </section>

      <section aria-labelledby="notice-heading" className="mt-8">
        <h2 id="notice-heading" className="text-lg font-bold text-sea-900">
          ご注意
        </h2>
        <p className="mt-2 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed text-sea-700">
          タイラバの重量に絶対的な正解はありません。この計算結果はあくまで目安であり、潮流・水深・船の流し方・地域や船宿の方針によって適切な重さは変わります。乗船前や釣行中は、船長や周りのアングラーの状況も参考にしてください。
        </p>
      </section>

      <section aria-labelledby="explain-heading" className="mt-8">
        <h2 id="explain-heading" className="text-lg font-bold text-sea-900">
          タイラバの重さ選びの考え方
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sea-600">
          タイラバは着底とその後の一定速度での巻き上げが重要な釣りです。軽すぎると仕掛けが流されて底が取りにくく、重すぎると不自然な動きになったり根がかりが増えたりします。このツールの早見表は、水深帯(〜20m/20〜40m/40〜60m/60〜80m/80〜100m)ごとに「遅い・普通・速い」の3パターンをまとめたものです。水深が深くなるほど、重さの増え方は緩やかになっていく点が特徴です。まずはこの目安から始め、着底までの時間やラインの角度を見ながら、その日の潮に合わせて軽く・重く調整していくのが基本的な考え方です。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="tairaba" />
    </div>
  );
}
