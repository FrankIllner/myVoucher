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
Vue.prototype.$isLogin = false;


const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

let token = localStorage.getItem("jwt");
if (token) {
  Vue.prototype.$isLogin = true;
} 

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
