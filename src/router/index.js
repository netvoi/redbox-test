import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/create-event',
    name: 'Create event',
    component: () => import('../views/CreateEvent.vue'),
  },
  {
    path: '/confirm-event',
    name: 'Confirm event',
    component: () => import('../views/ConfirmEvent.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
