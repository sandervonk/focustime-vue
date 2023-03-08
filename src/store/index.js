import { createStore } from "vuex";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorToast, SuccessToast, cleanError, Toast } from "@/util/util";
import { getDoc, doc, collection, updateDoc } from "firebase/firestore";
// import router functions
import router from "../router";
function already_logged_in_toast() {
  new Toast(
    "You're already logged in!",
    "default",
    1000,
    require("@/assets/icon/toast/info-unlocked-icon.svg")
  );
}

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
    has_loaded: false,
    waiting_for_load: false,
  },
  getters: {
    get_tasks: (state) => {
      return state.tasks;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      if (
        (!router.currentRoute.value ||
          !router.currentRoute.value.path ||
          router.currentRoute.value.path == "/auth") &&
        state.user
      ) {
        already_logged_in_toast();
        if (
          // has redirect query
          router.currentRoute.value.query &&
          router.currentRoute.value.query.redirect &&
          // redirect query is not auth or onboarding
          router.currentRoute.value.query.redirect != "/auth" &&
          router.currentRoute.value.query.redirect != "/onboarding" &&
          // and it resolves
          router.resolve(router.currentRoute.value.query.redirect).resolved
        ) {
          router.push(router.currentRoute.value.query.redirect);
        } else {
          router.push("/");
        }
      }
      state.has_loaded = true;
    },
    CLEAR_USER(state) {
      state.user = null;
      state.has_loaded = true;
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
      state.has_loaded = true;
    },
  },
  actions: {
    async wait_for_load({ commit }) {
      this.state.waiting_for_load = true;
      while (!this.state.has_loaded) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      this.state.waiting_for_load = false;
      return true;
    },
    async addTask({ commit }, task) {
      let tasks = this.state.tasks;
      tasks.push(task);
      commit("SET_TASKS", tasks);
      await this.dispatch("update_doc");
      new SuccessToast("Task created!", 2000);
    },
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
      await updateDoc(
        doc(db, "users", this.state.user.uid),
        {
          name: this.state.name,
          tasks: this.state.tasks,
          archive: this.state.archive,
          classes: this.state.classes,
          settings: this.state.settings,
        },
        { merge: true }
      );
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
      commit("CLEAR_USER");
      if (router.currentRoute.path !== "/auth") {
        new SuccessToast("Logged out successfully!", 2000);
        router.push({ path: "/auth" });
      }
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
        new ErrorToast("Could not sign in", cleanError(error), 2000);
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
    async archive_done_tasks({ commit }) {
      let tasks = this.state.tasks;
      let archive = this.state.archive;
      for (let i = 0; i < tasks.length; i++) {
        if (
          tasks[i].is_completed &&
          tasks[i].date &&
          !isNaN(tasks[i].date) &&
          new Date(tasks[i].date).getTime < new Date().getTime - 86400000
        ) {
          archive.push(tasks[i]);
          tasks.splice(i, 1);
          i--;
        }
      }
      commit("SET_TASKS", tasks);
      await this.dispatch("update_doc");
    },
    async delete_done_tasks({ commit }) {
      let tasks = this.state.tasks;
      for (let i = 0; i < tasks.length; i++) {
        if (
          tasks[i].is_completed &&
          tasks[i].date &&
          !isNaN(tasks[i].date) &&
          new Date(tasks[i].date).getTime < new Date().getTime - 86400000
        ) {
          tasks.splice(i, 1);
          i--;
        }
      }
      commit("SET_TASKS", tasks);
      await this.dispatch("update_doc");
    },
  },
});
