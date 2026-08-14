import type { Metadata } from "next";
import TairabaCalculator from "@/components/tools/TairabaCalculator";
import Faq from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import AdSlot from "@/components/AdSlot";

const TITLE = "タイラバ重量計算ツール";
const DESCRIPTION =
  "水深と潮の速さを入力するだけで、タイラバ(鯛ラバ)のヘッド重量の目安を計算する無料ツールです。";

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
      "基本は「水深と同じくらいのスピードでタイラバが着底する重さ」を選びます。目安として、水深が深いほど、また潮の流れが速いほど重いヘッドが必要になります。このツールはその目安を素早く確認するためのものです。実際には船が流れる速さや使用するタックルによっても変わるため、船長のアドバイスも参考にしてください。",
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
          <li>ポイントの「水深」をメートル単位で入力します。</li>
          <li>その日の「潮の速さ」を、遅い・普通・速いから選びます。</li>
          <li>推奨重量と範囲の目安が自動で表示されます。</li>
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
          タイラバは着底とその後の一定速度での巻き上げが重要な釣りです。軽すぎると仕掛けが流されて底が取りにくく、重すぎると不自然な動きになったり根がかりが増えたりします。まずは水深に対する標準的な重さから始め、着底までの時間やラインの角度を見ながら、その日の潮に合わせて軽く・重く調整していくのが基本的な考え方です。
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedTools currentKey="tairaba" />
    </div>
  );
}
