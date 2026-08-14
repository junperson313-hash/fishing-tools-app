import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #1c5975 0%, #0a2333 100%)",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 72, display: "flex" }}>🎣</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#b7dee8",
            display: "flex",
          }}
        >
          PEライン・リーダー換算、タイラバ重量計算
        </div>
      </div>
    ),
    { ...size }
  );
}
