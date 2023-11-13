/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans"],
    },

    extend: {
      colors: {
        text: "#475569",
        title: "#16181b",
        "btn-bg": "#0050ff",
        "primary-btn-text": "#fff",
        "secondary-btn-bg": "#f0f7ff",
        "secondary-btn-text": "#0041d1",
        "naked-btn-text": "#0050ff",
        "btn-arrow-light": "#fff",
        "btn-arrow-dark": "#0050ff",
        "btn-focus-outline": "#99c0ff",
        "outline-light": "#CBD5E1",
      },
    },
  },
  plugins: [],
};
