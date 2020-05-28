<template>
    <div>
        <el-scrollbar>
            <el-menu :default-active="activeMenu"
                     :collapse="isCollapse">
                <SidebarItem v-for="route in routes"
                             :key="route.path"
                             :item="route"
                             :base-path="route.path"
                             :is-collapse="isCollapse"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import SidebarItem from './SideItem.vue'
    import {AppModule} from '@/store/modules/app'
    import {PermissionModule} from '@/store/modules/permission'
    @Component({
        name:'Sidebar',
        components:{
            SidebarItem
        }
    })
    export default class extends Vue{
        get sidebar(){
            return AppModule.sidebar
        }
        get activeMenu(){
            const route=this.$route
            const {meta,path}=route
            if(meta.activeMenu){
                return meta.activeMenu
            }
            return path
        }
        get routes(){
            return PermissionModule.routes
        }
        get isCollapse(){
            return !this.sidebar.opened
        }
    }
</script>

<style scoped>

</style>