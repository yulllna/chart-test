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
   {
      path: '/canvas',
      name: 'canvas',
      component: () => import('./views/CanvasTest.vue'),
   },
   {
      path: '/canvasAnimation',
      name: 'canvasAnimation',
      component: () => import('./views/CanvasAnimationTest.vue'),
   },
   {
      path: '/canvasAnimation2',
      name: 'canvasAnimation2',
      component: () => import('./views/CanvasAnimationTest2.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
