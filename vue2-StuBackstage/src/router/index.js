import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login1";
import home from "@/components/home";
import register from "@/components/register.vue";
Vue.use(Router);

const routes = [
  {
    path: "/",
    component: login
  },
  {
    path: "/register",
    component: register
  },
  {
    path: "/home",
    component: home
  }
];

const router = new Router({
  routes // (缩写) 相当于 routes: routes
});

export default router;
