import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Importeer de HomeView

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Verbind de home route met de HomeView component
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
    path: '/play',
    name: 'play',
    component: () => import('../views/PlayView.vue'),
  },
  {
    path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
  },
  {
    path: '/DummyViewGameUI',
      name: 'DummyViewGameUI',
      component: () => import('../views/DummyViewGameUI.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;