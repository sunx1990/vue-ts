import Vue from 'vue';
import Vuex from 'vuex';
import {IAppState} from './modules/app'
import {IPermissionState} from './modules/permission'

Vue.use(Vuex);

export interface IRootState{
  app:IAppState,
  permisson:IPermissionState
}
export default new Vuex.Store<IRootState>({});
