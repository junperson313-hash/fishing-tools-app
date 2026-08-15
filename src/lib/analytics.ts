declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4が接続されていれば(window.gtagが存在すれば)イベントを送る。
 * 未接続でも安全に呼べる(何もしない)。GA4を後から繋ぐ場合は
 * layout.tsxにNEXT_PUBLIC_GA_IDを設定するだけでよい。
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
