/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee7e2',
          200: '#fdd1c9',
          300: '#fbae9f',
          400: '#f8826e',
          500: '#f05a44',
          600: '#e83e28',
          700: '#c82b1c',
          800: '#a5281f',
          900: '#87261e',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        blowmaggy: {
          dark: '#1a1a2e',
          mid: '#16213e',
          light: '#0f3460',
          accent: '#e94560',
        }
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
