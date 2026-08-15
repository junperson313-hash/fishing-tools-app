"use client";

import { useState } from "react";
import {
  CURRENT_SPEED_LABEL,
  CurrentSpeed,
  TAIRABA_BANDS,
} from "@/lib/tairaba";

const CURRENT_OPTIONS: CurrentSpeed[] = ["slow", "normal", "fast"];

export default function TairabaCalculator() {
  const [bandKey, setBandKey] = useState(TAIRABA_BANDS[2].key);
  const [current, setCurrent] = useState<CurrentSpeed>("normal");

  const band = TAIRABA_BANDS.find((b) => b.key === bandKey) ?? TAIRABA_BANDS[2];

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium text-sea-700">水深帯</span>
          <div className="mt-1 grid grid-cols-5 gap-1.5">
            {TAIRABA_BANDS.map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => setBandKey(b.key)}
                className={`rounded-lg border px-1 py-2 text-xs transition-colors sm:text-sm ${
                  bandKey === b.key
                    ? "border-sea-600 bg-sea-600 text-white"
                    : "border-sea-200 bg-white text-sea-600 hover:bg-sea-50"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
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
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-sea-50 p-4 text-center">
        <p className="text-sm text-sea-600">タイラバ重量の目安</p>
        <p className="mt-1 text-3xl font-bold text-sea-900">{band[current]}</p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-sea-100">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-sea-50 text-sea-700">
            <tr>
              <th className="px-1.5 py-2 text-left font-medium sm:px-3">
                水深
              </th>
              <th className="px-1.5 py-2 text-left font-medium sm:px-3">
                遅い
              </th>
              <th className="px-1.5 py-2 text-left font-medium sm:px-3">
                普通
              </th>
              <th className="px-1.5 py-2 text-left font-medium sm:px-3">
                速い
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sea-100">
            {TAIRABA_BANDS.map((b) => (
              <tr
                key={b.key}
                className={b.key === bandKey ? "bg-accent/10" : undefined}
              >
                <td className="whitespace-nowrap px-1.5 py-2 font-medium text-sea-800 sm:px-3">
                  {b.label}
                </td>
                <td className="whitespace-nowrap px-1.5 py-2 text-sea-700 sm:px-3">
                  {b.slow}
                </td>
                <td className="whitespace-nowrap px-1.5 py-2 text-sea-700 sm:px-3">
                  {b.normal}
                </td>
                <td className="whitespace-nowrap px-1.5 py-2 text-sea-700 sm:px-3">
                  {b.fast}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        この結果はあくまで目安です。実際に使う重量は、潮流・水深・船の流し方・地域や船宿の方針によって大きく変わります。乗船前に船長や船宿にも確認してください。
      </p>
    </div>
  );
}
