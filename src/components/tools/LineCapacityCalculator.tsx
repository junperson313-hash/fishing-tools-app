"use client";

import { useState } from "react";
import { PE_LINE_TABLE } from "@/lib/pe-line";
import { estimateLineCapacity } from "@/lib/line-capacity";
import { rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";

const GO_OPTIONS = PE_LINE_TABLE.map((row) => row.x);

export default function LineCapacityCalculator() {
  const [baseGo, setBaseGo] = useState(1);
  const [baseMeters, setBaseMeters] = useState(300);
  const [targetGo, setTargetGo] = useState(1.5);

  const estimated = estimateLineCapacity(baseGo, baseMeters, targetGo);

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="base-go"
            className="text-sm font-medium text-sea-700"
          >
            基準にするライン号数
          </label>
          <select
            id="base-go"
            value={baseGo}
            onChange={(e) => setBaseGo(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
          >
            {GO_OPTIONS.map((go) => (
              <option key={go} value={go}>
                {go}号
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="base-meters"
            className="text-sm font-medium text-sea-700"
          >
            そのラインの巻き量(m)
          </label>
          <input
            id="base-meters"
            type="number"
            inputMode="numeric"
            min={1}
            value={baseMeters}
            onChange={(e) => setBaseMeters(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
          />
          <p className="mt-1 text-xs text-sea-400">
            リールのスペック表や、現在巻いているラインの表記(例: 300m)を入力してください。
          </p>
        </div>

        <div>
          <label
            htmlFor="target-go"
            className="text-sm font-medium text-sea-700"
          >
            巻き替えたいライン号数
          </label>
          <select
            id="target-go"
            value={targetGo}
            onChange={(e) => setTargetGo(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
          >
            {GO_OPTIONS.map((go) => (
              <option key={go} value={go}>
                {go}号
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-sea-50 p-4 text-center">
        <p className="text-sm text-sea-600">
          PE{targetGo}号にしたときの推定巻き量
        </p>
        <p className="mt-1 text-3xl font-bold text-sea-900">
          約{estimated}m
        </p>
      </div>

      <div className="mt-3 flex justify-center">
        <AffiliateLink
          href={rakutenSearchLink(`PEライン ${targetGo}号`)}
          category="PEライン"
          keyword={`PEライン ${targetGo}号`}
          className="rounded-full border border-sea-200 bg-white px-4 py-1.5 text-xs text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          楽天市場でPE{targetGo}号を探す →
        </AffiliateLink>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        この結果はPEラインの太さ(直径)が号数の平方根にほぼ比例するという業界標準の規格に基づく近似計算です。メーカーやライン種類(PE・ナイロン・フロロ)によって実際の直径・巻き量は異なります。目安として利用してください。
      </p>
    </div>
  );
}
