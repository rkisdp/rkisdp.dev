import posthog from 'posthog-js'
import type { App } from 'vue'

export default {
    install(app: App) {
        const posthogKey = import.meta.env.VITE_POSTHOG_KEY
        const posthogHost = import.meta.env.VITE_POSTHOG_HOST

        if (posthogKey) {
            posthog.init(posthogKey, {
                api_host: posthogHost,
                person_profiles: 'identified_only',
                capture_pageview: true,
                capture_pageleave: true,
            })

            app.config.globalProperties.$posthog = posthog
        } else {
            console.warn('PostHog key not found. Analytics will not be initialized.')
        }
    },
}

// Export posthog instance for use in components
export { posthog }
