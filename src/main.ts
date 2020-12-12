import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style.css'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

// const app = createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")