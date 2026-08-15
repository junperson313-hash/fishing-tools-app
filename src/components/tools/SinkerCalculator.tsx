"use client";

import { useState } from "react";
import { goToGram, gramToGo } from "@/lib/sinker";

export default function SinkerCalculator() {
  const [go, setGo] = useState("5");
  const [gram, setGram] = useState(() => String(goToGram(5)));

  const handleGoChange = (value: string) => {
    setGo(value);
    const num = Number(value);
    if (value !== "" && !Number.isNaN(num) && num >= 0) {
      setGram(String(goToGram(num)));
    }
  };

  const handleGramChange = (value: string) => {
    setGram(value);
    const num = Number(value);
    if (value !== "" && !Number.isNaN(num) && num >= 0) {
      setGo(String(gramToGo(num)));
    }
  };

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-sea-700">号数(go)</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0"
              value={go}
              onChange={(e) => handleGoChange(e.target.value)}
              className="w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none"
            />
            <span className="text-sea-500">号</span>
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-sea-700">重さ(g)</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              min="0"
              value={gram}
              onChange={(e) => handleGramChange(e.target.value)}
              className="w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none"
            />
            <span className="text-sea-500">g</span>
          </div>
        </label>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※ 1号=3.75g(匁)という業界共通の基準で計算しています。ごく一部の特殊な製品では表記が異なる場合があるため、購入前にパッケージも確認してください。
      </p>
    </div>
  );
}
