import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
/* Layout */
import Layout from "@/layout/index.vue";
Vue.use(VueRouter);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "login" */ "@/views/errorPage/404.vue")
  }
];
export const asyncRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/insuranceMange",
    meta: {
      title: "企业管理",
      routes: ["03"]
    },
    children: [
      {
        path: "/insuranceMange",
        name: "insuranceMange",
        component: () => import(/* webpackChunkName: "insuranceMange" */ "@/views/insuranceManage/index.vue"),
        meta: {
          title: "保险公司管理",
          routes: ["03"]
        }
      },
      {
        path: "/addInsurance",
        name: "addInsurance",
        component: () => import(/* webpackChunkName: "insuranceMange" */ "@/views/insuranceManage/add.vue"),
        meta: {
          title: "新增保险公司",
          routes: ["03"],
          hidden: true,
          activeMenu: "/insuranceMange"
        }
      },
      {
        path: "/insuranceDetails",
        name: "insuranceDetails",
        component: () => import(/* webpackChunkName: "insuranceMange" */ "@/views/insuranceManage/details.vue"),
        meta: {
          title: "保险公司详情",
          routes: ["03"],
          hidden: true,
          activeMenu: "/insuranceMange"
        }
      },
      {
        path: "/serviceManage",
        name: "serviceManage",
        component: () => import(/* webpackChunkName: "serviceManage" */ "@/views/serviceManage/index.vue"),
        meta: {
          title: "服务商管理",
          routes: ["03"]
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true }
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes
});

export default router;
