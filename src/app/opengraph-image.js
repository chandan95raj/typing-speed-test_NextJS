import { ImageResponse } from "next/og";

export const alt = "SpeedType - Free Online Typing Speed Test";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e131a",
          color: "#e6ebf2",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 800 }}>SpeedType</div>
        <div style={{ fontSize: 44, color: "#5b9bff", marginTop: 20 }}>
          Free Online Typing Speed Test
        </div>
      </div>
    ),
    size
  );
}