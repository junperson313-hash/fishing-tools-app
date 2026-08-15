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

/**
 * サイト共通で使うイベント名。ツールを増やしても計測の粒度が
 * バラつかないよう、新しいイベントを追加する場合もここに集約する。
 * 詳細はCLAUDE.mdの「Analyticsイベント設計」を参照。
 */
export const ANALYTICS_EVENTS = {
  /** ツールページの表示(利用回数・人気ツールの計測に使う) */
  TOOL_VIEW: "tool_view",
  /** 診断・計算結果が表示された(離脱ポイント分析に使う) */
  RESULT_VIEW: "result_view",
  /** アフィリエイト商品リンクのクリック */
  AFFILIATE_CLICK: "affiliate_click",
  /** 結果のシェアボタンのクリック */
  SHARE_CLICK: "share_click",
} as const;

export function trackToolView(toolKey: string) {
  trackEvent(ANALYTICS_EVENTS.TOOL_VIEW, { tool: toolKey });
}

export function trackResultView(toolKey: string, resultLabel?: string) {
  trackEvent(ANALYTICS_EVENTS.RESULT_VIEW, { tool: toolKey, result: resultLabel });
}

export function trackShareClick(toolKey: string, method: string) {
  trackEvent(ANALYTICS_EVENTS.SHARE_CLICK, { tool: toolKey, method });
}
