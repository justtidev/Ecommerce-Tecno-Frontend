//const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'flowbite/content'

  ],
   theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      }
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('flowbite/plugin'),]
  
}




}