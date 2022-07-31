/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/**/*.{html,js}",
      "./pages/**/*.{html,js}",
      "./components/**/*.{html,js}",
      "./hooks/**/*.{html,js}"
   ],
   theme: {
      extend: {
         colors: {
            veryLightGray: 'hsl(0, 0%, 96%)',
            brightRed: 'hsl(12, 88%, 59%)',
         }
      },
   },
   plugins: [],
};