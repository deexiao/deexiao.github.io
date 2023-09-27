import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import BudgetView from '../views/BudgetView/index.vue'
import TravelView from '../views/TravelView/index.vue'
import TravelDetail from '../views/TravelView/TravelDetail.vue'
import Home from '../views/Home.vue'

const routerHistory = createWebHashHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/budget',
      component: BudgetView,
    },
    {
      path: '/travels',
      component: TravelView,
    },
    {
      path: '/travels/:id',
      component: TravelDetail,
    },
  ],
})

export default router
