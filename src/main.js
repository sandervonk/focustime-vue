import { createApp } from "vue";
import Vue3TouchEvents from "vue3-touch-events";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// custom
import { SuccessToast, Toast } from "@/util/util";
import firebase from "./firebase";
createApp(App).use(store).use(router).use(Vue3TouchEvents).mount("#app");

// Use the router.beforeEach() function to check if the user is logged in and redirect them to the app page if they are.
router.beforeEach((to, from, next) => {
  // if router meta requires auth and user is not logged in, redirect to auth page
  if (to.meta && to.meta.requiresAuth && !store.state.user) {
    next({ path: "/auth" });
    new Toast(
      "You need to be logged in to view that!",
      "default",
      1000,
      require("./assets/icon/toast/info-locked-icon.svg")
    );
  } else if (to.path == "/auth" && store.state.user) {
    next({ path: "/" });
    if (from.path != "/auth") {
      new Toast(
        "You're already logged in!",
        "default",
        1000,
        require("./assets/icon/toast/info-unlocked-icon.svg")
      );
    } else {
      new SuccessToast("Signed in successfully!", 2000);
    }
  } else {
    next();
  }
});

function dev_sign_out() {
  store.dispatch("logout");
}
window.$ = require("jquery");
window.dev_sign_out = dev_sign_out;
// if a element is clicked and it has a click-to-logout class, then logout
window.$(document.body).on("click", ".click-to-logout", function () {
  store.dispatch("logout");
});

//use store get_tasks action to get tasks from firebase
store.dispatch("get_tasks");
