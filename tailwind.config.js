/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bph-blue": "#003366",
        "bph-dark": "#002244",
        "bph-gold": "#FFD700",
        "bph-primary": "#0ea047",
        "bph-secondary": "#f3dc37",
        "primary-transparent": "rgba(14,160,71,0.5)",
        "primary": "#003366",
        "primary-dark": "#002244",
        "gold": "#C9A227",
        "success": "#0EA047",
        "danger": "#C53030",
        "muted": "#6B7280",
        "surface": "#F9FAFB",
      },
    },
  },
  plugins: [],
}
