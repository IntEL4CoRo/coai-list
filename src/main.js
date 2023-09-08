import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from "primevue/config";

const app = createApp(App)
app.mount('#app')
app.use(PrimeVue, { ripple: true  });