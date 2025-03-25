import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $trackEvent: (category: string, action: string, label?: string, value?: number) => void
    $clarityEvent: (name: string, parameters?: Record<string, any>) => void
  }
} 