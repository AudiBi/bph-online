import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "./assets/tailwind.css"
import { i18n } from './i18n';


const app = createApp(App)

// Activer le router
app.use(router)

app.use(i18n)

// Monter l'application
app.mount("#app")
