// tailwind.config.ts — additions to your existing config
// Merge the `extend` block below into your existing tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  // ... your existing config ...
  theme: {
    extend: {
      // ── Design token colors ──
      colors: {
        ink:   '#141210',
        gold:  '#C8955A',
        blush: '#E8C4B0',
        sage:  '#8B9E8A',
        cream: '#F7F3EE',
        warm: {
          10: '#1e1a16',
          20: '#2a2318',
        },
      },

      // ── Display typeface ──
      fontFamily: {
        display: ["'Cormorant Garamond'", 'Titr', 'serif'],
        sans:    ['Inter', 'Vazirmatn', 'sans-serif'],
      },

      // ── Custom keyframes ──
      keyframes: {
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bottleReveal: {
          '0%':   { opacity: '0', transform: 'scale(0.86) translateY(30px)', filter: 'blur(8px)' },
          '60%':  { filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)', filter: 'blur(0)' },
        },
        particleFloat: {
          '0%':   { opacity: '0', transform: 'translateY(0) scale(1)' },
          '20%':  { opacity: '0.7' },
          '80%':  { opacity: '0.2' },
          '100%': { opacity: '0', transform: 'translateY(-110px) scale(0.2)' },
        },
        breathe: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':      { transform: 'translateX(-50%) translateY(6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
      },

      // ── Animation shorthands ──
      animation: {
        'fade-slide-up': 'fadeSlideUp 1s ease forwards',
        'bottle-reveal': 'bottleReveal 1.8s cubic-bezier(0.25,0.1,0,1) forwards',
        'particle-float': 'particleFloat 3.2s linear infinite',
        'breathe': 'breathe 2.5s ease-in-out infinite',
      },

      // ── Box shadow tokens ──
      boxShadow: {
        'gold-sm':  '0 4px 20px rgba(200, 149, 90, 0.08)',
        'gold-md':  '0 8px 30px rgba(200, 149, 90, 0.12)',
        'gold-lg':  '0 16px 50px rgba(200, 149, 90, 0.18)',
        'ink-sm':   '0 4px 20px rgba(20, 18, 16, 0.12)',
        'ink-md':   '0 8px 30px rgba(20, 18, 16, 0.20)',
      },

      // ── Border radius ──
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
};

export default config;
