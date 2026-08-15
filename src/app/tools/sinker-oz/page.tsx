import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { OZ_TABLE } from "@/lib/sinker";

const TITLE = "シンカー oz⇔g⇔号 換算 早見表";
const DESCRIPTION =
  "海外製シンカー・ジグヘッドのoz(オンス)表記と、g(グラム)・号数の対応がひと目でわかる早見表です。1/32ozから10ozまで掲載しています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/sinker-oz" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "1ozは何gですか？",
    answer:
      "1oz(オンス)=約28.35gです。これはヤード・ポンド法の重さの単位で、1ポンド(453.59237g)の16分の1と国際的に定義されている固定値のため、メーカーによるブレはありません。",
  },
  {
    question: "ozと号数はどちらで探せばいいですか？",
    answer:
      "海外メーカーのシンカーやジグヘッド、バス釣り用のワームシンカーはoz表記が主流です。一方、国内の船釣り用オモリは号数表記が主流です。パッケージや仕掛け図に書かれている単位に合わせて、このツールで換算しながら探すとスムーズです。",
  },
  {
    question: "なぜ1/8ozや3/16ozのような分数表記が多いのですか？",
    answer:
      "アメリカのルアー・シンカー市場で古くから使われてきた慣習的な刻み方で、1/8oz(約3.5g)刻みやその中間の1/16oz刻みで展開されている商品が多いためです。日本の号数のような整数の刻みとは考え方が異なります。",
  },
];

export default function SinkerOzPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="シンカーoz換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="sinker-oz"
      toolSlot={
        <>
          <SelectableTable
            category="シンカー"
            columns={["oz", "g", "号(参考)"]}
            rows={OZ_TABLE.map((row) => ({
              key: row.ozLabel,
              cells: [row.ozLabel, `${row.gram}g`, `${row.go}号`],
              keyword: `シンカー ${row.ozLabel}`,
            }))}
          />
          <p className="mt-3 text-xs leading-relaxed text-sea-400">
            ※
            gは1oz=28.35gで計算した値、号は日本のオモリ号数(1号=3.75g)に換算した参考値です。実際の号数展開の製品とは重さが完全には一致しない場合があります。
          </p>
        </>
      }
      affiliateSlot={
        <AffiliateBlock
          category="シンカー・ジグヘッド"
          keyword="シンカー oz"
          itemLabel="おすすめシンカー・ジグヘッド"
          itemNote="海外製ルアーにも使えるシンカーです"
        />
      }
      howTo={
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          手持ちのシンカーやジグヘッドのoz表記、またはg・号数を早見表から探すだけです。表の行をタップすると、そのozの商品を探すリンクが表示されます。
        </p>
      }
      explanationHeading="ozとg・号数の関係について"
      explanationBody={
        <p>
          oz(オンス)はヤード・ポンド法の重さの単位で、1oz=28.349523125gと国際的に定義されている固定値です。日本のオモリの号数(1号=3.75g)とは由来がまったく異なる単位ですが、どちらも「重さ」を表しているため、gを介して正確に換算できます。海外製のルアー・シンカーを使うときや、oz表記のジグヘッドを号数のイメージに置き換えたいときに活用してください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
