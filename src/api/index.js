/*
 * @Author: wzn
 * @Date: 2021-06-26 21:35:41
 * @description: 将module下的所有api请求封装成一个对象，并提供给外界调用
 */
import request from '../utils/request';

// 向外暴露的API对象，通过对象发起axios请求
const API = {};
// 所有请求的共同api前缀
const urlPrefix = '';

// 从module下递归找文件，将所有api整合在这个apiArray中
let apiArray = [];

const moduleExport = import.meta.globEager('./module/*.js');
apiArray = apiArray.concat(
  ...Object.values(moduleExport).map((v) => v.default)
);

// 生成每个请求的class
class Api {
  // 有关axios请求直接写在对象中，用户自定义的字段放在userConfig中，赋值到config中后删除
  // 因为option是axios发送的配置
  constructor(option) {
    if (option.userConfig) {
      this.config = option.userConfig;
      delete option.userConfig;
    }
    this.option = option;
  }
  // 生成每个axios的配置
  // dataType有两个值，data（请求体中）， params（请求头）
  generation(payload) {
    return {
      ...this.option,
      url: urlPrefix + this.option.url,
      [(this.config && this.config.dataType) || this.option.method === 'post'
        ? 'data'
        : 'params']: payload,
    };
  }
  // 发送axios请求
  setup(payload) {
    return request(this.generation(payload));
  }
}

// 获取每个aiox的请求名字
function getApiName({ config, url }) {
  if (config && config.name) {
    return config.name;
  }
  const urlArr = url.split('/');
  const lastWord = urlArr[urlArr.length - 1];
  return lastWord.replace(/^[a-z]/g, (word) => word.toUpperCase());
}

// 生成API
for (const item of apiArray) {
  const name = getApiName(item);
  const api = new Api(item);
  API[name] = (payload) => {
    return api.setup(payload);
  };
}

export default API;
