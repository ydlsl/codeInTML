import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/pc-project/views/login/index.vue';
import Forget from '@/pc-project/views/login/forget.vue';
import Register from '@/pc-project/views/login/register.vue';
import Manage from '@/pc-project/layouts/ManageRouter.vue';
import ManageIndex from '@/pc-project/views/manage/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Forget',
    name: 'Forget',
    component: Forget,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/manage',
    name: 'Manage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Manage,
    // meta: { requireAuth: true },
    children: [
      { path: '/manage/', redirect: '/manage/ModelPage' },
      {
        path: 'index',
        name: 'Index',
        component: ManageIndex, // () => import('@/pc-project/views/manage/index.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'ModelPage',
        name: 'ModelPage',
        component: () => import(/* webpackChunkName: "ModelPage" */ '@/pc-project/views/manage/ModelPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'PropsPage',
        name: 'PropsPage',
        component: () => import(/* webpackChunkName: "PropsPage" */ '@/pc-project/views/manage/PropsPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'PropSyncPage',
        name: 'PropSyncPage',
        component:  () => import(/* webpackChunkName: "PropSyncPage" */ '@/pc-project/views/manage/PropSyncPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'WatchPage',
        name: 'WatchPage',
        component: () => import(/* webpackChunkName: "WatchPage" */ '@/pc-project/views/manage/WatchPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'EmitPage',
        name: 'EmitPage',
        component: () => import(/* webpackChunkName: "EmitPage" */ '@/pc-project/views/manage/EmitPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'RefPage',
        name: 'RefPage',
        component: () => import(/* webpackChunkName: "RefPage" */ '@/pc-project/views/manage/RefPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'ProvideInjectPage',
        name: 'ProvideInjectPage',
        component: () => import(/* webpackChunkName: "ProvideInjectPage" */ '@/pc-project/views/manage/ProvideInjectPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'RouterPage',
        name: 'RouterPage',
        component: () => import(/* webpackChunkName: "RouterPage" */ '@/pc-project/views/manage/RouterPage.vue'),
        meta: { requireAuth: true },
      },
    ],
  },
];

console.log('`${process.env.BASE_URL}`');
console.log(`${process.env.BASE_URL}`);

const router = new VueRouter({
  // mode: 'history',
  // base: `${process.env.BASE_URL}/pc-project`, //process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requireAuth) { // ???????????????????????????????????????
    if (localStorage.getItem('LOGININFO')) { // store???????????????token????????????
      next();
    } else {
      alert('???????????????');
      next({
        path: '/',
        query: { redirect: to.fullPath }, // ??????????????????path????????????????????????????????????????????????
      });
    }
  } else {
    next();
  }
});

export default router;
