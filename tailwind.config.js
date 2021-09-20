const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  npdarkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        slideIn: "slideIn 200ms ease-in",
        slideOut: "slideOut 200ms ease-out",
      },
      colors: {
        teal: colors.teal,
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      transform: ["active"],
      scale: ["active"],
    },
  },
  plugins: [],
};
