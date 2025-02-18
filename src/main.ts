import { createApp } from 'vue'
import '@/assets/css/style.css'
import '@/assets/css/reset.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.use(router);
app.mount('#app')
