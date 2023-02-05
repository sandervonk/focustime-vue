import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// custom
import { SuccessToast, Toast } from "@/util/util";
createApp(App).use(store).use(router).mount("#app");

// Use the router.beforeEach() function to check if the user is logged in and redirect them to the app page if they are.
router.beforeEach((to, from, next) => {
  // if router meta requires auth and user is not logged in, redirect to auth page
  if (to.meta && to.meta.requiresAuth && !store.state.user) {
    next({ path: "/auth" });
    new Toast("You need to be logged in to view that!", "default", 1000, require("./assets/icon/toast/info-locked-icon.svg"));
  } else if (to.path == "/auth" && store.state.user) {
    next({ path: "/" });
    if (from.path !== "/auth") {
      new Toast("You're already logged in!", "default", 1000, require("./assets/icon/toast/info-unlocked-icon.svg"));
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
window.dev_sign_out = dev_sign_out;
