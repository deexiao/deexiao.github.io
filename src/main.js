import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')

// Deploying Vite App to GitHub Pages
// https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane
