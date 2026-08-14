"use client";

import { useState } from "react";
import { goToLb, lbToGo } from "@/lib/leader";

export default function LeaderCalculator() {
  const [go, setGo] = useState("3");
  const [lb, setLb] = useState(() => String(goToLb(3)));

  const handleGoChange = (value: string) => {
    setGo(value);
    const num = Number(value);
    if (value !== "" && !Number.isNaN(num) && num > 0) {
      setLb(String(goToLb(num)));
    }
  };

  const handleLbChange = (value: string) => {
    setLb(value);
    const num = Number(value);
    if (value !== "" && !Number.isNaN(num) && num > 0) {
      setGo(String(lbToGo(num)));
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
              step="0.1"
              min="0"
              value={go}
              onChange={(e) => handleGoChange(e.target.value)}
              className="w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none"
            />
            <span className="text-sea-500">号</span>
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-sea-700">強力(lb)</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="1"
              min="0"
              value={lb}
              onChange={(e) => handleLbChange(e.target.value)}
              className="w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none"
            />
            <span className="text-sea-500">lb</span>
          </div>
        </label>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※ 表示される数値は目安です。フロロカーボンとナイロンでも強度は異なり、メーカーによっても差があります。購入前は必ずパッケージ記載の数値を確認してください。
      </p>
    </div>
  );
}
