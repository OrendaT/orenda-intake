import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: { files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], extract },

  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        'orenda-purple': '#2E0086',
        'orenda-green': '#127801',
      },
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
        heading: ["'Ogg Text TRIAL'", 'serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      },
      screens: {
        xs: '20rem',
      },
    },
  },
  plugins: [
    fluid,
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
  ],
};
