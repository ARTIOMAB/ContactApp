import { radixThemePreset } from "radix-themes-tw";
const { violet, blackA, mauve, green } = require("@radix-ui/colors");
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: { max: "699px" },
      tablet: { min: "700px", max: "1099px" },
    },
    colors: {
      ...mauve,
      ...violet,
      ...green,
      ...blackA,
      red: {
        600: "#dc2626",
      },
      Info: {
        50: "#ecfeff",
        100: "#cffafe",
        300: "#67e8f9",
        500: "#79C4DC",
        600: "#34A4CA",
      },
      Secondary: {
        50: "#F8F9F9",
        100: "#F1F2F4",
        200: "#E4E6E9",
        300: "#D6D9DE",
        400: "#C8CCD3",
      },

      white: "#ffffff",
      killarney: {
        50: "#f3f6f4",
        100: "#e1eae2",
        200: "#c4d6c8",
        300: "#9db8a4",
        400: "#71967b",
        500: "#51785e",
        600: "#436850",
        700: "#314b3b",
        800: "#283d30",
        900: "#223229",
        950: "#121c17",
      },
      curious: {
        50: "#f2f8fd",
        100: "#e4f0fa",
        200: "#c4e1f3",
        300: "#8fc8ea",
        400: "#40a2d8",
        500: "#2e92c9",
        600: "#1f74aa",
        700: "#1a5d8a",
        800: "#194f73",
        900: "#1a4360",
        950: "#112b40",
      },
      fine: {
        50: "#f0f9ff",
      },
      sky: {
        300: "#7dd3fc",
      },
      Slate: {
        300: "#cbd5e1",
        400: "#94a3b8",
        950: "#020617",
      },
      blue: {
        300: "#7dd3fc",
      },
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
    },
    animation: {
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },

    presets: [radixThemePreset],
    extend: {},
  },
  plugins: [],
};
