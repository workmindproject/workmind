/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config.textColor} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx,mdx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        sans: ["Poppins"],
      },

      
    },
    textColor: {
      'primary': '#F8C011',
      'secondary': '#DBA521',
      'content': '#20262E',
      "success": "#219653",
    },
    colors: {
      'primary': '#F8C011',
      'secondary': '#DBA521',
      'content': '#20262E',
      "success": "#219653",
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require('flowbite/plugin'),
  ],
} 
