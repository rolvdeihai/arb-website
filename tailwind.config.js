/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sjp: {
          lightBlue: '#3b82f6',   // biru muda (primary)
          darkBlue: '#1e3a8a',    // biru tua (secondary)
          white: '#ffffff',       // putih
          gray: '#f1f5f9',        // abu sangat muda (background)
        }
      }
    }
  }
}
