import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import App from '@/renderer/App.vue'
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
const store = createPinia()
store.use(piniaPluginPersist)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
