import './assets/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Assurez-vous que ce chemin est correct

createApp(App)
  .use(router)
  .mount('#app');
