/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{html,js}",
   ],
   theme: {
      fontFamily: {
         Lato: ["Lato", "sans-serif"],
      },
      extend: {
         colors: {
            veryLightGray: 'hsl(0, 0%, 96%)',
            brightRed: 'hsl(12, 88%, 59%)',
         }
      },
   },
   plugins: [],
};