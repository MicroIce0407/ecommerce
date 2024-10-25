/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"], // 為字體命名，並設置 fallback 字體
      },
    },
  },
  plugins: [],
};
