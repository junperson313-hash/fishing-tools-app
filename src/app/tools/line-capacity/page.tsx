import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import LineCapacityCalculator from "@/components/tools/LineCapacityCalculator";
import AffiliateBlock from "@/components/AffiliateBlock";

const TITLE = "PEライン巻き量計算ツール";
const DESCRIPTION =
  "「PE1号を300m巻けるリールに、PE1.5号なら何m巻けるか」を計算できる無料ツールです。号数を変えたときの糸巻き量の目安がすぐわかります。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/line-capacity" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "なぜ号数を変えると巻き量が変わるのですか？",
    answer:
      "PEラインの太さ(直径)は、号数の平方根にほぼ比例する(=号数は太さの2乗にほぼ比例する)という業界標準の規格があります。スプールに巻けるラインの体積はほぼ一定なので、ラインが太くなるほど巻ける長さは短くなり、細くなるほど長く巻けます。このツールはその関係を使って、号数を変えたときの巻き量を計算しています。",
  },
  {
    question: "計算結果はどのくらい正確ですか？",
    answer:
      "号数と太さの関係は日本釣用品工業会の標準規格に基づいた近似計算のため、同じ規格に沿ったPEライン同士であれば実用上十分な目安になります。ただし、メーカーによる太さのわずかな差や、コーティングの有無、リールのスプール形状によって実際の巻き量は前後します。あくまで目安として、余裕を持ったライン量を購入することをおすすめします。",
  },
  {
    question: "ナイロンラインやフロロカーボンラインでも使えますか？",
    answer:
      "この計算式はPEラインの号数と直径の規格に基づいているため、ナイロンやフロロカーボンには正確には対応していません。号数と太さの対応関係が異なるため、参考程度にとどめてください。",
  },
];

export default function LineCapacityPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="PEライン巻き量計算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="line-capacity"
      toolSlot={<LineCapacityCalculator />}
      affiliateSlot={
        <AffiliateBlock
          category="PEライン"
          keyword="PEライン 巻き替え"
          itemLabel="おすすめPEライン"
          itemNote="巻き替えにおすすめの定番PEラインです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>
            今使っている(または基準にしたい)ラインの号数と、そのラインでの巻き量(m)を入力します。
          </li>
          <li>巻き替えたいライン号数を選びます。</li>
          <li>その号数にしたときの推定巻き量が表示されます。</li>
        </ol>
      }
      notice="メーカーやライン種類によって実際の巻き量は異なります。目安として利用してください。"
      explanationHeading="PEラインの巻き量計算の考え方"
      explanationBody={
        <p>
          リールのスプールに巻けるラインの長さは、ラインの太さ(直径)によって決まります。PEラインの号数は、太さの2乗(断面積)にほぼ比例するように規格化されているため、「巻き量は号数にほぼ反比例する」という近似計算が成り立ちます。例えばPE1号で300m巻けるリールなら、PE1.5号では300×(1÷1.5)≒200m、PE0.8号では300×(1÷0.8)≒375mが目安になります。リールを買い替えたときや、太さの違うラインに巻き替えたいときに活用してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
