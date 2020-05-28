<template>
  <el-form
    :inline="true"
    :model="value"
    label-position="right"
    :label-width="formConfig.labelWidth"
    size="small"
  >
    <el-form-item
      v-for="(item, index) in formConfig.formItemList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <el-input
        v-if="item.type == 'input'"
        v-model.trim="value[item.prop]"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.placeholder"
      ></el-input>
      <el-select
        :clearable="true"
        v-else-if="item.type == 'select'"
        v-model="value[item.prop]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="(optItem, index) in item.optList"
          :key="index"
          :label="optItem.label"
          :value="optItem.value"
        ></el-option>
      </el-select>
      <el-date-picker
        :value-format="item.dateFormate"
        v-else
        v-model="value[item.prop]"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.placeholder"
      ></el-date-picker>
    </el-form-item>
    <el-form-item class="searchBtn">
      <!-- <el-button-group> -->
      <el-button
        v-for="(item, index) in formConfig.operate"
        :key="index"
        size="small"
        :type="item.type"
        :icon="item.icon"
        @click="item.handleClick"
      >{{ item.name }}</el-button>
      <!-- </el-button-group> -->
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
export interface IOptListItem {
  label: string;
  value: string;
}
export interface IFormListItem {
  type: string;
  prop: string;
  placeholder: string;
  optList?: IOptListItem[];
}
export interface IOperate {
  icon: string;
  type: string;
  name: string;
  handleClick(): void;
}
export interface IFormConfig {
  formItemList: IFormListItem[];
  operate?: IOperate[];
}
@Component({
  name: "searchForm"
})
export default class extends Vue {
  @Prop({ default: () => {} }) private formConfig!: IFormConfig;
  @Prop({ default: () => {} }) private value!: object;
}
</script>

<style scoped></style>
