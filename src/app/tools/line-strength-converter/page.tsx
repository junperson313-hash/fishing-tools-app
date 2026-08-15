import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import LineStrengthConverter from "@/components/tools/LineStrengthConverter";
import AffiliateBlock from "@/components/AffiliateBlock";

const TITLE = "ライン強度 kg⇔lb⇔号数 換算ツール";
const DESCRIPTION =
  "PEライン・リーダーの号数、lb(ポンド)、kgのどれか1つを入力すると、残り2つの目安がすぐわかる無料の換算ツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/line-strength-converter" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "kgとlbはどちらを見ればいいですか？",
    answer:
      "国内の釣具は号数表記が中心ですが、海外製品や輸入タックルの推奨ラインはlb表記が多い傾向があります。kgは、lbやkg表記のスケール(はかり)と直接比べたいときに便利です。1lb=0.45359237kgという固定値で計算しているので、kg⇔lbの変換自体には誤差はありません。",
  },
  {
    question: "PEラインとリーダーで号数を切り替える必要があるのはなぜですか？",
    answer:
      "PEラインとリーダー(フロロ・ナイロン)では、同じ号数でも対応する強度(lb)が異なるためです。それぞれ専用の対応表を使って換算しているので、ラインの種類を切り替えてから号数・lb・kgを確認してください。",
  },
  {
    question: "この換算値はどのくらい正確ですか？",
    answer:
      "号数とlb・kgの対応は、複数のメーカー・情報源で共通して紹介されている標準的な目安値をもとにした近似値です。同じ号数でもメーカーや製品グレードによって実際の強度は変わるため、正確な数値はパッケージの表示を確認してください。",
  },
];

export default function LineStrengthConverterPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="ライン強度換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="line-strength-converter"
      toolSlot={<LineStrengthConverter />}
      affiliateSlot={
        <AffiliateBlock
          category="ライン"
          keyword="PEライン リーダー セット"
          itemLabel="おすすめのPEライン・リーダー"
          itemNote="強度表記がわかりやすい定番ラインです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>PEライン・リーダーのどちらかを選びます。</li>
          <li>号数・lb・kgのうち、基準にしたい項目を選びます。</li>
          <li>値を入力(号数は選択)すると、残り2つが自動で表示されます。</li>
        </ol>
      }
      explanationHeading="号数・lb・kgの関係について"
      explanationBody={
        <p>
          釣り糸の強さは、日本では「号数」、海外製品や一部のタックルでは「lb(ポンド)」で表記されます。kgは、lbから単純な単位換算(1lb=0.45359237kg)で求められる値です。号数とlbの対応はPEラインとリーダーで異なり、既存の「PEライン号数⇔lb換算」「リーダー号数⇔lb換算」ツールと同じ対応表をもとに計算しています。海外通販のタックルを購入するときや、外国製品のライン表記をkgでイメージしたいときに活用してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
