import posthog from 'posthog-js'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const posthogKey = runtimeConfig.public.posthogKey || import.meta.env.VITE_POSTHOG_KEY
  const posthogHost = runtimeConfig.public.posthogHost || import.meta.env.VITE_POSTHOG_HOST

  if (!posthogKey) {
    console.warn('PostHog key not found. Analytics will not be initialized.')
    return
  }

  if (!posthogHost) {
    console.warn('PostHog host not found. Analytics will not be initialized.')
    return
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  })

  nuxtApp.provide('posthog', posthog)
  nuxtApp.vueApp.config.globalProperties.$posthog = posthog
})

export { posthog }
