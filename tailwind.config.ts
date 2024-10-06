import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        custom: "0 1px 7px 4px rgba(0, 0, 0, 0.1)", // 커스텀 shadow 값 추가
      },
      colors: {
        "custom-red": "rgba(255,127,116,1)",
        "custom-orange": "rgba(235,183,123,1)",
        "custom-yellow": "rgba(235,249,76,1)",
      },
    },
    screens: {
      xs: "400px",
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
