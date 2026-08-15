import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { PE_LINE_TABLE } from "@/lib/pe-line";

const TITLE = "PEライン号数⇔lb換算 早見表";
const DESCRIPTION =
  "PEラインの号数とlb(ポンド)の対応がひと目でわかる早見表です。0.3号から10号まで、よく使う号数を掲載しています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/pe-line" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "PEラインの号数とlbはどういう関係ですか？",
    answer:
      "号数はラインの太さ(糸の断面積)を表す単位、lbはラインが切れるまでの強さ(強力)を表す単位です。目安として「号数×20lb」という関係が0.3〜2.5号くらいまではよく使われますが、それより太い号数になると、号数が増えるほど強さの伸びが緩やかになり、号数×20よりも低めの数値になっていきます。このツールの数値は、その傾向を踏まえた標準的な目安値です。",
  },
  {
    question: "同じ号数でもメーカーによって強さが違うのはなぜですか？",
    answer:
      "PEラインは複数の細い繊維を編み込んで作られており、使う原糸の質や本数(4本組・8本組など)、加工技術によって同じ太さでも強度が変わります。近年は高強度タイプも増えているため、正確な強力はパッケージの表記を確認するのが確実です。",
  },
  {
    question: "号数とlb、どちらを基準に選べばいいですか？",
    answer:
      "日本国内のタックルは号数表記が多く、海外製品や輸入ルアーの推奨ラインはlb表記が多い傾向があります。普段使っているタックルの表記に合わせて選び、迷ったときはこのツールで換算して確認すると安心です。",
  },
];

export default function PeLinePage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="PEライン換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="pe-line"
      toolSlot={
        <>
          <SelectableTable
            category="PEライン"
            columns={["号数", "lb(目安)"]}
            rows={PE_LINE_TABLE.map((row) => ({
              key: String(row.x),
              cells: [`${row.x}号`, `${row.y}lb`],
              keyword: `PEライン ${row.x}号`,
            }))}
          />
          <p className="mt-3 text-xs leading-relaxed text-sea-400">
            ※ 表示される数値は目安です。同じ号数でもメーカーやグレード(4本組・8本組など)によって実際の強力は変わります。購入前は必ずパッケージ記載の数値を確認してください。
          </p>
        </>
      }
      affiliateSlot={
        <AffiliateBlock
          category="PEライン"
          keyword="PEライン"
          itemLabel="コスパ重視のPEライン"
          itemNote="扱いやすい定番PEラインです"
        />
      }
      howTo={
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          手持ちのPEラインの号数、または目安にしたいlb数を早見表から探すだけです。PEラインは0.3号・0.4号・0.5号…のように決まった号数でしか販売されていないため、途中の中間値を計算する必要はありません。表の行をタップすると、その号数の商品を探すリンクが表示されます。
        </p>
      }
      explanationHeading="PEラインの号数とlbについて"
      explanationBody={
        <p>
          PEラインは複数の原糸を編み込んで作られる釣り糸で、同じ太さのナイロン・フロロカーボンラインよりも強度が高いのが特徴です。号数は太さの単位ですが、編み方やメーカーの技術によって強度が変わるため、号数だけで正確な強さは決まりません。特に3号を超えるような太い号数になると、メーカーやグレードによる強力表示のバラつきがより大きくなる傾向があります。このツールの換算値は、その傾向も踏まえた標準的な目安です。実際の釣行では、必ずライン本体やパッケージに記載された強力表示を確認してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
      extraSlot={
        <section aria-labelledby="guide-heading" className="mt-8">
          <h2 id="guide-heading" className="text-lg font-bold text-sea-900">
            号数の目安ガイド
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            <li>
              <Link
                href="/guides/aomono-pe-line"
                className="block h-full rounded-xl border border-sea-100 bg-white p-4 transition-colors hover:border-sea-300 hover:bg-sea-50"
              >
                <p className="font-semibold text-sea-800">
                  青物用PEラインは何号？
                </p>
                <p className="mt-1 text-sm text-sea-500">
                  ショアジギングで青物を狙うときの号数の目安を紹介します。
                </p>
              </Link>
            </li>
          </ul>
        </section>
      }
    />
  );
}
