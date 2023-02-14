import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    forgotPassword({ commit }, user) {
      return AuthService.forgotpassword(user).then(
        (response) => {
          commit("forgotPasswordSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("forgotPasswordFailure");
          return Promise.reject(error);
        }
      );
    },
    resetPassword({ commit }, data) {
      return AuthService.resetpassword(data).then(
        (response) => {
          commit("resetPasswordSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("resetPasswordFailure");
          return Promise.reject(error);
        }
      );
    },
    saveProfile({ commit }, profileData) {
      return AuthService.saveProfile(profileData).then(
        (profileData) => {
          let user = JSON.parse(localStorage.getItem("user"));
          user.profile = profileData.data;
          commit("saveProfileSuccess", user);
          localStorage.setItem("user", JSON.stringify(user));
          return Promise.resolve(user);
        },
        (error) => {
          commit("saveProfileFailure");
          return Promise.reject(error);
        }
      );
    },
    saveIndustryProfile({ commit }, profileData) {
      return AuthService.saveIndProfile(profileData).then(
        (profileData) => {
          let user = JSON.parse(localStorage.getItem("user"));
          user.profile = profileData.data;
          commit("saveIndProfileSuccess", user);
          localStorage.setItem("user", JSON.stringify(user));
          return Promise.resolve(user);
        },
        (error) => {
          commit("saveIndProfileFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.status.initial = true;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    forgotPasswordSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    forgotPasswordFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    resetPasswordSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    resetPasswordFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    saveProfileSuccess(state, user) {
      state.user = null;
      state.user = user;
    },
    saveProfileFailure(state) {
      state.user.profile = null;
    },
    saveIndProfileSuccess(state, user) {
      state.user = null;
      state.user = user;
    },
    saveIndProfileFailure(state) {
      state.user.profile = null;
    },
  },
};
