import { useAuthStore } from "@/stores/auth.store";
import { createRouter, createWebHistory } from "vue-router";

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
      path: "/signin",
      name: "signin",
      component: () => import("./signin.module/signin.view.vue"),
      meta: { isPublic: true },
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore();
        const user = await authStore.user;
        console.log(1,user)
        if (user) next({ name: "home" });
        else next();
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
      path: "/",
      name: "home",
      component: () => import("./tasks.module/tasks.view.vue"),
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("./tasks.module/tasks.view.vue"),
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
  const user = await authStore.user;
  if (to.meta.isPublic) next();
  else if (!user) next({ name: "signin" });
  else next();
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
