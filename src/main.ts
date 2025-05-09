import { createApp } from 'vue'
import '@/assets/styles/main.scss'
import 'nprogress/nprogress.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import globalPlugin from '@/utils/tools'
import { router } from "@/router/mainRouter"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(globalPlugin)

app.mount('#app')

