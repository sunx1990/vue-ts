import {VuexModule, Mutation, Action, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {login, getUserInfo} from '@/api/users';
export interface IUserState {
    token: string;
    name: string;
    roles: string[];
}
@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
    public token: string = '';
    public name: string = '';
    public comName: string = '';
    public roles: string[] = [];
    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
        sessionStorage.setItem('token',token)
    }
    @Mutation
    private SET_NAME(name: string) {
        this.name = name;
    }
    @Mutation
    private SET_COM_NAME(name: string) {
        this.comName = name;
    }
    @Mutation
    private SET_ROLES(roles: string[]) {
        console.log(roles)
        this.roles = roles;
    }
    @Action
    public async Login(params: any) {
        const { data } = await login(params);
        this.SET_TOKEN(data);
    }
    @Action
    public async GetUserInfo() {
        // if (!this.token) {
        //     throw Error('GetUserInfo: token is undefined!');
        // }
        const { data } = await getUserInfo();
        const { comName, userType, insuranceName } = data;
        this.SET_COM_NAME(insuranceName);
        this.SET_NAME(comName);
        this.SET_ROLES([userType]);
    }
    @Action
    public async LogOut() {
        localStorage.removeItem('token')
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }
    
}
export const UserModule = getModule(User);
