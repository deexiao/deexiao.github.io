import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/index.vue'
import TravelDetail from '../views/TravelView/TravelDetail.vue'
const routerHistory = createWebHashHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/home',
      component: TravelDetail,
    },
  ],
})

export default router
