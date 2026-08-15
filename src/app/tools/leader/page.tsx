import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { LEADER_TABLE } from "@/lib/leader";

const TITLE = "リーダー号数⇔lb換算 早見表";
const DESCRIPTION =
  "フロロカーボン・ナイロンリーダーの号数とlb(ポンド)の対応がひと目でわかる早見表です。";

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
      "対象魚やPEラインの号数によって変わりますが、目安として「PEラインの号数の3〜5倍(標準は4倍程度)」の号数のリーダーを組み合わせることが多いです。例えばPE1号なら、リーダーは3〜5号あたりが目安になります。根ズレの多いポイントや大物狙いでは、さらに太いリーダーを使うこともあります。",
  },
];

export default function LeaderPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="リーダー換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="leader"
      toolSlot={
        <>
          <SelectableTable
            category="リーダー"
            columns={["号数", "lb(目安)"]}
            rows={LEADER_TABLE.map((row) => ({
              key: String(row.x),
              cells: [`${row.x}号`, `${row.y}lb`],
              keyword: `リーダー ${row.x}号`,
            }))}
          />
          <p className="mt-3 text-xs leading-relaxed text-sea-400">
            ※ 表示される数値は目安です。フロロカーボンとナイロンでも強度は異なり、メーカーによっても差があります。購入前は必ずパッケージ記載の数値を確認してください。
          </p>
        </>
      }
      affiliateSlot={
        <AffiliateBlock category="リーダー" keyword="リーダー フロロカーボン" />
      }
      howTo={
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          手持ちのリーダーの号数、または目安にしたいlb数を早見表から探すだけです。リーダーも0.8号・1号・1.2号…のように決まった号数でしか販売されていないため、途中の中間値を計算する必要はありません。表の行をタップすると、その号数の商品を探すリンクが表示されます。
        </p>
      }
      explanationHeading="リーダーの号数とlbについて"
      explanationBody={
        <p>
          リーダーはPEラインの先に結ぶ、根ズレや魚の歯から守るための糸で、フロロカーボンやナイロンが主に使われます。太さがJIS規格に近い基準で決まっているため、PEラインに比べると号数とlbの対応はメーカー間でそろいやすい傾向がありますが、それでも素材やグレードによって差はあります。正確な強力は、購入時にパッケージの表示を確認してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
