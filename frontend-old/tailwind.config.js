/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
    extend: {
      colors: {
        'dark-purple': '#2e004e',
        'light-purple': '#7e00a9',
        'purple-gradient': 'linear-gradient(135deg, #2e004e 0%, #9333EA 100%)',
      },
    },
  },
  plugins: [],
}

