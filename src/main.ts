import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import { FontAwesomeIcon } from './plugins/fontawesome'

const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
