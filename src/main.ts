import Vue from "vue";
import "normalize.css";
import App from "./App.vue";
import router from "./router";
import { Route } from "vue-router";
import { PermissionModule } from "@/store/modules/permission";
import { UserModule } from "@/store/modules/user";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.less";
Vue.use(ElementUI);
Vue.config.productionTip = false;
router.beforeEach(async (to: Route, from: Route, next: any) => {
  console.log(to.path);
  if (to.path === "/login") {
    next();
  } else {  
    console.log(1)
    if(sessionStorage.getItem('token')){
      console.log(2)
      if (UserModule.roles.length === 0) {
        console.log(3)
        try {
          await UserModule.GetUserInfo();
          const roles = UserModule.roles;
          PermissionModule.GenerateRoutes(roles);
          router.addRoutes(PermissionModule.dynamicRoutes);
          console.log(to.path)
          next({ path: to.fullPath });
        } catch (error) {
          console.log(error);
        }
      } else {
        next();
      }
    }else{
      next({path:'/login'})
    }
    
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
