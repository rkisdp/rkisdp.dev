import type { App } from 'vue'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    clarity: (...args: any[]) => void
  }
}

export default {
  install: (app: App) => {
    // This is just a wrapper for the scripts already loaded in index.html
    // You can add additional methods or configuration here if needed

    // Method to track custom events with Google Analytics
    app.config.globalProperties.$trackEvent = (category: string, action: string, label?: string, value?: number) => {
      if (window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        })
      }
    }

    // Method to track custom events with Microsoft Clarity
    app.config.globalProperties.$clarityEvent = (name: string, parameters?: Record<string, any>) => {
      if (window.clarity) {
        window.clarity('event', name, parameters)
      }
    }
  }
} 