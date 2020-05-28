import axios from "axios";
import { Message } from "element-ui";
import { UserModule } from "@/store/modules/user";
const service = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/offer/api" : process.env.VUE_APP_BASE_API,
  timeout: 30000
});

service.interceptors.request.use(
  (config) => {
    const token = UserModule.token || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    } else {
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 3000
      });
      return Promise.reject(new Error(res.msg || "Error"));
    }
  },
  (error) => {
    Message({
      message: error.message || "Error",
      type: "error",
      duration: 3000
    });
    Promise.reject(error);
  }
);
export default service;
