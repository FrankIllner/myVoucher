import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "../src/assets/scss/app.scss"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
