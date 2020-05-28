import Vue from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import {Route} from 'vue-router'
import {PermissionModule} from '@/store/modules/permission'
import {UserModule} from '@/store/modules/user'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less';
Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach(async(to:Route,from:Route,next:any)=>{
  if(to.path==='/login'){
    next()
  }else{
    if(UserModule.roles.length===0){
      try {
        await UserModule.GetUserInfo()
        const roles=UserModule.roles
        PermissionModule.GenerateRoutes(roles)
        router.addRoutes(PermissionModule.dynamicRoutes)
        next({path:to.fullPath})
      } catch (error) {
        
      }
      
    }else{
      next()
    }
    
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
