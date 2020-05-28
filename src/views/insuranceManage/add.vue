<template>
  <div>
    <div class="goback">
      <el-page-header @back="goBack" content="新增页面"></el-page-header>
    </div>
    <div class="from">
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item label="选择保险公司" prop="companyCode">
          <el-select
            size="small"
            v-model="formData.companyCode"
            @change="selectChange"
            clearable
            filterable
          >
            <el-option
              v-for="item in companyDictList"
              :key="item.insCode"
              :label="item.insName"
              :value="item.insCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分支机构清单" prop="branchList">
          <el-upload
            class="upload-demo"
            action="a/"
            :on-change="handleChange"
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <span>只能上传excel文件</span>
              <span class="downloadTemplate">
                <a :href="`${templatePath}template/template.xlsx`" download="机构清单模板.xlsx">点击此处下载模板</a>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <div class="footer" style="margin-top:50px;">
          <el-button type="primary" @click="handleSubmit">确认新增</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IInsuranceListItem } from "@/api/types";
import { getCompanyDictList } from "@/api/insuranceManage";
@Component({
  name: "addInsurance"
})
export default class extends Vue {
  private templatePath = process.env.BASE_URL;
  private fileList = [];
  private rules = {
    companyCode: [{ required: true, message: "请选择保险公司" }],
    branchList: [{ required: true, message: "请上传分支机构清单" }]
  };
  private companyDictList: IInsuranceListItem[] = [];
  private formData = {};
  mounted() {
    this.initList();
  }
  private async initList() {
    let companyDictList = localStorage.getItem("companyDictList") || "";
    if (companyDictList && JSON.parse(companyDictList).length) {
      this.companyDictList = JSON.parse(companyDictList);
    } else {
      try {
        const { data } = await getCompanyDictList({});
        this.companyDictList = data || [];
        localStorage.setItem("companyDictList", JSON.stringify(this.companyDictList));
      } catch (error) {
        console.log(error);
      }
    }
  }
  private handleChange() {}
  private selectChange() {}
  private handleSubmit() {}
  private goBack() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="less">
.from {
  padding: 50px 100px;
  max-width: 600px;
  .downloadTemplate {
    padding-left: 30px;
    a {
      color: #409eff;
    }
  }
}
.goback {
  margin-bottom: 20px;
}
</style>