"use client";

import { useState } from "react";
import { trackShareClick } from "@/lib/analytics";

export type ShareButtonProps = {
  toolKey: string;
  title: string;
  text?: string;
  /** 共有するURL。省略時は現在のページURL */
  url?: string;
  className?: string;
};

/**
 * 結果をSNS等でシェアするための共通ボタン。
 * Web Share API(スマホのOS標準の共有シート)に対応していればそれを使い、
 * 未対応のブラウザ(主にPC)ではURLをクリップボードにコピーする。
 */
export default function ShareButton({
  toolKey,
  title,
  text,
  url,
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        trackShareClick(toolKey, "native_share");
      } catch {
        // ユーザーによるキャンセル等は何もしない
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShareClick(toolKey, "copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボード権限が無い環境では何もしない
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 rounded-full border border-sea-200 bg-white px-4 py-2 text-sm font-medium text-sea-700 transition-colors hover:border-sea-300 hover:bg-sea-50 ${className}`}
    >
      <span aria-hidden>{copied ? "✅" : "🔗"}</span>
      {copied ? "リンクをコピーしました" : "結果をシェアする"}
    </button>
  );
}
