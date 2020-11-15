import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    isLoggedIn: false,
  },
  strict: debug,
  plugins: [
    createLogger(),
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true }),
      paths: ["auth"],
    }),
  ],
  mutations: {
    loggedIn: (state) => (state.isLoggedIn = true),
    loggedOut: (state) => (state.isLoggedIn = false),
  },
});
