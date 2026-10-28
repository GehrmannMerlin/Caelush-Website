import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/brand/caelush-icon.png'
        }
      ],
      meta: [
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  }
})
