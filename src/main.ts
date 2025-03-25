import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { FontAwesomeIcon } from './plugins/fontawesome'
import analytics from './plugins/analytics'

const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Register analytics plugin
app.use(analytics)

app.mount('#app')
