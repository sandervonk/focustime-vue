import { createApp } from "vue";
import Vue3TouchEvents from "vue3-touch-events";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// custom
import { SuccessToast, Toast, Popup } from "@/util/util";
createApp(App).use(store).use(router).use(Vue3TouchEvents).mount("#app");

// Use the router.beforeEach() function to check if the user is logged in and redirect them to the app page if they are.
router.beforeEach(async (to, from, next) => {
  await router_guard(to, from, next);
});
async function router_guard(to, from, next) {
  if (to.meta && to.meta.requiresAuth) {
    await store.dispatch("wait_for_load");
  }
  // if need page needs auth and not signed in, redirect to auth
  if (!store.state.user && to.meta && to.meta.requiresAuth) {
    // if user is on home page, redirect to onboarding (so that base url stays as onboard)
    if (to.path == "/") {
      next({ path: "/onboarding" });
    }
    // for other pages
    else {
      next({ path: "/auth", query: { redirect: to.fullPath } });
    }
    disallowed_toast();
  }
  // if user is signed in and on auth or onboarding page, redirect to home
  else if ((to.path == "/auth" || to.path == "/onboarding") && store.state.user) {
    next({ path: "/" });
    already_logged_in_toast();
  } else {
    next();
  }
}
function disallowed_toast() {
  new Toast(
    "You need to be logged in to view that!",
    "default",
    1000,
    require("@/assets/icon/toast/info-locked-icon.svg")
  );
}
function already_logged_in_toast() {
  new Toast(
    "You're already logged in!",
    "default",
    1000,
    require("@/assets/icon/toast/info-unlocked-icon.svg")
  );
}

// set page title based on router meta (page_title)
import { removePopup } from "@/util/util";
router.afterEach((to) => {
  if (to.meta && to.meta.page_title) {
    document.title = "FocusTime  | " + to.meta.page_title;
  }
  if (to.meta && to.meta.theme_color) {
    document.querySelector("meta[name=theme-color]").setAttribute("content", to.meta.theme_color);
  }

  removePopup();
});

window.$ = require("jquery");
import "./registerServiceWorker";
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
window.Toast = Toast;
