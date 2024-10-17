/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      paleGray: "#f6f6f6",
      white: "#fff",
      textGray: "#5C5F6A",
      blackMain: "#0E1422",
      btnRed: "#743535",
      btnBlue: "#4167BF",
      deleteRed: "#C70000",
      editBlue: "	#005b96",
      amber: "#FFBF00",
      accepted: "#008000",
      darkGray: "#A9A9A9",
      orangeLogo: "#E56209",
    },
    fontFamily: {
      main: ["InterReg", "sans-serif"],
      bold: ["InterBold", "sans-serif"],
      light: ["InterLight", "sans-serif"],
      man: ["ManRope", "sans-serif"],
      mul: ["Mulish", "sans-serif"],
      gilroy: ["Gilroy", "sans-serif"],
    },
    borderRadius: {
      md: "8px",
    },
    fontSize: {
      sm: "14px",
      md: "18px",
      lg: "24px",
    },
  },
  plugins: [],
};
