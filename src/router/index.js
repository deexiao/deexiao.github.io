import { createRouter, createWebHistory } from 'vue-router'
import BudgetView from '../views/BudgetView/index.vue'
import TravelView from '../views/TravelView/index.vue'
import TravelDetail from '../views/TravelView/TravelDetail.vue'
import Home from '../views/Home.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/budget-app/',
      component: Home,
    },
    {
      path: '/budget-app/budget',
      component: BudgetView,
    },
    {
      path: '/budget-app/travels',
      component: TravelView,
    },
    {
      path: '/budget-app/travels/:id',
      component: TravelDetail,
    },
  ],
})

export default router
