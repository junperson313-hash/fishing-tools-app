import type { Metadata } from "next";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import HookSizeGuide from "@/components/tools/HookSizeGuide";
import AffiliateBlock from "@/components/AffiliateBlock";

const TITLE = "フックサイズ⇔対象魚の目安表";
const DESCRIPTION =
  "袖針・チヌ針・丸セイゴ・伊勢尼など針の種類を選ぶと、号数と対象魚の対応がわかる早見表です。「対象魚から号数を探す」「号数から対象魚を探す」の両方向で確認できます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/hook-size-guide" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: "アジ針は何号ですか？",
    answer:
      "袖針であれば5〜6号が標準的なサイズとしてよく紹介されています。良型のアジを狙う場合は7〜8号、小アジ中心なら3〜4号など、狙うサイズに合わせて調整するのがおすすめです。",
  },
  {
    question: "ハゼ針は何号ですか？",
    answer:
      "小さいハゼは袖針の1〜4号あたりが目安として紹介されることが多いです。数釣りをしたい場合はやや小さめ、大きめのハゼを狙う場合は5〜6号程度まで上げると針掛かりしやすくなります。",
  },
  {
    question: "サバ針は何号ですか？",
    answer:
      "サバは引きが強く暴れやすいため、袖針であれば7〜8号程度のやや大きめのサイズが目安として紹介されることが多いです。数釣りのサビキ仕掛けでは、もう少し小さいサイズが使われることもあります。",
  },
  {
    question: "チヌ針は何号ですか？",
    answer:
      "食い渋っているときや小型のチヌには1〜2号、標準的なサイズなら3〜4号、活性が高いときや大型狙いには5号以上が目安として紹介されています。まずは2〜3号あたりから様子を見て調整するのが一般的です。",
  },
  {
    question: "根魚(カサゴ・ロックフィッシュ等)には何号がいいですか？",
    answer:
      "根魚は口が大きく、根に潜られると強い力がかかるため、袖針なら7号以上、丸セイゴやチヌ針など軸の太いタイプであればさらに大きめの号数が選ばれる傾向があります。狙う魚のサイズやポイントの荒さに合わせて調整してください。",
  },
  {
    question: "袖針とチヌ針の違いは何ですか？",
    answer:
      "袖針は軸が短めで扱いやすく、堤防釣り・サビキ・ウキ釣りなど幅広い釣りで使われる汎用タイプです。チヌ針は軸が長くフトコロ(針の内側の幅)が広めで、餌持ちや掛かりの良さを重視したチヌ(クロダイ)釣り向けの形状です。同じ号数でもサイズ感が異なるため、使い分ける際は注意してください。",
  },
  {
    question: "伊勢尼はどんな魚に使いますか？",
    answer:
      "伊勢尼は軸が太くフトコロが広いため強度が高く、マダイやコイなど大物とのやり取りを想定したぶっこみ釣りでよく使われます。号数はコイ狙いで10号前後、マダイ狙いで10〜13号程度が目安として紹介されています。",
  },
  {
    question: "丸セイゴはどんな釣りで使いますか？",
    answer:
      "丸セイゴはフトコロが狭く、口の小さい魚でも吸い込みやすい形状のため、スズキ狙いのほか、ぶっこみ釣り全般で汎用的に使われます。堤防釣りでは8〜9号あたりが標準的なサイズとして紹介されることが多いです。",
  },
];

export default function HookSizeGuidePage() {
  return (
    <ToolPageLayout
      breadcrumbLabel="フックサイズ目安"
      title={TITLE}
      description={DESCRIPTION}
      toolKey="hook-size-guide"
      toolSlot={<HookSizeGuide />}
      affiliateSlot={
        <AffiliateBlock
          category="釣り針"
          keyword="釣り針 セット"
          itemLabel="定番の釣り針セット"
          itemNote="号数がそろった初心者向けの釣り針セットです"
        />
      }
      howTo={
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-sea-600">
          <li>使う(または使いたい)針の種類を、袖針・チヌ針・丸セイゴ・伊勢尼から選びます。</li>
          <li>
            狙いたい魚が決まっている場合は「対象魚から号数を探す」表、手持ちの針の号数から対象魚を知りたい場合は「号数から対象魚を探す」表を使います。
          </li>
          <li>表の行をタップすると、対象魚・針の種類・号数に応じた検索リンクが表示されます。</li>
        </ol>
      }
      notice="針の号数・サイズ感はメーカーや製品によって異なります。本表は一般的な目安です。実際に購入する際は、メーカーの商品仕様もあわせて確認してください。"
      explanationHeading="釣り針の号数と種類について"
      explanationBody={
        <p>
          釣り針の号数は、数字が大きくなるほど針全体のサイズが大きくなることを表しますが、オモリの号数(1号=3.75g)のような統一規格はなく、針の種類(形状)ごとに基準が異なります。このページでは、初心者にも使いやすい袖針を基準に紹介しつつ、チヌ針・丸セイゴ・伊勢尼という代表的な種類も選べるようにしています。魚のサイズやメーカーによって適した号数は変わるため、迷った場合は、狙う魚と釣り方(仕掛けの種類)から選ぶのがおすすめです。仕掛けごとの針の種類は「仕掛け号数早見表」もあわせてご覧ください。
        </p>
      }
      faqItems={FAQ_ITEMS}
    />
  );
}
