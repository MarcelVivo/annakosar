import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C6A15B',
        black: '#000000',
        white: '#FFFFFF',
        charcoal: '#0C0C0C',
        sand: '#F8F6F2'
      },
      fontFamily: {
        heading: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        subtle: '0 10px 30px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: [],
};

export default config;
