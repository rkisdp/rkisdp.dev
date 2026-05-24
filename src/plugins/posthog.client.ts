import posthog from 'posthog-js';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const posthogKey = config.public.posthogKey;
  const posthogHost = config.public.posthogHost;

  if (!posthogKey || !posthogHost) {
    console.warn('PostHog key or host not found.');
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });

  nuxtApp.vueApp.config.globalProperties.$posthog = posthog;

  return {
    provide: {
      posthog: posthog
    }
  };
});
