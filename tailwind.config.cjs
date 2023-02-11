/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx,mdx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require('flowbite/plugin'),
  ],
};
