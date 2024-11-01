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
      headerGray: "#565656",
      headerGrayTwo: "#6f6f6f",
    },
    fontFamily: {
      main: ["InterReg", "sans-serif"],
      bold: ["InterBold", "sans-serif"],
      light: ["InterLight", "sans-serif"],
      man: ["ManRope", "sans-serif"],
      mul: ["Mulish", "sans-serif"],
      gilroy: ["Gilroy", "sans-serif"],
      cat: ["Cat", "sans-serif"],
    },
    borderRadius: {
      md: "8px",
      round: "50%",
    },
    fontSize: {
      sm: "14px",
      md: "18px",
      md2: "20px",
      lg: "24px",
    },
    animation: {
      "fade-in": "fadeIn 0.3s forwards",
      "fade-out": "fadeOut 0.3s forwards",
      "slide-in": "slideIn 0.3s forwards",
      "slide-out": "slideOut 0.3s forwards",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      fadeOut: {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
      slideIn: {
        "0%": { translateX: "-200%" },
        "100%": { translateX: "0" },
      },
      slideOut: {
        "0%": { translateX: "0" },
        "100%": { translateX: "-200%" },
      },
    },
  },
  plugins: [],
};
