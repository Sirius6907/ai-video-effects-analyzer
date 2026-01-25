/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', /* slate-700 */
        input: 'var(--color-input)', /* slate-700 */
        ring: 'var(--color-ring)', /* amber-500 */
        background: 'var(--color-background)', /* slate-900 */
        foreground: 'var(--color-foreground)', /* slate-50 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* indigo-500 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* violet-500 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-500 */
          foreground: 'var(--color-accent-foreground)', /* gray-800 */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* gray-800 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-700 */
          foreground: 'var(--color-muted-foreground)', /* slate-400 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* slate-800 */
          foreground: 'var(--color-card-foreground)', /* slate-200 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* slate-800 */
          foreground: 'var(--color-popover-foreground)', /* slate-200 */
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        caption: ['Source Sans Pro', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      boxShadow: {
        'glow-sm': '0 2px 4px rgba(99, 102, 241, 0.1)',
        'glow': '0 4px 6px rgba(99, 102, 241, 0.15)',
        'glow-md': '0 6px 12px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 12px 24px rgba(99, 102, 241, 0.25)',
        'glow-xl': '0 24px 48px rgba(99, 102, 241, 0.3)',
        'glow-2xl': '0 32px 64px rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out': 'slide-out 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '500': '500',
        '1000': '1000',
        '1010': '1010',
        '1020': '1020',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}