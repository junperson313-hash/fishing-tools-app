import { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Faq, { FaqItem } from "@/components/Faq";
import RelatedTools from "@/components/RelatedTools";
import ToolViewTracker from "@/components/tools/ToolViewTracker";

export type ToolPageLayoutProps = {
  breadcrumbLabel: string;
  title: string;
  description: string;
  /** 計算ツール・早見表本体 */
  toolSlot: ReactNode;
  /** 結果に応じた購入導線(AffiliateBlock等)。省略可 */
  affiliateSlot?: ReactNode;
  /** 使い方セクションの中身 */
  howTo: ReactNode;
  /** 強調表示する注意書き(タイラバの「ご注意」のような枠) */
  notice?: string;
  explanationHeading: string;
  explanationBody: ReactNode;
  faqItems: FaqItem[];
  /** RelatedTools/内部リンクで使う自分自身のキー */
  toolKey: string;
  /** 関連ツールの下に追加で表示する内容(ガイドページへのリンク等)。省略可 */
  extraSlot?: ReactNode;
  /**
   * 広告枠。AdSense等の審査が済むまでは渡さないでおけば何も表示されず、
   * レイアウトも変わらない(FAQと関連ツールの間に表示される)。
   */
  adSlot?: ReactNode;
};

/**
 * ツールページの共通レイアウト。新しいツールを追加するときは、
 * データ(号数表・FAQ文言等)を用意してこのコンポーネントを呼ぶだけでよい。
 * 構成: パンくず → H1 → 説明 → ツール本体 → 購入導線 → 使い方 →
 *       (注意書き) → 解説 → FAQ → 関連ツール
 */
export default function ToolPageLayout({
  breadcrumbLabel,
  title,
  description,
  toolSlot,
  affiliateSlot,
  howTo,
  notice,
  explanationHeading,
  explanationBody,
  faqItems,
  toolKey,
  extraSlot,
  adSlot,
}: ToolPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <ToolViewTracker toolKey={toolKey} />
      <Breadcrumb items={[{ label: breadcrumbLabel }]} />

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-sea-600">
        {description}
      </p>

      <div className="mt-6">{toolSlot}</div>

      {affiliateSlot}

      <section aria-labelledby="how-to-heading" className="mt-8">
        <h2 id="how-to-heading" className="text-lg font-bold text-sea-900">
          使い方
        </h2>
        {howTo}
      </section>

      {notice && (
        <section aria-labelledby="notice-heading" className="mt-8">
          <h2 id="notice-heading" className="text-lg font-bold text-sea-900">
            ご注意
          </h2>
          <p className="mt-2 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed text-sea-700">
            {notice}
          </p>
        </section>
      )}

      <section aria-labelledby="explain-heading" className="mt-8">
        <h2 id="explain-heading" className="text-lg font-bold text-sea-900">
          {explanationHeading}
        </h2>
        <div className="mt-2 text-sm leading-relaxed text-sea-600">
          {explanationBody}
        </div>
      </section>

      <Faq items={faqItems} />
      {adSlot && <div className="mt-8">{adSlot}</div>}
      <RelatedTools currentKey={toolKey} />
      {extraSlot}
    </div>
  );
}
