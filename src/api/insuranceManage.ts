import request from "@/utils/request";
// 获取保险公司字典
export const getCompanyDictList = (data: any) =>
  request({
    url: "/web/company/getCompanyDictList",
    method: "post",
    data
  });

// 获取省份字典
export const getAllProvince = (data: any) =>
  request({
    url: "/web/company/getAllProvince",
    method: "post",
    data
  });

// 新增保险公司
export const addCompany = (data: any) =>
  request({
    url: "/web/company/addCompany",
    method: "post",
    data
  });

// 获取保险公司列表
export const getCompanyList = (data: any) =>
  request({
    url: "/web/areaCooperate/getCompanyList",
    method: "post",
    data
  });

// 获取保险公司详情
// export function getCompanyDetail(data) {
//     return axios.post('/web/company/getCompanyDetail', data)
// }
// 获取保险公司详情
export const getCompanyDetail = (data: any) =>
  request({
    url: "/web/areaCooperate/getCompanyDetail",
    method: "post",
    data
  });

// 新增分支机构
export const addCompanyBranch = (data: any) =>
  request({
    url: "/web/areaCooperate/addCompanyBranch",
    method: "post",
    data
  });

// 获取合作关系列表
// export function getCooperateProviderList(data) {
//     return axios.post('/web/company/getCooperateProviderList', data)
// }
// 获取合作关系列表
export const getCooperateProviderList = (data: any) =>
  request({
    url: "/web/areaCooperate/getCooperateProviderList",
    method: "post",
    data
  });

// 设置合作服务关系
// export function updateInsurerCompanyLinkProvider(data) {
//     return axios.post('/web/company/updateInsurerCompanyLinkProvider', data)
// }
// 设置合作服务关系
export const updateInsurerCompanyLinkProvider = (data: any) =>
  request({
    url: "/web/areaCooperate/updateInsurerCompanyLinkProvider",
    method: "post",
    data
  });

// 停用、启用服务(保险公司及服务商)
export const updateBxCompanyOrProviderState = (data: any) =>
  request({
    url: "/web/company/updateBxCompanyOrProviderState",
    method: "post",
    data
  });
