import type { NavigationGuardNext } from "vue-router";

export default function checkAuth(next: NavigationGuardNext, isAuthenticated: boolean) {
  if (isAuthenticated) {
    next();
  } else {
    next({ name: "login" });
  }
}
