import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import GearGuideWizard from "@/components/tools/GearGuideWizard";
import { PURPOSE_OPTIONS, PurposeKey } from "@/lib/gear-guide";

const TITLE = "初心者向け 釣り道具診断";
const DESCRIPTION =
  "釣りたい魚・釣り方や経験、予算、すでに持っている道具を選ぶだけで、次に揃えるとよい釣り道具の目安がわかる無料の診断ツールです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/fishing-gear-guide" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "この診断はAIが提案しているのですか？",
    answer:
      "いいえ、現在は選択式の質問への回答から、あらかじめ用意した道具リストを組み合わせて表示する仕組みです。将来的には自由な文章での相談にも対応できるよう、拡張しやすい構造で作っています。",
  },
  {
    question: "表示された道具は必ず買わないといけませんか？",
    answer:
      "いいえ、あくまで一般的な目安です。すでに似た道具を持っている場合や、予算が限られている場合は、優先度の高いものから少しずつ揃えていく形で問題ありません。「すでに持っているもの」で選んだ道具は結果から除外されます。",
  },
  {
    question: "号数や重さの目安はどこまで信頼できますか？",
    answer:
      "PEライン・リーダーの号数目安は「対象魚別PEライン号数目安」、仕掛けの号数目安は「仕掛け号数早見表」と同じデータを使っています。いずれもメーカー・釣り場・魚のサイズによって変わる一般的な目安である点は変わりません。",
  },
];

type SearchParams = Promise<{ purpose?: string }>;

export default async function FishingGearGuidePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const initialPurpose = PURPOSE_OPTIONS.some((p) => p.key === params.purpose)
    ? (params.purpose as PurposeKey)
    : undefined;

  return (
    <ToolPageLayout
      breadcrumbLabel="釣り道具診断"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="fishing-gear-guide"
      toolSlot={<GearGuideWizard initialPurpose={initialPurpose} />}
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>やりたい釣り、経験、予算、すでに持っている道具を順番に選びます。</li>
          <li>あなたに必要な道具のリストと、それぞれ「なぜ必要か」が表示されます。</li>
          <li>気になる道具は、Amazon・楽天のリンクから探せます。</li>
        </ol>
      }
      notice="道具選びに絶対的な正解はありません。表示される内容は一般的な目安であり、釣り場や好みによって最適な道具は変わります。"
      explanationHeading="この診断について"
      explanationBody={
        <p>
          釣りを始めるとき、多くの初心者が「何を買えばいいか分からない」という壁にぶつかります。この診断は、やりたい釣り・経験・予算・すでに持っている道具をもとに、最初に揃えるとよい道具の目安をまとめて提示するツールです。PEラインやリーダーの号数は、サイト内の「対象魚別PEライン号数目安」「仕掛け号数早見表」と同じデータを使っており、道具をひととおり揃えたあとは、各ツールでより詳しい号数や重さの目安を確認できます。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
