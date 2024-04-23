import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModeFree from '@/views/ModeFree.vue'
import ModeTimer from '@/views/ModeTimer.vue'
import favorite from '@/views/favorite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/freemode',
      component: ModeFree 
    },
    {
      path: '/timermode',
      component: ModeTimer
    },
    {
      path: '/favorite',
      component: favorite
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
