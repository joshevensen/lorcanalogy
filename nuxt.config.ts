import tailwindcss from "@tailwindcss/vite";
import theme from './assets/theme';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: false},
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxthub/core',
    '@primevue/nuxt-module',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  content: {
    preview: {
      api: 'https://lorcanalogy.pages.dev/'
    }
  },
  primevue: {
    options: {
      theme: {
        preset: theme,
        options: {
          darkModeSelector: false,
        }
      }
    }
  }
})
