<template>
    <div v-if="!item.meta || !item.meta.hidden">
        <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
            <SidebarItemLink v-if="theOnlyOneChild.meta" :to="theOnlyOneChild.path">
                <el-menu-item :index="theOnlyOneChild.path"> 
                    <span v-if="theOnlyOneChild.meta.title">{{theOnlyOneChild.meta.title}}</span>
                </el-menu-item>
            </SidebarItemLink> 
        </template>
        <el-submenu v-else :index="item.path" popper-append-to-body>
            <template slot="title">
                <span v-if="item.meta && item.meta.tilte" slot="title">{{item.meta.title}}</span>
            </template>
            <template v-if="item.children">
                <SidebarItem v-if="child in item.children"
                             :key="child.path"
                             :item="child"
                             :is-collapse="isCollapse"
                             :is-first-level="false"
                             :base-path="child.path"
                             />
            </template>
        </el-submenu>

    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {RouteConfig} from 'vue-router'
import SidebarItemLink from './SidebarItemLink.vue'

@Component({
    name:'sideItem',
    components:{
        SidebarItemLink
    }
})
export default class extends Vue{
    @Prop({required:true}) private item!:RouteConfig
    @Prop({default:false}) private isCollapse!:boolean
    @Prop({default:true}) private isFirstLevel!:boolean
    @Prop({default:''}) private basePath!:string
    
    get showingChildNumber(){
        if(this.item.children){
            const showingChildren=this.item.children.filter(item=>{
                if(item.meta && item.meta.hidden){
                    return false
                }else{
                    return true
                }
            })
            return showingChildren.length
        }
        return 0
    }
    get theOnlyOneChild(){
        if(this.showingChildNumber>1){
            return null
        }
        if (this.item.children) {
        for (const child of this.item.children) {
            if (!child.meta || !child.meta.hidden) {
            return child
            }
        }
        }
        // If there is no children, return itself with path removed,
        // because this.basePath already conatins item's path information
        return { ...this.item, path: '' }
    }
}
</script>

<style scoped>

</style>