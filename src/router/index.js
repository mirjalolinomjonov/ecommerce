import { createRouter, createWebHistory } from "vue-router";
import home from "../pages/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/pages/payment.vue"),
    },
  ],
});

export default router;
