import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#F5EDE0",
        "cream-2":"#EFE3D2",
        paper:    "#FBF6EC",
        sand:     "#EAD9C2",
        coffee:   "#3B2314",
        "coffee-2":"#5A3A22",
        muted:    "#8A7660",
        terra:    "#C1662F",
        "terra-2":"#A0501F",
      },
      fontFamily: {
        sans:  ["var(--font-karla)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1180px",
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
      },
    },
  },
  plugins: [],
};

export default config;