import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "../src/assets/scss/app.scss"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;
Vue.prototype.$isLogin = false;
Vue.prototype.$userType = '';
let token = localStorage.getItem("jwt");
console.log('token');
console.log(token);
if (token) {
  Vue.prototype.$isLogin = true;
  let decoded = VueJwtDecode.decode(token);

  Vue.prototype.$companyId = decoded.additionalId;
  Vue.prototype.$userId = decoded._id;
  Vue.prototype.$userType = decoded.usertype;
} 

const base = axios.create({
  baseURL: "https://192.168.178.26:4000"
});

Vue.prototype.$http = base;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
