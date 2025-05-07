import { heroui } from '@heroui/theme';

const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        'noto-sans-tc': ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#F8FAFC',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};

module.exports = config;
