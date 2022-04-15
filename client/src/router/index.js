import Vue from "vue";
import VueRouter from "vue-router";
import MyVoucher from "../pages/secure/myVoucher.vue";
import About from "../pages/About.vue";
import Start from "../pages/Start.vue";
import AdditinalUsers from "../pages/additional.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/my-wallet",
    name: "MyVoucher",
    component: MyVoucher,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/register-additional",
    name: "registerBusinessAdditional",
    component: AdditinalUsers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register-business",
    name: "registerBusiness",
    component: () => import("../pages/register.vue"),
    props: {user: 'business'}
  },
  {
    path: "/register",
    name: "registerCustomer",
    component: () => import("../pages/register.vue"),
    props: {user: 'user'}
  },
  {
    path: "/add-user-voucher",
    name: "voucher",
    component: () => import("../pages/secure/AddVoucher.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add-business-voucher",
    name: "businessVoucher",
    component: () => import("../pages/secure/AddBusinessVoucher.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
