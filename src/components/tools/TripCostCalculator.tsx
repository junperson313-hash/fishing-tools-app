"use client";

import { useMemo, useState } from "react";
import { calcTripCost } from "@/lib/trip-cost";

const FIELD_CLASS =
  "w-full rounded-lg border border-sea-200 px-3 py-2 text-lg focus:border-sea-500 focus:outline-none";

export default function TripCostCalculator() {
  const [distanceKm, setDistanceKm] = useState("100");
  const [fuelEfficiency, setFuelEfficiency] = useState("15");
  const [fuelPrice, setFuelPrice] = useState("170");
  const [tollFee, setTollFee] = useState("2000");
  const [boatFee, setBoatFee] = useState("0");
  const [otherFee, setOtherFee] = useState("2000");
  const [peopleCount, setPeopleCount] = useState("2");

  const result = useMemo(() => {
    const distance = Number(distanceKm) || 0;
    const efficiency = Number(fuelEfficiency) || 0;
    const price = Number(fuelPrice) || 0;
    const toll = Number(tollFee) || 0;
    const boat = Number(boatFee) || 0;
    const other = Number(otherFee) || 0;
    const people = Number(peopleCount) || 1;

    return calcTripCost({
      distanceKm: distance,
      fuelEfficiencyKmPerL: efficiency,
      fuelPricePerL: price,
      tollFee: toll,
      boatFee: boat,
      otherFee: other,
      peopleCount: people,
    });
  }, [distanceKm, fuelEfficiency, fuelPrice, tollFee, boatFee, otherFee, peopleCount]);

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-sea-700">走行距離</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">km</span>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-sea-700">燃費</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">km/L</span>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-sea-700">
              ガソリン単価
            </span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">円/L</span>
            </div>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-sea-700">高速代</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={tollFee}
                onChange={(e) => setTollFee(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">円</span>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-sea-700">
              船代・エサ代
            </span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={boatFee}
                onChange={(e) => setBoatFee(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">円</span>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-sea-700">
              その他費用
            </span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={otherFee}
                onChange={(e) => setOtherFee(e.target.value)}
                className={FIELD_CLASS}
              />
              <span className="text-sea-500 text-sm">円</span>
            </div>
          </label>
        </div>

        <label className="block max-w-[160px]">
          <span className="text-sm font-medium text-sea-700">参加人数</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className={FIELD_CLASS}
            />
            <span className="text-sea-500 text-sm">人</span>
          </div>
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-sea-50 p-4 text-center">
          <p className="text-sm text-sea-600">合計費用</p>
          <p className="mt-1 text-2xl font-bold text-sea-900">
            {result.totalCost.toLocaleString()}
            <span className="ml-1 text-base font-medium text-sea-500">
              円
            </span>
          </p>
        </div>
        <div className="rounded-xl bg-accent/10 p-4 text-center">
          <p className="text-sm text-sea-600">1人あたり</p>
          <p className="mt-1 text-2xl font-bold text-sea-900">
            {result.perPersonCost.toLocaleString()}
            <span className="ml-1 text-base font-medium text-sea-500">
              円
            </span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sea-400">
        ※
        ガソリン代は「走行距離÷燃費×単価」で概算しています。実際の消費量は運転や道路状況で変わるため、あくまで目安としてご利用ください。
      </p>
    </div>
  );
}
