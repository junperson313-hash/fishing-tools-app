"use client";

import { useState } from "react";
import {
  BUDGET_OPTIONS,
  BudgetKey,
  EXPERIENCE_OPTIONS,
  ExperienceKey,
  getBudgetAdvice,
  getGearPlan,
  OWNED_OPTIONS,
  OwnedKey,
  PURPOSE_OPTIONS,
  PurposeKey,
} from "@/lib/gear-guide";
import GearProductCard from "@/components/GearProductCard";
import ShareButton from "@/components/ShareButton";
import { trackResultView } from "@/lib/analytics";

type Step = 0 | 1 | 2 | 3 | 4;

const STEP_LABELS = ["何をしたい？", "経験", "予算", "持っているもの"];

export default function GearGuideWizard({
  initialPurpose,
}: {
  initialPurpose?: PurposeKey;
}) {
  const [step, setStep] = useState<Step>(initialPurpose ? 1 : 0);
  const [purpose, setPurpose] = useState<PurposeKey | null>(
    initialPurpose ?? null
  );
  const [experience, setExperience] = useState<ExperienceKey | null>(null);
  const [budget, setBudget] = useState<BudgetKey | null>(null);
  const [owned, setOwned] = useState<OwnedKey[]>([]);

  const toggleOwned = (key: OwnedKey) => {
    setOwned((current) => {
      if (key === "none") {
        return current.includes("none") ? [] : ["none"];
      }
      const withoutNone = current.filter((k) => k !== "none");
      return withoutNone.includes(key)
        ? withoutNone.filter((k) => k !== key)
        : [...withoutNone, key];
    });
  };

  const goResult = () => {
    setStep(4);
    if (purpose) trackResultView("fishing-gear-guide", purpose);
  };

  const reset = () => {
    setStep(0);
    setPurpose(null);
    setExperience(null);
    setBudget(null);
    setOwned([]);
  };

  if (step === 4 && purpose) {
    const plan = getGearPlan(purpose, owned);
    const purposeLabel = PURPOSE_OPTIONS.find((p) => p.key === purpose)?.label ?? "";
    const advice =
      budget && experience ? getBudgetAdvice(budget, experience) : null;

    return (
      <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-sea-500">診断結果</p>
        <h2 className="mt-1 text-xl font-bold text-sea-900">
          {purposeLabel}に必要な道具
        </h2>
        {advice && (
          <p className="mt-3 rounded-lg bg-sea-50 p-3 text-xs leading-relaxed text-sea-600">
            {advice}
          </p>
        )}

        <div className="mt-4 flex justify-center">
          <ShareButton
            toolKey="fishing-gear-guide"
            title="初心者向け釣り道具診断"
            text={`${purposeLabel}を始めるのに必要な道具をチェックしました`}
          />
        </div>

        {plan.length > 0 ? (
          <div className="mt-4 space-y-3">
            {plan.map((item) => (
              <GearProductCard
                key={item.key}
                name={item.name}
                reason={item.reason}
                note={item.note}
                useCase={item.useCase}
                pickingPoint={item.pickingPoint}
                priceRange={item.priceRange}
                keyword={item.keyword}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-sea-600">
            すでに主な道具はお持ちのようです。あとは仕掛けやルアーなどの消耗品を状況に合わせて揃えていくのがおすすめです。
          </p>
        )}

        <p className="mt-4 text-xs leading-relaxed text-sea-400">
          ※
          道具選びに絶対的な正解はありません。ここでの提案は一般的な目安であり、実際に必要なものは釣り場や好みによって変わります。商品リンクにはAmazon・楽天のアフィリエイトリンクを含みます。
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-4 w-full rounded-lg border border-sea-200 bg-white px-4 py-2.5 text-sm font-medium text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50"
        >
          最初からやり直す
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="text-sm text-sea-500 hover:text-sea-700"
          >
            ← 戻る
          </button>
        ) : (
          <span />
        )}
        <span className="text-xs text-sea-400">
          質問 {step + 1}/{STEP_LABELS.length}
        </span>
      </div>

      <h2 className="mt-3 text-lg font-bold text-sea-900">
        {STEP_LABELS[step]}
      </h2>

      {step === 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {PURPOSE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setPurpose(opt.key);
                setStep(1);
              }}
              className={`rounded-lg border px-3 py-3 text-sm transition-colors ${
                purpose === opt.key
                  ? "border-sea-600 bg-sea-600 text-white"
                  : "border-sea-200 bg-white text-sea-700 hover:bg-sea-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="mt-4 space-y-2">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setExperience(opt.key);
                setStep(2);
              }}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                experience === opt.key
                  ? "border-sea-600 bg-sea-600 text-white"
                  : "border-sea-200 bg-white text-sea-700 hover:bg-sea-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-2">
          {BUDGET_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setBudget(opt.key);
                setStep(3);
              }}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                budget === opt.key
                  ? "border-sea-600 bg-sea-600 text-white"
                  : "border-sea-200 bg-white text-sea-700 hover:bg-sea-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="mt-4">
          <p className="text-xs text-sea-500">複数選べます</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {OWNED_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => toggleOwned(opt.key)}
                className={`rounded-lg border px-3 py-3 text-sm transition-colors ${
                  owned.includes(opt.key)
                    ? "border-sea-600 bg-sea-600 text-white"
                    : "border-sea-200 bg-white text-sea-700 hover:bg-sea-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goResult}
            disabled={owned.length === 0}
            className="mt-4 w-full rounded-lg bg-sea-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-sea-700 disabled:cursor-not-allowed disabled:bg-sea-200"
          >
            診断結果を見る
          </button>
        </div>
      )}
    </div>
  );
}
