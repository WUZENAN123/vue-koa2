/*
 * @Author: wzn
 * @Date: 2021-06-26 18:12:17
 * @description:
 */
import axios from 'axios';
import config from '../config';
import { ElMessage } from 'element-plus';

const NET_ERROR = '网络异常，请稍后重试';

const request = axios.create({
  baseURL: config.baseURL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

if (config.mock) {
  request.defaults.baseURL = config.mockApi;
}

request.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(msg || NET_ERROR);
      return Promise.reject(msg || NET_ERROR);
    }
  },
  (error) => {
    const { msg } = error;
    ElMessage.error(msg || NET_ERROR);
    return Promise.reject(msg || NET_ERROR);
  }
);

export default request;
