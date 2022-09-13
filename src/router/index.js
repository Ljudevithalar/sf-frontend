import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Auth } from '@/services';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/prijava',
    name: 'Prijava',
    component: () => import(/* webpackChunkName: "prijava" */ '../views/Prijava.vue')
  },
  {
    path: '/registracija',
    name: 'Registracija',
    component: () => import(/* webpackChunkName: "Registracija" */ '../views/Registracija.vue')
  },

  {
    path: '/oglasi',
    name: 'Oglasi',
    component: () => import(/* webpackChunkName: "Oglasi" */ '../views/Oglasi.vue')
  },
  {
    path: '/upiti',
    name: 'Upiti',
    component: () => import(/* webpackChunkName: "Upiti" */ '../views/Upiti.vue')
  },
  {
    path: '/oglasi/:id',
    props: true,
    name: 'OglasPrikaz',
    component: () => import(/* webpackChunkName: "OglasPrikaz" */ '../views/OglasPrikaz.vue')
  },
  {
    path: '/upiti/:id',
    props: true,
    name: 'UpitPrikaz',
    component: () => import(/* webpackChunkName: "UpitPrikaz" */ '../views/UpitPrikaz.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  const publicPages = ['/prijava', '/registracija', '/'];
  const authRequired = !publicPages.includes(to.path);
  const user = Auth.getUser();

  if (authRequired && !user) {
  next('/prijava');
  return;
  }
  next();
 });

export default router
