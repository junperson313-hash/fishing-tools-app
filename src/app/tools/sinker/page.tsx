import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import SelectableTable from "@/components/tools/SelectableTable";
import AffiliateBlock from "@/components/AffiliateBlock";
import { GRAMS_PER_GO, SINKER_TABLE } from "@/lib/sinker";

const TITLE = "オモリ号数⇔g換算 早見表";
const DESCRIPTION =
  "オモリ(鉛)の号数とグラム(g)の対応がひと目でわかる早見表です。1号=3.75gの基準で正確に計算しています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/sinker" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "オモリの号数はなぜ1号=3.75gなのですか？",
    answer:
      "オモリの号数は、日本で昔から使われてきた重さの単位「匁(もんめ)」がもとになっています。1匁=3.75gと定められており、鉛オモリの世界では1号=1匁として扱われてきたため、1号=3.75gという換算が業界標準として広く使われています。",
  },
  {
    question: "PEラインやリーダーの号数と同じ考え方ですか？",
    answer:
      "単位の名前は同じ「号」ですが、意味はまったく異なります。ラインの号数は太さを表す単位で、メーカーによって強度に差が出ますが、オモリの号数は重さそのものを表す単位で、3.75gという固定値をかけるだけで正確に求められます。",
  },
  {
    question: "号数とgのどちらで選べばいいですか？",
    answer:
      "国内の船釣り・堤防釣りでは号数表記のオモリが主流ですが、ルアーのシンカーやジグヘッドはg表記が多い傾向があります。仕掛けの指定に合わせて、このツールで換算しながら選ぶとスムーズです。",
  },
];

export default function SinkerPage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="オモリ号数換算"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="sinker"
      toolSlot={
        <>
          <SelectableTable
            category="オモリ"
            columns={["号数", "g"]}
            rows={SINKER_TABLE.map((row) => ({
              key: String(row.go),
              cells: [`${row.go}号`, `${row.gram}g`],
              keyword: `オモリ ${row.go}号`,
            }))}
          />
          <p className="mt-3 text-xs leading-relaxed text-sea-400">
            ※ 1号=3.75g(匁)という業界共通の基準で計算しています。ごく一部の特殊な製品では表記が異なる場合があるため、購入前にパッケージも確認してください。
          </p>
        </>
      }
      affiliateSlot={
        <AffiliateBlock
          category="オモリ"
          keyword="中通しオモリ"
          itemLabel="船釣り用おすすめオモリ"
          itemNote="中通しタイプの定番オモリです"
        />
      }
      howTo={
        <p className="mt-3 text-sm leading-relaxed text-sea-600">
          使いたいオモリの号数、または目安にしたいグラム数を早見表から探すだけです。表の行をタップすると、その号数の商品を探すリンクが表示されます。
        </p>
      }
      explanationHeading="オモリの号数について"
      explanationBody={
        <p>
          オモリの号数は「1号={GRAMS_PER_GO}g」という固定の基準で決まっており、ラインの号数のようにメーカーによるブレはほとんどありません。仕掛け図やタックル指定で号数とg表記が混在していても、この換算式を使えば正確に対応関係を求められます。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
