import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "!./node_modules/**/*",
    "!./dist/**/*",
    "!./.taskmaster/**/*",
    "!./UI_UX_GUIDE/**/*",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Primary brand color
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Dynamic tag colors for blog posts
        'tag-blue': '#3b82f6',
        'tag-green': '#10b981',
        'tag-yellow': '#f59e0b',
        'tag-red': '#ef4444',
        'tag-purple': '#8b5cf6',
        'tag-pink': '#ec4899',
        'tag-indigo': '#6366f1',
        'tag-cyan': '#06b6d4',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Heading hierarchy
        'h1': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h5': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'h6': ['1.125rem', { lineHeight: '1.6', fontWeight: '500' }],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      lineHeight: {
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
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
          '2xl': '1400px',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            h1: {
              color: '#0f172a',
              fontWeight: '700',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '600',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '600',
            },
            h4: {
              color: '#0f172a',
              fontWeight: '500',
            },
            h5: {
              color: '#0f172a',
              fontWeight: '500',
            },
            h6: {
              color: '#0f172a',
              fontWeight: '500',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline',
              },
            },
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            h1: {
              fontSize: '2.5rem',
              lineHeight: '1.1',
            },
            h2: {
              fontSize: '2rem',
              lineHeight: '1.2',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.3',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
