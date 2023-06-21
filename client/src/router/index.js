import Vue from "vue";
import VueRouter from "vue-router";
import MyWallet from "../pages/secure/MyWallet.vue";
import About from "../pages/About.vue";
import Start from "../pages/Start.vue";
import PartnerControl from "../pages/PartnerControl.vue";
import Checkout from "../pages/Checkout.vue";
import CheckoutStripe from "../pages/secure/StripeCheckout.vue";
import MyCompany from "../pages/MyCompany.vue";
import AdditinalUsers from "../pages/Additional.vue";
import Basket from "../pages/secure/Basket.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/my-wallet",
    name: "MyWallet",
    component: MyWallet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/toBasket/:vid",
    name: "MyCompanyToBasket",
    component: () => import("../components/MyCompany.vue"),
  },
  {
    path: "/company/:aid/userid/:uid",
    name: "MyCompnay",
    component: MyCompany
  },
  {
    path: "/activated/userId/:uid",
    name: "ActivatedUser",
    component: () => import("../components/auth/UserActivated.vue"),
  },
  {
    path: "/checkQrCode/buyId/:buy_id/customerId/:c_id/voucherId/:v_id/partnerId/:p_id/status/:status",
    name: "CheckQrCode",
    component: () => import("../components/profil/Control.vue"),
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/verwaltung",
    name: "verwaltung",
    component: PartnerControl
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/register-additional",
    name: "registerBusinessAdditional",
    component: AdditinalUsers
  },
  {
    path: "/register-business",
    name: "registerBusiness",
    component: () => import("../components/auth/Register.vue"),
    props: {user: 'business'}
  },
  {
    path: "/register",
    name: "registerCustomer",
    component: () => import("../components/auth/Register.vue"),
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
  },
  {
    path: "/basket",
    name: "basket",
    component: Basket,
    meta: {
      requiresAuth: true
    }
  },  
  {
    path: "/checkout-pay",
    name: "stripeCheckout",
    component: CheckoutStripe
  },
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
