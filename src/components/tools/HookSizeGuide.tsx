"use client";

import { useState } from "react";
import {
  HOOK_SIZE_TABLES,
  HOOK_TYPES,
  HookTypeKey,
  buildHookKeyword,
} from "@/lib/hook-size";
import SelectableTable from "@/components/tools/SelectableTable";

export default function HookSizeGuide() {
  const [typeKey, setTypeKey] = useState<HookTypeKey>("sode");
  const type = HOOK_TYPES.find((t) => t.key === typeKey) ?? HOOK_TYPES[0];
  const rows = HOOK_SIZE_TABLES[typeKey];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-sm font-medium text-sea-700">針の種類</span>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {HOOK_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTypeKey(t.key)}
              className={`rounded-lg border px-2 py-2 text-sm transition-colors ${
                typeKey === t.key
                  ? "border-sea-600 bg-sea-600 text-white"
                  : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-sea-500">
          {type.description}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-bold text-sea-800">対象魚から号数を探す</h2>
        <div className="mt-2">
          <SelectableTable
            category="釣り針"
            columns={["対象魚", `目安号数(${type.label})`]}
            rows={rows.map((row) => ({
              key: `fish-${typeKey}-${row.key}`,
              cells: [row.fishLabel, row.goLabel],
              keyword: buildHookKeyword(row.fishLabel, type.label, row.goLabel),
            }))}
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-sea-800">号数から対象魚を探す</h2>
        <div className="mt-2">
          <SelectableTable
            category="釣り針"
            columns={[`号数(${type.label})`, "対象魚の目安"]}
            rows={rows.map((row) => ({
              key: `go-${typeKey}-${row.key}`,
              cells: [row.goLabel, row.fishLabel],
              keyword: buildHookKeyword(row.fishLabel, type.label, row.goLabel),
            }))}
          />
        </div>
      </div>

      <p className="text-xs leading-relaxed text-sea-400">
        ※
        針の号数・サイズ感はメーカーや製品によって異なります。本表は一般的な目安です。実際に購入する際は、メーカーの商品仕様もあわせて確認してください。
      </p>
    </div>
  );
}
