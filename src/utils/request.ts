import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000,
});
