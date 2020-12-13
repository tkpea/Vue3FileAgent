import { createApp, ref } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/tailwind.css'
import router from './router'
import store from './store'
import './assets/style.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")
