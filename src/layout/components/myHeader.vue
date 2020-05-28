<template>
  <header class="header">
    <div class="header-title">精友报供宝</div>
    <div class="header-name">
      <div class="companyName">{{ companyName }}</div>
      <div class="name">{{ name }}</div>
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
  .header-name {
    font-size: 13px;
    .companyName {
      margin-bottom: 5px;
    }
  }
}
</style>
