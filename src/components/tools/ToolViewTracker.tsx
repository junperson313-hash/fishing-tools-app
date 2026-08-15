"use client";

import { useEffect } from "react";
import { trackToolView } from "@/lib/analytics";

/**
 * ツールページの表示を計測するだけの非表示コンポーネント。
 * ToolPageLayoutにtoolKeyを渡すだけで、ページごとに何も書かずに
 * 「どのツールがよく見られているか」を計測できるようにする。
 */
export default function ToolViewTracker({ toolKey }: { toolKey: string }) {
  useEffect(() => {
    trackToolView(toolKey);
  }, [toolKey]);

  return null;
}
