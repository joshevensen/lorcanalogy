import tailwindcss from "@tailwindcss/vite";
import theme from "./assets/theme";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "nuxt-lodash",
  ],
  css: ["~/assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: ".prisma/client/index-browser",
          replacement: "./node_modules/.prisma/client/index-browser.js",
        },
      ],
    },
  },
  content: {
    preview: {
      api: "https://lorcanalogy.pages.dev/",
    },
  },
  primevue: {
    options: {
      theme: {
        preset: theme,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
});
