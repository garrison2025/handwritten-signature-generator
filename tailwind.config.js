/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'serif-display': ['"Playfair Display"', 'serif'],
      },
      animation: {
        'toast': 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        slideUpFade: {
          'from': { opacity: '0', transform: 'translate(-50%, 20px)' },
          'to': { opacity: '1', transform: 'translate(-50%, 0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
  ],
}