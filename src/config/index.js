/*
 * @Author: wzn
 * @Date: 2021-06-26 18:36:20
 * @description:
 */
const env = import.meta.env.MODE;

const config = {
  dev: {
    mockApi:
      'https://www.fastmock.site/mock/637553eac09119aeb1c8ef34ed0f93b7/api',
    baseUrl: '',
  },
  prod: {
    mockApi: '',
    baseUrl: '',
  },
};

export default {
  mock: true,
  ...config[env],
};
