import { createApp } from "vue";
import Vue3TouchEvents from "vue3-touch-events";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// custom
import { SuccessToast, Toast } from "@/util/util";
createApp(App).use(store).use(router).use(Vue3TouchEvents).mount("#app");

// Use the router.beforeEach() function to check if the user is logged in and redirect them to the app page if they are.
router.beforeEach((to, from, next) => {
  // if router meta requires auth and user is not logged in, redirect to auth page
  if (to.meta && to.meta.requiresAuth && !store.state.user) {
    if (to.path == "/") {
      next({ path: "/onboarding" });
    } else {
      next({ path: "/auth" });
      new Toast(
        "You need to be logged in to view that!",
        "default",
        1000,
        require("@/assets/icon/toast/info-locked-icon.svg")
      );
    }
  } else if (to.path == "/auth" && store.state.user) {
    next({ path: "/" });
    if (!from.path || from.path != "/auth") {
      new Toast(
        "You're already logged in!",
        "default",
        1000,
        require("@/assets/icon/toast/info-unlocked-icon.svg")
      );
    } else {
      new SuccessToast("Signed in successfully!", 2000);
    }
  } else {
    next();
  }
});
// set page title based on router meta (page_title)
import { removePopup } from "@/util/util";
router.afterEach((to) => {
  if (to.meta && to.meta.page_title) {
    document.title = "FocusTime  | " + to.meta.page_title;
  }

  removePopup();
});

window.$ = require("jquery");
import { Popup } from "@/util/util";
window.logoutPrompt = function () {
  new Popup(["Sign Out", "Are you sure you want to sign out?"], "default", 10000, "", [
    ["removePopup()", "Cancel", "secondary-action fullborder"],
    ["removePopup()", "Yes", "primary-action click-to-logout"],
  ]);
};
// if a element is clicked and it has a click-to-logout class, then logout
window.$(document.body).on("click", ".click-to-logout", function () {
  store.dispatch("logout");
});

// expose update_doc function to window
window.update_doc = function () {
  store.dispatch("update_doc");
};
window.fetch_doc = function () {
  store.dispatch("get_doc");
};
