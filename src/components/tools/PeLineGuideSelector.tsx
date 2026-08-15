"use client";

import { useState } from "react";
import { PE_LINE_GUIDE_TABLE } from "@/lib/pe-line-guide";
import { rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";
import ShareButton from "@/components/ShareButton";

export default function PeLineGuideSelector() {
  const [key, setKey] = useState(PE_LINE_GUIDE_TABLE[0].key);
  const row = PE_LINE_GUIDE_TABLE.find((r) => r.key === key) ?? PE_LINE_GUIDE_TABLE[0];

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <span className="text-sm font-medium text-sea-700">魚種・釣りジャンル</span>
      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {PE_LINE_GUIDE_TABLE.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setKey(r.key)}
            className={`rounded-lg border px-2 py-2 text-xs transition-colors ${
              key === r.key
                ? "border-sea-600 bg-sea-600 text-white"
                : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-sea-50 p-4">
        <p className="text-sm text-sea-600">{row.label}のPEライン号数の目安</p>
        <p className="mt-1 text-2xl font-bold text-sea-900">{row.peRange}</p>
        <p className="mt-3 text-sm text-sea-600">リーダーの目安</p>
        <p className="mt-1 text-lg font-bold text-sea-800">{row.leaderRange}</p>
      </div>

      <div className="mt-3 flex justify-center">
        <ShareButton
          toolKey="pe-line-guide"
          title="対象魚別PEライン号数目安"
          text={`${row.label}のPEラインは${row.peRange}が目安みたいです`}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <AffiliateLink
          href={rakutenSearchLink(`PEライン ${row.label}`)}
          category="PEライン"
          keyword={`PEライン ${row.label}`}
          className="rounded-full border border-sea-200 bg-white px-4 py-1.5 text-xs text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          楽天市場で{row.label}向けPEラインを探す →
        </AffiliateLink>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-sea-600">
        <p>{row.beginnerNote}</p>
        <p className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-sea-700">
          ※ {row.caution}
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        表示している号数はあくまで一般的な目安です。メーカー・製品・釣り場・狙う魚のサイズによって適切な号数は変わります。
      </p>
    </div>
  );
}
