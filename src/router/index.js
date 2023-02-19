import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/AppView.vue";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: AppView,
    meta: { requiresAuth: true, page_title: "App Home" },
    children: [
      // index, create, timer pages  },

      {
        path: "",
        name: "AppIndexView",
        component: () => import("../views/App/AppIndexView.vue"),
        meta: {
          requiresAuth: true,
          page_title: "Dashboard",
          theme_color: "#faf4f2",
        },
      },
      {
        path: "create",
        name: "CreateView",
        component: () => import("../views/App/CreateView.vue"),
        meta: { requiresAuth: true, page_title: "Create Task", theme_color: "#faf4f2" },
      },
      {
        path: "session",
        name: "FocusSessionView",
        component: () => import("../views/App/FocusSessionView.vue"),
        meta: {
          requiresAuth: true,
          page_title: "Focus Session",
          theme_color: "#faf4f2",
        },
      },
    ],
  },
  {
    path: "/auth",
    name: "AuthView",
    component: () => import("../views/AuthView.vue"),
    meta: { requiresAuth: false, page_title: "Sign In", theme_color: "#d4edbf" },
  },
  {
    path: "/terms",
    name: "TermsView",
    component: () => import("../views/TermsView.vue"),
    meta: { requiresAuth: false, page_title: "Terms and Conditions" },
  },
  {
    path: "/onboarding",
    name: "OnboardingView",
    component: () => import("../views/OnboardingView.vue"),
    meta: { requiresAuth: false, page_title: "Get Started", theme_color: "#d4edbf" },
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue"),
    meta: { requiresAuth: false, page_title: "404 - Page Not Found", theme_color: "#d4edbf" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// catch rediects and console log them

export default router;
