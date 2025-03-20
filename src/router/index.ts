import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StatisticsView from '@/views/StatisticsView.vue';
import ConfigView from '@/views/ConfigView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'statistics',
      component: StatisticsView,
    },
    {
      path: '/settings',
      name: 'config',
      component: ConfigView,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name === 'login' && token) {
    next({ name: 'dashboard' });
  } else if (to.name !== 'login' && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
