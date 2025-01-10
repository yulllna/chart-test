import { createWebHistory, createRouter } from 'vue-router';

const routes = [
   {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
   },
   {
      path: '/test',
      name: 'Test',
      component: () => import('./views/ChangeGraphTest.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
