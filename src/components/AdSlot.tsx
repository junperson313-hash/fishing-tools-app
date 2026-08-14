type AdSlotProps = {
  label?: string;
  className?: string;
};

/**
 * 広告を後から差し込むためのプレースホルダー。
 * AdSense等の審査・実装が済んだら、この中身を広告タグに差し替える。
 */
export default function AdSlot({ label = "広告スペース", className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-sea-200 bg-sea-50/50 text-xs text-sea-400 ${className}`}
      aria-hidden
    >
      {label}
    </div>
  );
}
