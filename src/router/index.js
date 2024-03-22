import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/index.vue'
import Home from '../views/Home.vue'
import Budget from '../views/BudgetView/index.vue'
import Travels from '../views/TravelView/index.vue'
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
    {
      path: '/budget',
      component: Budget,
    },
    {
      path: '/travels',
      component: Travels,
    },
    {
      path: '/travels/:id',
      component: TravelDetail,
    },
  ],
})

export default router
