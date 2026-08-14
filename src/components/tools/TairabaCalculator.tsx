"use client";

import { useMemo, useState } from "react";
import {
  CURRENT_SPEED_LABEL,
  CurrentSpeed,
  calcTairabaWeight,
} from "@/lib/tairaba";

const CURRENT_OPTIONS: CurrentSpeed[] = ["slow", "normal", "fast"];

export default function TairabaCalculator() {
  const [depth, setDepth] = useState("30");
  const [current, setCurrent] = useState<CurrentSpeed>("normal");

  const depthNum = Number(depth);
  const result = useMemo(() => {
    if (depth === "" || Number.isNaN(depthNum) || depthNum <= 0) return null;
    return calcTairabaWeight(depthNum, current);
  }, [depth, depthNum, current]);

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-sea-700">水深</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="1"
              min="0"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none"
            />
            <span className="text-sea-500">m</span>
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-sea-700">潮の速さ</span>
          <div className="mt-1 flex gap-2">
            {CURRENT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCurrent(option)}
                className={`flex-1 rounded-lg border px-2 py-2 text-sm transition-colors ${
                  current === option
                    ? "border-sea-600 bg-sea-600 text-white"
                    : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
                }`}
              >
                {CURRENT_SPEED_LABEL[option]}
              </button>
            ))}
          </div>
        </label>
      </div>

      {result && (
        <div className="mt-5 rounded-xl bg-sea-50 p-4 text-center">
          <p className="text-sm text-sea-600">タイラバ重量の目安</p>
          <p className="mt-1 text-3xl font-bold text-sea-900">
            {result.recommended}
            <span className="ml-1 text-lg font-medium text-sea-500">g</span>
          </p>
          <p className="mt-1 text-sm text-sea-500">
            範囲の目安：{result.min}g 〜 {result.max}g
          </p>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        この結果はあくまで目安です。実際に使う重量は、潮流・水深・船の流し方・地域や船宿の方針によって大きく変わります。乗船前に船長や船宿にも確認してください。
      </p>
    </div>
  );
}
