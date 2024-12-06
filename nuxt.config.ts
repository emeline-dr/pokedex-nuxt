// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    "~/assets/style/main.scss"
  ],
  modules: ['@element-plus/nuxt', 'nuxt-lucide-icons', '@nuxt/icon'],
})