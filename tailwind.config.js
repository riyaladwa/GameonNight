/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          bg: '#080514',
          surface: '#110a24',
          card: 'rgba(20, 13, 40, 0.65)',
          border: 'rgba(168, 85, 247, 0.25)',
          hover: 'rgba(168, 85, 247, 0.15)',
        },
        electric: {
          purple: '#a855f7',
          violet: '#7c3aed',
          cyan: '#00f5d4',
          sky: '#00e5ff',
          orange: '#ff6b35',
          amber: '#ff9f1c',
          pink: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(168, 85, 247, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(0, 245, 212, 0.4)',
        'glow-orange': '0 0 35px -5px rgba(255, 107, 53, 0.4)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(168, 85, 247, 0.12) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

