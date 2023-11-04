import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import checkAuth from "@/middlewares/checkAuth";

// กำหนด route
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/WLogin.vue")
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layouts/WLayout.vue"),
    redirect: { name: "home" },
    meta: { auth: true },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/WHome.vue")
      },
      {
        path: "/managers",
        name: "managers",
        children: [
          {
            path: "sign-history",
            name: "signHistory",
            component: () => import("@/views/managers/WSignHistory.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/WNotFound.vue")
  }
];

// สร้าง router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// กำหนด middleware ให้กับ router
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const authStore = useAuthStore();
    authStore.loadAuth();
    checkAuth(next, authStore.isAuthenticated);
  } else {
    next();
  }
});

export default router;
