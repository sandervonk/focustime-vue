import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/AppView.vue";
import OnboardingView from "../views/OnboardingView.vue";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: AppView,
    meta: { requiresAuth: true },
    children: [
      // index, create, timer pages  },

      {
        path: "",
        name: "AppIndexView",
        component: () => import("../views/App/AppIndexView.vue"),
        meta: {
          requiresAuth: true,
          enterClass: "animate__animated animate__fadeInLeft",
          leaveClass: "animate__animated animate__fadeOutRight",
        },
      },
      {
        path: "create",
        name: "CreateView",
        component: () => import("../views/App/CreateView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "session",
        name: "FocusSessionView",
        component: () => import("../views/App/FocusSessionView.vue"),
        meta: {
          requiresAuth: true,
          enterClass: "animate__animated animate__fadeInLeft",
          leaveClass: "animate__animated animate__fadeOutRight",
        },
      },
    ],
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
  {
    path: "/onboarding",
    name: "OnboardingView",
    component: OnboardingView,
  },
  {
    path: "/:catchAll(.*)*",
    name: "OnboardingView",
    component: OnboardingView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
