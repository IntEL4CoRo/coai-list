import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import PrimeVue from "primevue/config";

import App from './App.vue'
import COAIList from './components/COAIList.vue'
import COAIDetails from './components/COAIDetails.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'List', component: COAIList },
    { path: '/details/:id', name: 'Details', component: COAIDetails },
  ]
})

createApp(App)
  .use(router)
  .use(PrimeVue, { ripple: true  })
  .mount('#app')