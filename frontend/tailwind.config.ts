import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#FFF4C7", // Цвет фона сайта
        "cream-2":"#F3E5AB", // форма для лидов 
        paper:    "#FBF6EC",  // Цвет карточек и форм
        sand:     "#F3E5AB", // Для границ или второстепенных фонов
        coffee:   "#54321f", // Основной цвет текста
        "coffee-2":"#6B4A33", // Вторичный цвет текста (чуть светлее)
        muted:    "#8A7660", // Цвет подсказок и мелкого текста
        terra:    "#402514", // Акцентный цвет (кнопки, ссылки)
        "terra-2":"#453336",
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