import { createRouter, createWebHashHistory } from 'vue-router'
import Games from '../views/Games.vue'

const routes = [
  {
    path: '/',
    name: 'Games',
    component: Games
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
