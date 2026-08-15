import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import PeLineGuideSelector from "@/components/tools/PeLineGuideSelector";
import AffiliateBlock from "@/components/AffiliateBlock";

const TITLE = "対象魚別PEライン号数目安";
const DESCRIPTION =
  "シーバス・エギング・アジング・青物・タイラバなど、魚種や釣りジャンルを選ぶだけでPEラインとリーダーの号数目安がわかる無料ツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/pe-line-guide" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "表示される号数はどのくらい信頼できますか？",
    answer:
      "複数の釣具メーカー・釣り情報サイトで共通して紹介されている、一般的な目安の範囲をまとめたものです。ただし実際に適切な号数は、メーカー・製品・釣り場の状況・狙う魚のサイズによって変わるため、あくまで「最初の1つを選ぶときの目安」として利用してください。",
  },
  {
    question: "同じ号数でもPEラインとリーダーで意味が違うのですか？",
    answer:
      "はい。PEラインの号数は編み方やメーカーによって強度が変わりやすいのに対し、リーダー(フロロ・ナイロン)は太さがある程度規格化されています。詳しい換算は「PEライン号数⇔lb換算」「リーダー号数⇔lb換算」ツールもあわせてご覧ください。",
  },
  {
    question: "ジャンルによって号数の幅が広いのはなぜですか？",
    answer:
      "同じジャンルでも、堤防・サーフ・磯など釣り場の違いや、狙う魚のサイズによって適切な太さが変わるためです。迷った場合は、表示された範囲の中央〜やや細めの号数から始め、根がかりやライン切れが多いようであれば太くしていくのがおすすめです。",
  },
];

export default function PeLineGuidePage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="PEライン号数目安"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="pe-line-guide"
      toolSlot={<PeLineGuideSelector />}
      affiliateSlot={
        <AffiliateBlock
          category="PEライン"
          keyword="PEライン 8本組"
          itemLabel="定番のPEライン"
          itemNote="ジャンルを問わず使いやすい定番PEラインです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>狙いたい魚種・釣りジャンルをボタンから選びます。</li>
          <li>PEラインとリーダーの号数目安、初心者向けの説明が表示されます。</li>
          <li>迷ったら表示された範囲の中央付近の号数から試してみてください。</li>
        </ol>
      }
      notice="表示される号数はすべて一般的な目安です。メーカー・製品・釣り場・魚のサイズによって適切な号数は変わります。"
      explanationHeading="ジャンルによって号数が変わる理由"
      explanationBody={
        <p>
          PEラインの太さは、狙う魚の引きの強さ・想定されるサイズ・根や障害物の多さによって選び方が変わります。アジング・メバリングのような繊細な釣りでは0.2〜0.4号程度の極細ラインが使われる一方、オフショアジギングのような大型魚を狙う釣りでは1.5号を超える太いラインが基本になります。このツールは魚種・ジャンルごとに一般的に紹介されている号数の範囲をまとめたもので、実際の号数選びでは、釣り場の状況や自分のタックルバランスも踏まえて微調整してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
