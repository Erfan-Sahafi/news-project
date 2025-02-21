/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        shade_1: "var(--shade-1)",
        shade_2: "var(--shade-2)",
        shade_3: "var(--shade-3)",
        shade_4: "var(--shade-4)",
        shade_5: "var(--shade-5)",
        shade_6: "var(--shade-6)",
        tint_1: "var(--tint-1)",
        tint_2: "var(--tint-2)",
        tint_3: "var(--tint-3)",
        tint_4: "var(--tint-4)",
        tint_5: "var(--tint-5)",
        tint_6: "var(--tint-6)",
        tint_7: "var(--tint-7)",
        gray_1: "var(--gray-1)",
        gray_2: "var(--gray-2)",
        gray_3: "var(--gray-3)",
        gray_4: "var(--gray-4)",
        gray_5: "var(--gray-5)",
        gray_6: "var(--gray-6)",
        gray_7: "var(--gray-7)",
        gray_8: "var(--gray-8)",
        gray_9: "var(--gray-9)",
        gray_10: "var(--gray-10)",
        gray_11: "var(--gray-11)",
        gray_12: "var(--gray-12)",
        gray_13: "var(--gray-13)",
        error: "var(--error)",
        error_l_1: "var(--error-l-1)",
        error_l_2: "var(--error-l-2)",
        success: "var(--success)",
        success_l_1: "var(--success-l-1)",
        success_l_2: "var(--success-l-2)",
        warning: "var(--warning)",
        warning_l_1: "var(--warning-l-1)",
        warning_l_2: "var(--warning-l-2)",
      },
      fontSize:{
        md: '18px'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6.75rem",
        },
      },
      backgroundImage:{
        baner: "url('/images/baner.png')",
        phoneBaner: "url('/images/phoneBaner.png')"
      },
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("flowbite/plugin"),
  ],
};
