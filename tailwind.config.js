/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#5d0f0f',
        },
        gray: {
          800: '#1f2937',
          900: '#111827',
        },
        black: '#0a0a0a',
      },
      fontFamily: {
        sans: ['Crimson Pro', 'serif'],
        display: ['Bebas Neue', 'sans-serif'],
        creepy: ['Special Elite', 'Courier New', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-medium': 'float 8s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'float-medium-reverse': 'floatReverse 8s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 10s ease-in-out infinite',
        'float-super-slow': 'float 15s ease-in-out infinite',
        'float-circular': 'floatCircular 12s linear infinite',
        'float-zigzag': 'floatZigzag 10s ease-in-out infinite',
        'creepy-float': 'creepyFloat 6s ease-in-out infinite',
        'blood-drip': 'bloodDrip 5s ease-out forwards',
        'blood-drip-slow': 'bloodDrip 8s ease-out forwards',
        'blood-drip-delayed': 'bloodDrip 6s 2s ease-out forwards',
        'text-reveal': 'textReveal 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards',
        'glitch': 'glitch-anim 5s infinite linear alternate-reverse',
        'glitch-2': 'glitch-anim2 5s infinite linear alternate-reverse',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'pulse-effect': 'pulse 2s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'loading-bar': 'loadingBar 1.5s ease-in-out forwards',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        floatCircular: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(5px, -5px)' },
          '50%': { transform: 'translate(0, -10px)' },
          '75%': { transform: 'translate(-5px, -5px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        floatZigzag: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(8px, -5px)' },
          '50%': { transform: 'translate(0, -10px)' },
          '75%': { transform: 'translate(-8px, -5px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        creepyFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-5px) rotate(1deg)' },
        },
        bloodDrip: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        textReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        loadingBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'blood-drip': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40,0 Q40,40 30,90 Q30,100 40,100 Q50,100 50,90 Q40,40 50,0 Z\' fill=\'%23b91c1c\'/%3E%3C/svg%3E")',
        'film-grain': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        'fog-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.01\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      },
    }
  },
  plugins: [],
} 