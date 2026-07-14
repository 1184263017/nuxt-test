import Aura from '@primeuix/themes/aura'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN

export default defineNuxtConfig({
  compatibilityDate: '2026-07-14',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@sentry/nuxt/module',
  ],

  css: ['primeicons/primeicons.css', '~/assets/scss/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'theme-color', content: '#0b6b58' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      appEnv: process.env.NUXT_PUBLIC_APP_ENV || 'development',
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
      siteUrl,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/news': { prerender: true },
    '/products': { prerender: true },
    '/news/**': { swr: 300 },
    '/products/**': { swr: 900 },
    '/api/**': { cors: true },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',
    compressPublicAssets: true,
    sourceMap: true,
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  vite: {
    optimizeDeps: {
      include: [],
    },
  },

  eslint: {
    config: { stylistic: false },
  },

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: false,
        },
      },
    },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  site: {
    url: siteUrl,
    name: 'Northstar',
    description: '可持续演进的内容与产品站点',
    defaultLocale: 'zh-CN',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/api/**'],
  },

  robots: {
    groups: [{ userAgent: ['*'], allow: ['/'] }],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Northstar',
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
    },
  },

  sourcemap: {
    client: 'hidden',
    server: true,
  },

  sentry: {
    telemetry: false,
    authToken: sentryAuthToken,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    sourcemaps: {
      disable: !sentryAuthToken,
    },
  },
})
