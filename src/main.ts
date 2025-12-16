import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import { FontAwesomeIcon } from './plugins/fontawesome'
import posthogPlugin from './plugins/posthog'

const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Register PostHog plugin
app.use(posthogPlugin)

app.mount('#app')
