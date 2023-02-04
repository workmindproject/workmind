import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./task.module/task.view.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./signin.module/signin.view.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./signup.module/signup.view.vue"),
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("./task.module/task.view.vue"),
    },
    {
      path: "/focus",
      name: "focus",
      component: () => import("./focus.module/focus.view.vue"),
    },
  ],
});

export default router;
