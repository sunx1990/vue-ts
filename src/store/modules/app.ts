import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators' 
import {getSidebarStatus,setSidebarStatus} from '@/utils/cookies'
import store from '@/store'
export interface IAppState{
    sidebar:{
        opened:boolean,
        withoutAnimation:boolean
    },
}
@Module({dynamic:true,store,name:'app'})
class App extends VuexModule implements IAppState{
    public sidebar={
        opened:getSidebarStatus() !== 'closed',
        withoutAnimation:false
    }
    @Mutation
    private TOOGLE_SIDEBAR(withoutAnimation:boolean) {
        this.sidebar.opened=!this.sidebar.opened
        this.sidebar.withoutAnimation=withoutAnimation
        this.sidebar.opened?setSidebarStatus('oped'):setSidebarStatus('closed')
    }
    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation:boolean){
        this.sidebar.opened=false
        this.sidebar.withoutAnimation=withoutAnimation
        setSidebarStatus('closed')
    }
    @Action
    public ToggleSidebar(withoutAnimation:boolean){
        this.TOOGLE_SIDEBAR(withoutAnimation)
    }
    public CloseSidebar(withoutAnimation:boolean){
        this.CLOSE_SIDEBAR(withoutAnimation)
    }
}
export const AppModule = getModule(App)




