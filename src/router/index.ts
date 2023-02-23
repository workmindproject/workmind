import { useAuthStore } from "@/stores/auth.store";
import { usePageStore } from "@/stores/page.store";
import { createRouter, createWebHistory, useRoute } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      // History back position, if user click Back button
      return savedPosition;
    } else {
      // Scroll to top of page if the user didn't press the back button
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./workspace.module/wellcome-workspace.view.vue"),
    },
    {
      path: "/:workspace",
      name: "tasks",
      component: () => import("./task.module/task.view.vue"),
    },
    {
      path: "/:workspace/today",
      name: "today",
      component: () => import("./task.module/task.view.vue"),
    },
    {
      path: "/:workspace/calendar",
      name: "calendar",
      component: () => import("./coming-soon.module/comming-soon.view.vue"),
    },
    {
      path: "/:workspace/booking",
      name: "booking",
      component: () => import("./coming-soon.module/comming-soon.view.vue"),
    },
    {
      path: "/:workspace/integration",
      name: "integration",
      component: () => import("./coming-soon.module/comming-soon.view.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./signin.module/signin.view.vue"),
      meta: { isPublic: true },
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore();
        const user = await authStore.currentUser();
        if (!user) next();
        else next({ name: "home" });
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./signup.module/signup.view.vue"),
      meta: { isPublic: true },
    },
    {
      path: "/verify",
      name: "verify",
      component: () => import("./verify.module/verify.view.vue"),
      meta: { isPublic: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("./forgot-pass.module/forgot-pass.view.vue"),
      meta: { isPublic: true },
    },
    {
      path: "/confirm-password",
      name: "confirm-password",
      component: () => import("./forgot-pass.module/confirm-pass.view.vue"),
      meta: { isPublic: true },
    },
    {
      path: "/focus",
      name: "focus",
      component: () => import("./focus.module/focus.view.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const user = await authStore.currentUser();
  if (to.meta.isPublic) next();
  else if (!user) next({ name: "signin", query: { redirect: to.fullPath } });
  else next();
});

router.beforeEach(async (to, from, next) => {
  const workspaceParam = !to.params?.workspace
    ? null
    : Array.isArray(to.params.workspace)
    ? null
    : to.params.workspace;
  if (!workspaceParam) return next();

  const pageStore = usePageStore();
  await pageStore.getCurrentWorkspace(workspaceParam);
  next();
});

// router.options.history.listen((to, from, info)=>{
//   console.log('history.listen',info.direction)
// })

// router.beforeEach(async (to, from, next) => {
//   const w: any = window
//   console.log('beforeEach', w.popStateDetected)
//   // if(from.name === to.name) router.push(to.fullPath)
//   // else next()
//   w.popStateDetected = false
//   next()
// });

// Navigation Guards
// router.beforeEach(async (to, from) => {
// canUserAccess() returns `true` or `false`
// const canAccess = await canUserAccess(to)
// if (!canAccess) return '/login'
// })

export default router;
