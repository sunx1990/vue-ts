<template>
  <div class="login-content">
    <div class="login-form">
      <el-form :model="formData" :rules="rules" label-position="left" label-width="auto">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <div class="footer">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validateUsername, validatePassword } from "@/utils/validators";
import { UserModule } from "@/store/modules/user";
@Component({
  name: "login",
  components: {}
})
export default class extends Vue {
  private formData = {
    username: "",
    password: ""
  };
  private rules = {
    username: [{ require: true, validator: validateUsername }],
    password: [{ require: true, validator: validatePassword }]
  };
  private async login() {
    try {
      const params = new FormData();
      params.append("username", this.formData.username);
      params.append("password", this.formData.password);
      await UserModule.Login(params);
      this.$router.push("/");
    } catch (error) {
      // console.log(error);
    }
  }
}
</script>

<style scoped lang="less">
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: cornflowerblue;
  .login-form {
    width: 25%;
    padding: 50px 30px;
    background: #fff;
    border-radius: 5px;
    background: #fff;
  }
}
</style>