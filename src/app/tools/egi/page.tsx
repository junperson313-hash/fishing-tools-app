import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { EGI_TABLE } from "@/lib/egi";

const TITLE = "エギ号数⇔重量 早見表";
const DESCRIPTION =
  "エギングで使うエギの号数と重さ(g)の目安がわかる早見表です。号数と重さの対応にはメーカー差があるため、レンジ(幅)で掲載しています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/egi" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "エギの号数と重さはなぜ幅があるのですか？",
    answer:
      "オモリの号数(1号=3.75g)のような統一規格が無く、メーカーやシリーズごとに独自に重さを設定しているためです。例えば3.5号でも、製品によって18.5g〜21g程度の差があります。号数はあくまで「サイズの目安」として捉え、正確な重さはパッケージの表示を確認してください。",
  },
  {
    question: "エギの号数はどうやって選べばいいですか？",
    answer:
      "一般的には秋の小型〜中型イカ狙いなら2.5〜3号、春の大型イカ狙いなら3.5〜4号が目安とされています。潮の速さや水深によって、同じ時期でも号数を上下させることがあります。",
  },
  {
    question: "重さが同じならどの号数でも同じように使えますか？",
    answer:
      "重さが近くても、号数(サイズ)が違うとシルエットやフォールスピードが変わるため、釣果に影響することがあります。重さだけでなく、対象とするイカのサイズや活性に合わせてサイズも選ぶのがおすすめです。",
  },
];

export default function EgiPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="エギ号数換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="egi"
      toolSlot={
        <>
          <SelectableTable
            category="エギ"
            columns={["号数", "重さの目安"]}
            rows={EGI_TABLE.map((row) => ({
              key: row.go,
              cells: [row.go, row.range],
              keyword: row.keyword,
            }))}
          />
          <p className="mt-3 text-xs leading-relaxed text-sea-400">
            ※
            エギは号数と重さの対応にJIS規格のような統一基準がなく、メーカー・製品によって重さが異なります。上記はダイワ・シマノ・ヤマシタ等の実製品を参考にした目安のレンジです。購入前は必ずパッケージ記載の重さを確認してください。
          </p>
        </>
      }
      affiliateSlot={
        <AffiliateBlock
          category="エギ"
          keyword="エギ"
          itemLabel="おすすめエギ"
          itemNote="定番シリーズのエギです"
        />
      }
      howTo={
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          使いたいエギの号数、または目安にしたい重さを早見表から探すだけです。表の行をタップすると、その号数の商品を探すリンクが表示されます。
        </p>
      }
      explanationHeading="エギの号数と重さについて"
      explanationBody={
        <p>
          エギの号数はサイズ(全長)の目安を表す単位で、1号ごとに約1寸(約3cm)長くなる、という考え方が基本になっています。ただし重さについてはメーカーが独自に設計しているため、同じ号数でも製品によって重さがまとまらないのが実情です。号数は「シルエットの大きさ」の目安、重さは「沈下速度・飛距離」の目安として、別々に確認するのが確実です。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
