import {createApp} from 'vue'
import router from './router'
import App from './page.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';


const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')