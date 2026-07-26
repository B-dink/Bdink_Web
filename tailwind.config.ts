import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0A0A0A",
          card: "#1A1A1A",
          border: "#2A2A2A",
        },
        brand: {
          DEFAULT: "#39FF6A", // 네온 그린 포인트 (강사 뱃지/토글과 동일 톤)
          dim: "#2ED158",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          muted: "#6B6B6B",
        },
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
