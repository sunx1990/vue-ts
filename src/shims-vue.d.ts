import VueRouter, { Route } from "vue-router";
import Vue from "vue";
// 这里代表的是this下的东西
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $Message: any;
    $Msgbox: any;
  }
}
