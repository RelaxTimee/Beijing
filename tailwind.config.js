/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#142c3d',
          soft: '#50616b',
        },
        paper: '#f8f4ec',
        white: '#fffdfa',
        red: '#b84433',
        gold: '#d8a24a',
        teal: '#1f7779',
        line: '#d9d1c4'
      },
      fontFamily: {
        sans: ['"Noto Sans Thai"', 'Arial', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
