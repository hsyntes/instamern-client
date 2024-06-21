/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          darker: "rgb(var(--color-primary-darker))",
        },

        secondary: {
          DEFAULT: "rgb(var(--color-secondary))",
          darker: "rgb(var(--color-secondary-darker))",
        },

        dark: "rgb(var(--color-dark))",
        black: "rgb(var(--color-black))",
        light: "rgb(var(--color-light))",
        muted: "rgb(var(--color-muted))",
      },

      transitionDuration: {
        DEFAULT: ".35s",
      },
    },
  },
  plugins: [],
};
