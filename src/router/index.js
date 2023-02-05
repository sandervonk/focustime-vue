import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/AppView.vue";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: AppView,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "AuthView",
    component: () => import("../views/AuthView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/terms",
    name: "TermsView",
    component: () => import("../views/TermsView.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
