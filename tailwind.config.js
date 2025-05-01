import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: { files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], extract },

  theme: {
    fontSize,
    screens,
    extend: {
      backgroundImage: {
        dotted: 'url(/src/assets/dotted.png)',
      },
      colors: {
        'orenda-purple': '#2E0086',
        'orenda-green': '#127801',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        heading: ['Ogg Text TRIAL', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      screens: {
        xs: '20rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    fluid,
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    require('tailwindcss-animate'),
  ],
};
