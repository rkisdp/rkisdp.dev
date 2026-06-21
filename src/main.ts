import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import { FontAwesomeIcon } from './plugins/fontawesome'
import posthogPlugin from './plugins/posthog'

console.log(
  '%c👋 Hey there, curious dev!',
  'color: #a78bfa; font-size: 20px; font-weight: bold; font-family: monospace;'
)
console.log(
  '%c  Like what you see? Let\'s build something together.\n\n  📬 connect@rkisdp.dev\n',
  'color: #e2e8f0; font-size: 13px; font-family: monospace; line-height: 1.8;'
)
console.log(
  '%c  rkisdp.dev',
  'color: #7c3aed; font-size: 11px; font-family: monospace; background: #1e1b4b; padding: 4px 10px; border-radius: 4px;'
)

const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Register PostHog plugin
app.use(posthogPlugin)

app.mount('#app')
