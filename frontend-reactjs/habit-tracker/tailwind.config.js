/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx.tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1270px",
      xl: "1440px",
      "2xl": "1600px",
    },
    extend: {
      colors: {
        themepurple: "#9E85C6",
        themegrey: "#D9D9D9",
        themegreen: "#3C94A7",
      },
      height: {
        128: "32rem",
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
