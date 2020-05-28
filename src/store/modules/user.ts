import {VuexModule, Mutation, Action, getModule, Module} from 'vuex-module-decorators'
import store from '@/store'
import {login,getUserInfo} from '@/api/users'
export interface IUserState{
    token:string,
    name:string,
    roles:string[]
}
@Module({dynamic:true,store,name:'user'})
class User extends VuexModule implements IUserState{
    public token:string=''
    public name:string=''
    public roles:string[]=[]
    @Mutation
    private SET_TOKEN(token:string){
        this.token=token
    }
    private SET_NAME(name:string){
        this.name=name
    }
    private SET_ROLES(roles:string[]){
        this.roles=roles
    }
    @Action
    public async Login(params:any){
        const { data } =await login(params)
        this.SET_TOKEN(data)
    }
    @Action
    public async GetUserInfo(){
        if(!this.token){
            throw Error('GetUserInfo: token is undefined!')
        }
        const { data }=await getUserInfo()
        const { name }=data
        this.SET_NAME(name)
        const roles:string[]=[]
        if(typeof data.roles==='string'){
            roles.push(data.roles)
        }
        this.SET_ROLES(roles)
    }
}
export const UserModule=getModule(User)