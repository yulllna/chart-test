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
   {
      path: '/canvasInteraction',
      name: 'canvasInteraction',
      component: () => import('./views/CanvasInteraction1.vue'),
   },
   {
      path: '/chartLibrary1',
      name: 'chartLibrary1',
      component: () => import('./views/ChartLibraryTest1.vue'),
   },
   {
      path: '/chartLibrary2',
      name: 'chartLibrary2',
      component: () => import('./views/ChartLibraryTest2.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
