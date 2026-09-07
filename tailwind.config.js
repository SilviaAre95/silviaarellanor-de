/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Brand spec §8: one breakpoint at 860px, where every two-column grid
      // collapses to one. Tailwind's own md/lg stay available for layouts that
      // predate the brand and are not two-column collapses.
      screens: {
        brand: "860px",
      },
      fontFamily: {
        sans: ['"Archivo"', "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": {
            transform: "rotate(215deg) translateX(0)",
            opacity: "1",
          },
          "70%": {
            opacity: "1",
          },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      // Brand spec §7: only two radii exist. Everything else is square.
      borderRadius: {
        none: "0",
        pill: "100px",
        card: "6px",
        lg: "6px",
        md: "6px",
        sm: "6px",
        full: "100px",
      },
      // Brand spec §7: the system has no shadows. Depth comes from colour
      // layering, so every shadow utility resolves to nothing.
      boxShadow: {
        none: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Brand spec §3: the palette is closed. Five tokens, no sixth colour.
        abyss: "#0E2019",
        deep: "#173A2C",
        sea: "#4FA97F",
        chrome: "#F2C13D",
        foam: "#F4F2E7",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
