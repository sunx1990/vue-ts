<template>
  <div class="main">
    <!-- 搜索 -->
    <SearchForm :formConfig="formConfig" :value="searchForm" />
    <div class="addBtn">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增保险公司</el-button>
    </div>
    <!-- table -->
    <div v-if="tableData.length">
      <el-table
        :data="tableData"
        size="small"
        :header-cell-style="{ background: '#409EFF', color: '#fff' }"
        border
      >
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column
          prop="companyName"
          width="240"
          show-overflow-tooltip
          label="保险公司名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="companyCode" label="公司编码" align="center"></el-table-column>
        <el-table-column prop="createDate" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="branchNum" label="分支数量" align="center"></el-table-column>
        <el-table-column prop="passengerCarNum" label="乘用车服务商数量" align="center"></el-table-column>
        <el-table-column prop="busiesCarNum" label="商用车服务商数量" align="center"></el-table-column>
        <el-table-column label="服务状态" align="center">
          <template slot-scope="{ row }">{{ row.serviceState | severStateFilter }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="{ row }">
            <el-button @click="goDetails(row)" type="text" size="small">查看详情</el-button>
            <el-button
              v-if="row.serviceState === '1'"
              @click="handleSever(row, '0')"
              type="text"
              size="small"
            >启动服务</el-button>
            <el-button v-else @click="handleSever(row, '1')" type="text" size="small">停止服务</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        style="margin:16px 0;text-align: right;"
      ></el-pagination>
    </div>
    <div class="noData" v-else>
      <img src="@/assets/image/noData.jpg" alt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchForm from "@/components/SearchForm.vue";
import { getCompanyList, updateBxCompanyOrProviderState } from "@/api/insuranceManage";
import { IInsuranceData } from "@/api/types";
@Component({
  name: "insuranceManage",
  filters: {
    severStateFilter(val: string): string {
      return val === "1" ? "待启动" : "服务中";
    }
  },
  components: {
    SearchForm
  }
})
export default class extends Vue {
  private formConfig = {
    formItemList: [
      {
        type: "input",
        prop: "companyName",
        placeholder: "保险公司名称"
      },
      {
        type: "input",
        prop: "companyCode",
        placeholder: "公司编码"
      },
      {
        type: "datetime",
        dateFormate: "yyyy-MM-dd HH:mm:ss",
        prop: "startDate",
        placeholder: "开始时间"
      },
      {
        type: "datetime",
        dateFormate: "yyyy-MM-dd HH:mm:ss",
        prop: "endDate",
        placeholder: "结束时间"
      },
      {
        type: "select",
        prop: "serviceState",
        placeholder: "服务状态",
        optList: [
          {
            value: "1",
            label: "待启动"
          },
          {
            value: "0",
            label: "服务中"
          }
        ]
      }
    ],
    operate: [
      {
        icon: "el-icon-search",
        type: "primary",
        name: "查询",
        handleClick: this.onSearch
      },
      {
        icon: "el-icon-refresh",
        type: "primary",
        name: "重置",
        handleClick: this.resetSearch
      }
    ]
  };
  private searchForm = {};
  private tableData: IInsuranceData[] = [];
  private pageSize = 10;
  private total = 0;
  private pageNo = 1;
  mounted() {
    this.onSearch();
  }
  private async onSearch() {
    try {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.searchForm
      };
      const { data } = await getCompanyList(params);
      this.tableData = data.list || [];
      this.total = data.total || 0;
    } catch (error) {
      console.log(error);
    }
  }
  private resetSearch() {
    this.searchForm = {};
    this.onSearch();
  }
  private handleAdd() {
    this.$router.push({ path: "/addInsurance" });
  }
  private goDetails() {
    this.$router.push({ path: "/insuranceDetails" });
  }
  private async handleSever(row: IInsuranceData, state: string) {
    const h = this.$createElement;
    let text = state === "1" ? "停止" : "启动";
    let name = row.companyName;
    this.$msgbox({
      title: "提示信息",
      message: h("p", undefined, [
        h("span", undefined, "您是否确定" + text),
        h("span", { style: { color: "#f00", "font-size": "16px", padding: "0 5px" } }, name),
        h("span", undefined, "的报供宝服务")
      ]),
      showCancelButton: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }).then(async (action: any) => {
      try {
        const params = {
          actionType: state,
          id: row.id,
          companyType: "1"
        };
        await updateBxCompanyOrProviderState(params);
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.onSearch();
      } catch (error) {
        console.log(error);
      }
    });
  }
  private handleSizeChange(value: number) {
    this.pageSize = value;
    this.onSearch();
  }
  private handleCurrentChange(value: number) {
    this.pageNo = value;
    this.onSearch;
  }
}
</script>

<style scoped>
.addBtn {
  display: flex;
  justify-content: flex-end;
}
</style>
