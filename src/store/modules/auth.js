import axios from "axios";
import router from "../../router/index";

// initial state
// shape: [{ accessToken, loggingIn, loginError }]
const state = () => ({
  accessToken: null,
  loggingIn: false,
  loginError: null,
});

// getters
const getters = {};

// actions
const actions = {
  doLogin({ commit }, loginData) {
    commit("loginStart");
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Methods"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Headers"] =
      "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization";
    axios
      .post(
        "https://sistemadepresivoapi.azurewebsites.net/api/LoginWeb/registro",
        {
          ...loginData,
        }
      )

      .then((response) => {
        localStorage.setItem("accessToken", response.data.tokenString);
        commit("loginStop", null);
        commit("updateAccessToken", response.data.tokenString);
        router.push("/analisis");
      })
      .catch((error) => {
        commit("loginStop", error.response.data.error);
        commit("updateAccessToken", null);
      });
  },
  fetchAccessToken({ commit }) {
    commit("updateAccessToken", localStorage.getItem("accessToken"));
  },
  logout({ commit }) {
    localStorage.removeItem("accessToken");
    commit("logout");
    router.push("/login");
  },
};

// mutations
const mutations = {
  loginStart: (state) => (state.loggingIn = true),
  loginStop: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
  updateAccessToken: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  logout: (state) => {
    state.accessToken = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
