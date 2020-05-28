<template>
  <header class="header">
    <div class="header-title">精友报供宝</div>
    <div class="header-right">
      <div>
        <div class="companyName">{{ companyName }}</div>
        <div class="name">{{ name }}</div>
      </div>
      <div class="logout" v-if="roles.includes('03')">
        <span @click="logout">退出</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
@Component({
  name: "myHeader"
})
export default class extends Vue {
  get companyName() {
    return UserModule.comName;
  }
  get name() {
    return UserModule.name;
  }
  get roles() {
    return UserModule.roles;
  }
  private logout(){
    UserModule.LogOut()
    this.$router.push('/login')
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #409eff;
  color: #fff;
  .header-title {
    font-size: 17px;
    font-weight: 500;
  }
  .header-right {
    display: flex;
    font-size: 13px;
    .companyName {
      margin-bottom: 5px;
    }
    .logout{
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }
}
</style>
