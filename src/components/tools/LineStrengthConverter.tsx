"use client";

import { useMemo, useState } from "react";
import { PE_LINE_TABLE } from "@/lib/pe-line";
import { LEADER_TABLE } from "@/lib/leader";
import { interpolateTable, roundTo } from "@/lib/convert";
import { kgToLb, lbToKg } from "@/lib/line-strength";
import { rakutenSearchLink } from "@/lib/affiliate";
import AffiliateLink from "@/components/AffiliateLink";
import ShareButton from "@/components/ShareButton";

type LineType = "pe" | "leader";
type Basis = "go" | "lb" | "kg";

const LINE_TYPE_LABEL: Record<LineType, string> = {
  pe: "PEライン",
  leader: "リーダー(フロロ・ナイロン)",
};

const BASIS_LABEL: Record<Basis, string> = {
  go: "号数を基準にする",
  lb: "lbを基準にする",
  kg: "kgを基準にする",
};

const MAX_LB = 500;
const MAX_KG = 250;

function clamp(value: number, max: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), max);
}

export default function LineStrengthConverter() {
  const [lineType, setLineType] = useState<LineType>("pe");
  const [basis, setBasis] = useState<Basis>("go");
  const [goValue, setGoValue] = useState(1);
  const [lbValue, setLbValue] = useState(20);
  const [kgValue, setKgValue] = useState(9);

  const table = lineType === "pe" ? PE_LINE_TABLE : LEADER_TABLE;
  const goOptions = useMemo(() => table.map((row) => row.x), [table]);

  let go: number;
  let lb: number;
  let kg: number;

  if (basis === "go") {
    go = goValue;
    lb = roundTo(interpolateTable(table, go, "xToY"), 1);
    kg = roundTo(lbToKg(lb), 2);
  } else if (basis === "lb") {
    lb = lbValue;
    go = roundTo(interpolateTable(table, lb, "yToX"), 2);
    kg = roundTo(lbToKg(lb), 2);
  } else {
    kg = kgValue;
    lb = roundTo(kgToLb(kg), 1);
    go = roundTo(interpolateTable(table, lb, "yToX"), 2);
  }

  const keyword = `${LINE_TYPE_LABEL[lineType]} ${go}号`;

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium text-sea-700">ラインの種類</span>
          <div className="mt-1 flex gap-2">
            {(["pe", "leader"] as LineType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setLineType(type)}
                className={`flex-1 rounded-lg border px-2 py-2 text-sm transition-colors ${
                  lineType === type
                    ? "border-sea-600 bg-sea-600 text-white"
                    : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
                }`}
              >
                {LINE_TYPE_LABEL[type]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-sea-700">
            何を基準に入力するか
          </span>
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {(["go", "lb", "kg"] as Basis[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBasis(b)}
                className={`rounded-lg border px-2 py-2 text-xs transition-colors sm:text-sm ${
                  basis === b
                    ? "border-sea-600 bg-sea-600 text-white"
                    : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
                }`}
              >
                {BASIS_LABEL[b]}
              </button>
            ))}
          </div>
        </div>

        {basis === "go" && (
          <div>
            <label htmlFor="go-select" className="text-sm font-medium text-sea-700">
              号数
            </label>
            <select
              id="go-select"
              value={goValue}
              onChange={(e) => setGoValue(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
            >
              {goOptions.map((v) => (
                <option key={v} value={v}>
                  {v}号
                </option>
              ))}
            </select>
          </div>
        )}
        {basis === "lb" && (
          <div>
            <label htmlFor="lb-input" className="text-sm font-medium text-sea-700">
              lb(ポンド)
            </label>
            <input
              id="lb-input"
              type="number"
              inputMode="decimal"
              min={0}
              max={MAX_LB}
              value={lbValue}
              onChange={(e) => setLbValue(clamp(Number(e.target.value), MAX_LB))}
              className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
            />
          </div>
        )}
        {basis === "kg" && (
          <div>
            <label htmlFor="kg-input" className="text-sm font-medium text-sea-700">
              kg
            </label>
            <input
              id="kg-input"
              type="number"
              inputMode="decimal"
              min={0}
              max={MAX_KG}
              value={kgValue}
              onChange={(e) => setKgValue(clamp(Number(e.target.value), MAX_KG))}
              className="mt-1 w-full rounded-lg border border-sea-200 bg-white px-3 py-2 text-sm text-sea-800"
            />
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div
          className={`rounded-xl p-3 text-center ${basis === "go" ? "bg-accent/10" : "bg-sea-50"}`}
        >
          <p className="text-xs text-sea-500">号数目安</p>
          <p className="mt-1 text-xl font-bold text-sea-900">{go}号</p>
        </div>
        <div
          className={`rounded-xl p-3 text-center ${basis === "lb" ? "bg-accent/10" : "bg-sea-50"}`}
        >
          <p className="text-xs text-sea-500">lb</p>
          <p className="mt-1 text-xl font-bold text-sea-900">{lb}lb</p>
        </div>
        <div
          className={`rounded-xl p-3 text-center ${basis === "kg" ? "bg-accent/10" : "bg-sea-50"}`}
        >
          <p className="text-xs text-sea-500">kg</p>
          <p className="mt-1 text-xl font-bold text-sea-900">{kg}kg</p>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <ShareButton
          toolKey="line-strength-converter"
          title="ライン強度 kg⇔lb⇔号数 換算ツール"
          text={`${LINE_TYPE_LABEL[lineType]}の${go}号は、約${lb}lb・約${kg}kgが目安みたいです`}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <AffiliateLink
          href={rakutenSearchLink(keyword)}
          category={LINE_TYPE_LABEL[lineType]}
          keyword={keyword}
          className="rounded-full border border-sea-200 bg-white px-4 py-1.5 text-xs text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          楽天市場で{keyword}を探す →
        </AffiliateLink>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        号数と強度(lb・kg)の対応は、PEラインとリーダーそれぞれの一般的な目安をもとにした近似値です。同じ号数でもメーカーや製品によって実際の強度は異なります。kg・lbはそれぞれの号数に対応する強度からの計算値(1lb=0.45359237kg)です。
      </p>
    </div>
  );
}
