import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import PrimeVue from "primevue/config";

import App from './App.vue'
import Home from './pages/Home.vue'
import Details from './pages/Details.vue'
import Widgets from './pages/Widgets.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'List', component: Home },
    { path: '/details/:id', name: 'Details', component: Details },
    { path: '/widgets/:name', name: 'Widgets', component: Widgets },
  ]
})

createApp(App)
  .use(router)
  .use(PrimeVue, { ripple: true  })
  .mount('#app')