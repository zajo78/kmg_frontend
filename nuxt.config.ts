// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],
  unocss: {
    // Pridajte tieto nastavenia
    preflight: true,
    mode: 'global',
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  runtimeConfig: {
    // Premenné dostupné len na serveri
    secretKey: process.env.NUXT_SECRET_KEY,

    // Premenné dostupné aj na klientovi
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5000'
    }
  },

  compatibilityDate: '2024-12-14',
})