import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { HOOK_SIZE_TABLE } from "@/lib/hook-size";

const TITLE = "フックサイズ⇔対象魚の目安表";
const DESCRIPTION =
  "釣り針(袖針)の号数と対象魚の対応がわかる早見表です。「対象魚から号数を探す」「号数から対象魚を探す」の両方向で確認できます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/hook-size-guide" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "なぜ「袖針」を基準にしているのですか？",
    answer:
      "釣り針にはチヌ針・丸セイゴ針・伊勢尼針など多くの種類があり、種類によって同じ号数でもサイズが異なります。袖針は堤防釣り・サビキ・ウキ釣りなどで最も広く使われる汎用タイプのため、初心者が最初に基準にしやすい針として採用しています。",
  },
  {
    question: "チヌ針や丸セイゴ針でも同じ号数で考えていいですか？",
    answer:
      "いいえ、針の種類が違うと号数の基準も変わるため、そのまま当てはめることはできません。例えば「仕掛け号数早見表」のぶっこみ釣りでは丸セイゴ針を基準にしており、袖針とは同じ号数でもサイズが異なります。パッケージに記載された針の種類を確認してから号数を選んでください。",
  },
  {
    question: "何号を選べばいいか迷ったときはどうすればいいですか？",
    answer:
      "迷ったときは、堤防釣りの標準サイズである5〜6号から始めるのがおすすめです。エサの食い込みが悪い場合は針を小さく、針掛かりが浅い・バラシが多い場合は針を大きくするなど、釣況を見ながら調整すると失敗しにくくなります。",
  },
];

export default function HookSizeGuidePage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="フックサイズ目安"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="hook-size-guide"
      toolSlot={
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-sea-800">対象魚から号数を探す</h2>
            <div className="mt-2">
              <SelectableTable
                category="釣り針"
                columns={["対象魚", "目安号数(袖針)"]}
                rows={HOOK_SIZE_TABLE.map((row) => ({
                  key: `fish-${row.key}`,
                  cells: [row.fishLabel, row.goLabel],
                  keyword: row.keyword,
                }))}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-sea-800">号数から対象魚を探す</h2>
            <div className="mt-2">
              <SelectableTable
                category="釣り針"
                columns={["号数(袖針)", "対象魚の目安"]}
                rows={HOOK_SIZE_TABLE.map((row) => ({
                  key: `go-${row.key}`,
                  cells: [row.goLabel, row.fishLabel],
                  keyword: row.keyword,
                }))}
              />
            </div>
          </div>

          <p className="text-xs leading-relaxed text-sea-400">
            ※
            号数は針の種類(袖・チヌ・丸セイゴ等)によって基準が異なります。ここでは堤防釣りで最も汎用的な「袖針」を基準にした一般的な目安です。対象魚のサイズやエサの大きさによっても適切な号数は変わります。
          </p>
        </div>
      }
      affiliateSlot={
        <AffiliateBlock
          category="釣り針"
          keyword="袖針 セット"
          itemLabel="定番の袖針セット"
          itemNote="号数がそろった初心者向けの釣り針セットです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>
            狙いたい魚が決まっている場合は「対象魚から号数を探す」表から探します。
          </li>
          <li>
            手持ちの針の号数から対象魚を知りたい場合は「号数から対象魚を探す」表を使います。
          </li>
          <li>表の行をタップすると、その号数の釣り針を探すリンクが表示されます。</li>
        </ol>
      }
      explanationHeading="釣り針の号数について"
      explanationBody={
        <p>
          釣り針の号数は、数字が大きくなるほど針全体のサイズが大きくなることを表しますが、オモリの号数(1号=3.75g)のような統一規格はなく、針の種類(形状)ごとに基準が異なります。同じ「6号」でも、袖針とチヌ針ではサイズが違うため注意が必要です。このツールは、堤防釣り・サビキ・ウキ釣りなどで最も広く使われる「袖針」を基準に、対象魚の口の大きさに応じた一般的な号数の目安をまとめています。仕掛けごとの針の種類は「仕掛け号数早見表」もあわせてご覧ください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
