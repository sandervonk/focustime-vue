import { createStore } from "vuex";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorToast, SuccessToast, cleanError } from "@/util/util";
import { getDoc, doc, collection, updateDoc } from "firebase/firestore";
// import router functions
import router from "../router";

export default createStore({
  state: {
    user: null,
    name: null,
    settings: {
      dark_mode: false,
      do_hide_complete: false,
    },
    tasks: [],
    archive: [],
    classes: [],
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      if ((router.currentRoute.path == "/auth" || !router.currentRoute.path) && state.user) {
        router.push({ path: "/" });
      }
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      if (
        (!router.currentRoute.meta || router.currentRoute.meta.requiresAuth) &&
        !router.currentRoute.path == "/onboarding"
      ) {
        router.push({ path: "/auth" });
      }
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_CLASSES(state, classes) {
      state.classes = classes;
    },
    SET_DOC(state, doc) {
      state.name = doc.name;
      state.tasks = doc.tasks;
      state.archive = doc.archive;
      state.classes = doc.classes;
      state.settings = doc.settings;
    },
  },
  actions: {
    async completeTask({ commit }, task) {
      const tasks = this.state.tasks;
      const index = tasks.indexOf(task);
      tasks[index].is_completed = true;
      commit("SET_TASKS", tasks);
      await this.dispatch("update_doc");
    },
    async archiveTask({ commit }, task) {
      // remove task from tasks and add to archive
      const tasks = this.state.tasks;
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);

      const archive = this.state.archive;
      archive.push(task);

      commit("SET_TASKS", tasks);
      await this.dispatch("update_doc");
    },
    async update_doc() {
      // wait for user to be set
      while (!this.state.user) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // update doc using stored user uid
      await updateDoc(doc(db, "users", this.state.user.uid), {
        name: this.state.name,
        tasks: this.state.tasks,
        archive: this.state.archive,
        classes: this.state.classes,
        settings: this.state.settings,
      });
    },
    async get_doc({ commit }) {
      // wait for user to be set
      while (!this.state.user) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // get doc snapshot using stored user uid
      let docSnap = await getDoc(doc(collection(db, "users"), this.state.user.uid));
      let docData = docSnap.data();
      commit("SET_DOC", docData);
    },
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
