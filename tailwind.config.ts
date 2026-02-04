import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        cream: '#FDF8F3',
        sand: '#F5EDE4',
        terracotta: '#C17A5A',
        'warm-brown': '#8B6F5C',
        charcoal: '#3D3530',
        'warm-gray': '#7A6F66',
        sage: '#7D9B76',
        sienna: '#A65D3F',
        // Dark mode
        'deep-brown': '#1F1A17',
        'warm-charcoal': '#2D2622',
        'soft-terracotta': '#D4896B',
        'muted-sand': '#A69383',
        'warm-white': '#F5EDE4',
        'dusty-rose': '#9C8B80',
        'soft-sage': '#8FAA87',
        coral: '#C4785C',
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
      transitionDuration: {
        fade: '300ms',
        card: '250ms',
        pulse: '200ms',
        progress: '400ms',
      },
    },
  },
  plugins: [],
}

export default config
