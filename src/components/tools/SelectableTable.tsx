"use client";

import { useState } from "react";
import { rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";

export type SelectableRow = {
  key: string;
  cells: string[];
  /** この行の値にひもづく楽天検索キーワード (例: "PEライン 1.5号") */
  keyword: string;
};

/**
 * 号数⇔lb/g早見表のような複数列テーブルを、行タップで選択できるようにする
 * 汎用コンポーネント。選択した行の値にひもづく検索リンクを直下に表示する。
 * PEライン/リーダー/オモリ/シンカーで共通利用する。
 */
export default function SelectableTable({
  columns,
  rows,
  category,
}: {
  columns: string[];
  rows: SelectableRow[];
  category: string;
}) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = rows.find((r) => r.key === selectedKey) ?? null;

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-sea-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-sea-50 text-sea-700">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sea-100">
            {rows.map((row) => (
              <tr
                key={row.key}
                onClick={() =>
                  setSelectedKey((current) =>
                    current === row.key ? null : row.key
                  )
                }
                className={`cursor-pointer transition-colors ${
                  selectedKey === row.key ? "bg-accent/10" : "hover:bg-sea-50"
                }`}
              >
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={
                      i === 0
                        ? "px-4 py-3 font-medium text-sea-800"
                        : "px-4 py-3 text-sea-700"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <AffiliateLink
          href={rakutenSearchLink(selected.keyword)}
          category={category}
          keyword={selected.keyword}
          className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-sea-200 bg-accent/10 px-4 py-3 text-sm text-sea-800 transition-colors hover:border-sea-300"
        >
          <span>楽天市場で「{selected.keyword}」を探す</span>
          <span className="text-sea-400" aria-hidden>
            →
          </span>
        </AffiliateLink>
      )}

      <p className="mt-3 text-xs text-sea-400">
        表の行をタップすると、その号数の商品を探すリンクが表示されます。
      </p>
    </div>
  );
}
