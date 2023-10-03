import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      // component: () => import('../views/Home.vue'),
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/home',
      // component: () => import('../views/Home.vue'),
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/budget',
      component: () => import('../views/BudgetView/index.vue'),
    },
    {
      path: '/travels',
      component: () => import('../views/TravelView/index.vue'),
    },
    {
      path: '/travels/:id',
      component: () => import('../views/TravelView/TravelDetail.vue'),
    },
  ],
})

export default router
