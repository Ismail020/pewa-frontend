import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/selectGamemode',
      name: 'selectGamemode',
      component: () => import('../views/SelectGamemodeView.vue')
    },
    {
      path: '/playCPU',
      name: 'playCPU',
      component: () => import('../views/GameUIView.vue')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/GameUIView.vue')
    },
    {
      path: '/matchMaking',
      name: 'matchMaking',
      component: () => import('../views/matchmakingView.vue')
    },
    {
      path: '/Game/:id',
      name: 'Game',
      component: () => import('../views/AgainstPlayerUIView.vue')
    },
    {
            path: '/forgot',
            name: 'forgot',
            component: () => import('../components/LoginComponents/ForgotPassword.vue')
        },
        {
            path: '/reset-password',
            name: 'reset',
            component: () => import('../components/LoginComponents/ResetPassword.vue'),
        }
  ]
})

export default router
