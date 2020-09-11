import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !store.state.auth.accessToken) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else if (to.meta.onlyAnonymous && store.state.auth.accessToken) {
    next({
      path: "/analisis",
    });
  } else {
    next();
  }
});

export default router;
