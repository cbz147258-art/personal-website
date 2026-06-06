import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  shortcuts: {
    "section-container": "max-w-1100px mx-auto px-24 md:px-48 py-24 md:py-32",
    "section-title": "text-3.5 md:text-4.5 font-bold mb-16 text-center",
    "card": "bg-white dark:bg-[#1e1f2e] rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
    "btn-primary": "inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#2563eb] hover:shadow-lg hover:-translate-y-0.5",
    "btn-outline": "inline-flex items-center gap-2 px-6 py-3 border-2 border-[#3b82f6] text-[#3b82f6] dark:text-[#60a5fa] dark:border-[#60a5fa] rounded-lg font-medium transition-all duration-300 hover:bg-[#3b82f6] hover:text-white",
    "gradient-text": "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent",
    "fade-in": "opacity-0 translate-y-8 transition-all duration-700 ease-out",
    "fade-in.show": "opacity-100 translate-y-0",
  },
  theme: {
    colors: {
      primary: "#3b82f6",
      "primary-dark": "#2563eb",
      accent: "#8b5cf6",
    },
  },
})
