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
        background: '#0B0D17', // Deep Navy
        foreground: '#E0E6ED', // Soft White
        primary: {
          DEFAULT: '#00D4FF', // Electric Blue
          foreground: '#0B0D17',
        },
        secondary: {
          DEFAULT: '#7000FF', // Cosmic Purple
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#00FF94', // Nebula Teal
          foreground: '#0B0D17',
        },
        muted: {
          DEFAULT: '#1F2937',
          foreground: '#9CA3AF',
        },
        border: 'rgba(255, 255, 255, 0.1)',
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 212, 255, 0.1)',
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" },
          "50%": { opacity: 0.8, boxShadow: "0 0 10px rgba(0, 212, 255, 0.2)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        }
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 8s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #00D4FF 0deg, #7000FF 180deg, #00D4FF 360deg)',
      }
    },
  },
  plugins: [],
}
