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

        dark: {
          DEFAULT: "rgb(var(--color-dark))",
          lighter: "rgb(var(--color-dark-lighter))",
        },

        black: "rgb(var(--color-black))",
        light: "rgb(var(--color-light))",

        danger: {
          DEFAULT: "rgb(var(--color-danger))",
          darker: "rgb(var(--color-danger-dark))",
        },

        success: "rgb(var(--color-success))",

        muted: {
          DEFAULT: "rgba(var(--color-muted))",
          dark: "rgba(var(--color-muted-dark))",
        },
      },

      transitionDuration: {
        DEFAULT: ".35s",
      },

      borderColor: {
        DEFAULT: "rgba(0, 0, 0, 0.1)",
        dark: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
