export default defineNuxtPlugin(() => {
  const id = useRuntimeConfig().public.googleAnalyticsId

  if (id) {
    useScriptGoogleAnalytics({ id })
  }
})
