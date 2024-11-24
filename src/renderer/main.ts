import { createApp } from 'vue'

import App from '@/renderer/App.vue'
import pinia from '@/renderer/store/index'
import router from '@/renderer/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Add API key defined in contextBridge to window object type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    mainApi?: any
  }
}

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
