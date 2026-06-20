/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ===== فونت‌ها =====
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      // ===== رنگ‌ها =====
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          light: '#8B83FF',
          dark: '#5A52D5',
        },
        secondary: '#00D2FF',
        accent: '#FF6B6B',
        success: '#00B894',
        warning: '#FDCB6E',
        dark: '#0F0E17',
        light: '#FFFFFE',
      },
      
      // ===== انیمیشن‌ها =====
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-text': 'shimmer-text 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'count-up': 'count-up 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      
      // ===== Keyframes =====
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(108, 99, 255, 0.4)' },
        },
        'count-up': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      
      // ===== فاصله‌ها =====
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      
      // ===== سایه‌ها =====
      boxShadow: {
        'glow': '0 0 40px rgba(108, 99, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(108, 99, 255, 0.4)',
        'card': '0 20px 60px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 60px rgba(108, 99, 255, 0.12)',
      },
      
      // ===== Border Radius =====
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      
      // ===== Blur =====
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
};