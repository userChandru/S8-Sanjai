/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        normal: ["poppinsRegular"],
        medium: ["poppinsMedium"],
        bold: ["poppinsBold"],
        semibold: ["poppinsSemiBold"],
        thin: ["poppinsThin"],
        light: ["poppinsLight"],
        extrabold: ["poppinsExtraBold"],
        extralight: ["poppinsExtraLight"],
      },
      borderWidth: {
        3 : "3.5px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
