import * as Sentry from '@sentry/nuxt'

const dsn = process.env.NUXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: process.env.NUXT_PUBLIC_APP_ENV || 'development',
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
})
