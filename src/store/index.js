import { createStore } from "vuex";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorToast, SuccessToast, cleanError } from "@/util/util";
import "firebase/firestore";
// import router functions
import router from "../router";

export default createStore({
  state: {
    user: null,
    tasks: [],
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      if ((router.currentRoute.path == "/auth" || !router.currentRoute.path) && !state.user) {
        router.push({ path: "/" });
      }
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      router.push({ path: "/auth" });
    },
  },
  actions: {
    async login({ commit }, user) {
      commit("SET_USER", user);
    },
    async logout({ commit }) {
      await auth.signOut();
      if (router.currentRoute.path !== "/auth") {
        new SuccessToast("Logged out successfully!", 2000);
      }
      commit("CLEAR_USER");
    },
    async sign_in({ commit }, attempted_details) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          attempted_details.email,
          attempted_details.password
        );
        commit("SET_USER", user);
        new SuccessToast("Signed in successfully!", 2000);
      } catch (error) {
        new ErrorToast("Could not sign in: ", cleanError(error), 2000);
      }
    },
    async create_user({ commit }, attempted_details) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          attempted_details.email,
          attempted_details.password
        );
        commit("SET_USER", user);
        new SuccessToast("Account created successfully. Welcome to FocusTime!", 2000);
        // router push to app
      } catch (error) {
        new ErrorToast("Could not create account: ", cleanError(error), 2000);
      }
    },
  },
});
