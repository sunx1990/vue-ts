import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
/* Layout */
import Layout from '@/layout/index.vue'
Vue.use(VueRouter);

export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect:'/insuranceMange',
    meta:{
      title:'企业管理'
    },
    children:[
      {
        path:'insuranceMange',
        component: () => import(/* webpackChunkName: "insuranceMange" */ '@/views/insuranceManage/index.vue'),
        meta:{
          title:'保险公司管理'
        }
      },
      {
        path:'serviceManage',
        component: () => import(/* webpackChunkName: "serviceManage" */ '@/views/serviceManage/index.vue'),
        meta:{
          title:'服务商管理'
        }
      },
    ]
  },
];
export const asyncRoutes: RouteConfig[]=[]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:constantRoutes,
});

export default router;
