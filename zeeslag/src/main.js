import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

//import WebSocketService from "@/stores/WebSocketService.js";

//const backendUrl = import.meta.env.VITE_BACKEND_URL
//const webSocketService = new WebSocketService()

const app = createApp(App)
//app.config.globalProperties.$webSocketService = webSocketService

app.use(createPinia())
app.use(router)

app.mount('#app')
