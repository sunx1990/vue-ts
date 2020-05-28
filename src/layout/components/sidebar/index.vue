<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu :default-active="activeMenu" :collapse="isCollapse" router>
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SidebarItem from "./SidebarItem.vue";
import { AppModule } from "@/store/modules/app";
import { PermissionModule } from "@/store/modules/permission";
@Component({
  name: "Sidebar",
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }
  get routes() {
    return PermissionModule.routes;
  }
  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>

<style scoped lang="less">
.sidebar {
  width: 10%;
  margin-right: 10px;
  height: 100%;
  background: #fff;
}
.sidebar /deep/ .el-menu-item,
.sidebar /deep/ .el-submenu__title {
  border-bottom: 1px solid #ddd !important;
  min-width: 0;
}
.sidebar /deep/ .el-menu-item.is-active:before {
  position: absolute;
  top: 0;
  left: 1px;
  content: "";
  width: 3px;
  height: 100%;
  background: #409eff;
  display: inline-block;
}
</style>