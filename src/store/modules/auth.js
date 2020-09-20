import axios from "axios";
import router from "../../router/index";

// initial state
// shape: [{ accessToken, loggingIn, loginError }]
const state = () => ({
  accessToken: null,
  userID: null,
  userRole: null,
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
        "https://sistemadepresivotesisupc.azurewebsites.net/api/LoginWeb/registro",
        {
          ...loginData,
        }
      )

      .then((response) => {
        localStorage.setItem("accessToken", response.data.tokenString );
        localStorage.setItem("userID", response.data.id);
        localStorage.setItem("userRole", response.data.role);
        commit("loginStop", null);
        commit("updateAccessToken", response.data.tokenString);
        commit("updateUserID", response.data.id)
        commit("updateUserRole", response.data.role)
        router.push("/analisis");
        console.log(response)
      })
      .catch((error) => {
        commit("loginStop", error.response.data.error);
        commit("updateAccessToken", null);
        commit("updateUserID", null);
        commit("updateUserRole", null);
      });
  },
  fetchAccessToken({ commit }) {
    commit("updateAccessToken", localStorage.getItem("accessToken"));
    commit("updateUserID", localStorage.getItem("userID"))
    commit("updateUserRole", localStorage.getItem("userRole"))
  },
  logout({ commit }) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("userRole");
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
  updateUserID: (state, userID) => {
    state.userID = userID;
  },
  updateUserRole: (state, userRole) => {
    state.userRole = userRole;
  },
  logout: (state) => {
    state.accessToken = null;
    state.userID = null;
    state.userRole = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
