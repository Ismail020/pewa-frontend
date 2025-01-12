import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import WebSocketService from "@/stores/WebSocketService.js";

const wsUrl = import.meta.env.VITE_WS_URL
const webSocketService = new WebSocketService(wsUrl)

const app = createApp(App)
app.config.globalProperties.$webSocketService = webSocketService

app.use(createPinia())
app.use(router)

app.mount('#app')
