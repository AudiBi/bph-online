import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "./assets/tailwind.css"


const app = createApp(App)

// Activer le router
app.use(router)

// Monter l'application
app.mount("#app")
