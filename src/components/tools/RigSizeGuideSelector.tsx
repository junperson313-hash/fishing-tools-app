"use client";

import { useState } from "react";
import { RIG_SIZE_TABLE } from "@/lib/rig-size";
import { rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";
import ShareButton from "@/components/ShareButton";

const ROWS = [
  { field: "hook", label: "針" },
  { field: "harisu", label: "ハリス" },
  { field: "doito", label: "道糸" },
  { field: "sinker", label: "オモリ" },
] as const;

export default function RigSizeGuideSelector() {
  const [key, setKey] = useState(RIG_SIZE_TABLE[0].key);
  const row = RIG_SIZE_TABLE.find((r) => r.key === key) ?? RIG_SIZE_TABLE[0];

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <span className="text-sm font-medium text-sea-700">釣りジャンル</span>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {RIG_SIZE_TABLE.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setKey(r.key)}
            className={`rounded-lg border px-2 py-2 text-sm transition-colors ${
              key === r.key
                ? "border-sea-600 bg-sea-600 text-white"
                : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-sea-100">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-sea-100">
            {ROWS.map(({ field, label }) => (
              <tr key={field}>
                <th className="w-20 bg-sea-50 px-3 py-3 text-left font-medium text-sea-700">
                  {label}
                </th>
                <td className="px-3 py-3 text-sea-800">{row[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-sea-600">{row.note}</p>

      <div className="mt-4 flex justify-center">
        <ShareButton
          toolKey="rig-size-guide"
          title="仕掛け号数早見表"
          text={`${row.label}の仕掛けの号数目安をチェックしました`}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <AffiliateLink
          href={rakutenSearchLink(`${row.label} 仕掛け 初心者`)}
          category="仕掛け"
          keyword={`${row.label} 仕掛け 初心者`}
          className="rounded-full border border-sea-200 bg-white px-4 py-1.5 text-xs text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          楽天市場で{row.label}の仕掛けセットを探す →
        </AffiliateLink>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        表示している号数は一般的な目安です。釣り場・対象魚のサイズによって適切な号数は変わります。初心者は市販の完成仕掛けを使うのが安心です。
      </p>
    </div>
  );
}
