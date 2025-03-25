/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(215 28% 5%)',
        foreground: 'hsl(210 10% 98%)',
        primary: {
          DEFAULT: 'hsl(210 10% 90%)',
          foreground: 'hsl(220 41% 9%)',
        },
        secondary: {
          DEFAULT: 'hsl(220 20% 24%)',
          foreground: 'hsl(210 10% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(220 20% 15%)',
          foreground: 'hsl(220 10% 70%)',
        },
        accent: {
          DEFAULT: 'hsl(220 20% 24%)',
          foreground: 'hsl(210 10% 98%)',
        },
        border: 'hsl(215 28% 17%)',
        blue: colors.blue,
        gray: colors.gray,
      },
      fontFamily: {
        mono: ['\"JetBrains Mono\"', 'monospace'],
        sans: ['\"Inter\"', 'sans-serif'],
      },
      keyframes: {
        "float-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-down": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
        },
        "float-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-20px)" },
        },
        "float-right": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(20px)" },
        },
      },
      animation: {
        "float-up": "float-up 15s ease-in-out infinite",
        "float-down": "float-down 15s ease-in-out infinite",
        "float-left": "float-left 15s ease-in-out infinite",
        "float-right": "float-right 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
