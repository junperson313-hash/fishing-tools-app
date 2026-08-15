import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import RigSizeGuideSelector from "@/components/tools/RigSizeGuideSelector";
import AffiliateBlock from "@/components/AffiliateBlock";

const TITLE = "仕掛け号数早見表";
const DESCRIPTION =
  "サビキ・ちょい投げ・ぶっこみ・ウキ釣りなど、釣りジャンルを選ぶだけで針・ハリス・道糸・オモリの号数目安がわかる初心者向けツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/rig-size-guide" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "初心者はこの号数の通りに仕掛けを自作すればいいですか？",
    answer:
      "自作も可能ですが、初心者のうちは市販の完成仕掛け(サビキ仕掛け・投げ釣り仕掛け・ウキ釣りセット等)を使うのが簡単で失敗も少ないです。このツールの号数は、市販仕掛けを選ぶときの「だいたいの目安」として、パッケージの表記と照らし合わせて使うのがおすすめです。",
  },
  {
    question: "オモリの号数は何を基準に選べばいいですか？",
    answer:
      "投げる距離・潮の速さ・使う竿の硬さによって適切な重さが変わります。表の範囲内であれば、まずは軽めの号数から試し、飛距離が足りない・仕掛けが流されるという場合に重くしていくと失敗しにくいです。オモリの号数とグラムの対応は「オモリ号数⇔g換算 早見表」もあわせてご覧ください。",
  },
  {
    question: "対象魚によって針のサイズを変えたほうがいいですか？",
    answer:
      "はい。表の号数は各ジャンルで広く使われる標準的なサイズですが、小さい魚を狙う場合は針を小さく、大きい魚や特定のターゲット(カレイ・アナゴ等)を狙う場合は針を大きくするなど、対象魚に合わせて調整すると釣果が上がりやすくなります。",
  },
];

export default function RigSizeGuidePage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="仕掛け号数早見表"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="rig-size-guide"
      toolSlot={<RigSizeGuideSelector />}
      affiliateSlot={
        <AffiliateBlock
          category="仕掛けセット"
          keyword="釣り 仕掛けセット 初心者"
          itemLabel="初心者向け仕掛けセット"
          itemNote="ジャンル別の定番の完成仕掛けです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>やりたい釣りのジャンル(サビキ・ちょい投げ・ぶっこみ・ウキ釣り)を選びます。</li>
          <li>針・ハリス・道糸・オモリの号数目安が表示されます。</li>
          <li>表示された号数を目安に、市販の仕掛けやパーツを選びます。</li>
        </ol>
      }
      notice="表示している号数はすべて一般的な目安です。釣り場・対象魚のサイズ・使用する竿やリールによって適切な号数は変わります。"
      explanationHeading="仕掛けの号数について"
      explanationBody={
        <p>
          釣りの仕掛けには、針・ハリス(針に近い部分の糸)・道糸(リールに巻く糸)・オモリなど、複数のパーツがあり、それぞれに号数があります。号数の意味はパーツによって異なり(針は大きさ、糸は太さ、オモリは重さ)、ジャンルや対象魚によって組み合わせの基本パターンが決まっています。このツールは、サビキ・ちょい投げ・ぶっこみ・ウキ釣りという初心者に人気の4ジャンルについて、一般的に紹介されている号数の組み合わせをまとめたものです。まずは市販の完成仕掛けから始め、慣れてきたらパーツを号数で選んでカスタマイズしていくのがおすすめです。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
