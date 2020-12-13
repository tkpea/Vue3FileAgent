import { createApp, ref } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style.css'
import storage from "@/plugins/storage";
// const app = createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")
