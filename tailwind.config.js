/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          alt: '#F7F4FA',
          card: '#FFFFFF',
          border: '#EAE7ED',
          text: '#34343B',
          muted: '#777780',
          lavender: '#8B78B8',
          'lavender-light': '#F3EFF9',
          'lavender-hover': '#7C67A8',
          sage: '#A8BFA5',
          'sage-light': '#EFF5EF',
          'sage-hover': '#96AD93',
          peach: '#F5D6C6',
          'peach-light': '#FDF6F2',
          'peach-hover': '#ECC7B5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-xs': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'soft-sm': '0 2px 8px -1px rgba(139, 120, 184, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 8px 24px -4px rgba(139, 120, 184, 0.1), 0 2px 6px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 16px 36px -6px rgba(139, 120, 184, 0.14), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'soft-lavender': '0 4px 18px -2px rgba(139, 120, 184, 0.35)',
        'soft-sage': '0 4px 18px -2px rgba(168, 191, 165, 0.4)',
        'soft-peach': '0 4px 18px -2px rgba(245, 214, 198, 0.5)',
      }
    },
  },
  plugins: [],
}
