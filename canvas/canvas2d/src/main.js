import {createApp} from 'vue'
import router from './router'
import App from './page.vue'

const app = createApp(App)
app.use(router).mount('#app')