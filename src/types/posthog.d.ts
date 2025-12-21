import type { PostHog } from 'posthog-js'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $posthog: PostHog
    }
}
