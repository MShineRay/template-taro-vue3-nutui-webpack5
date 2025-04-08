import axios from 'axios';
import Taro from '@tarojs/taro';

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.TARO_APP_BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (Taro.getStorageSync('token')) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = Taro.getStorageSync('token');
    }
    // TODO: 公共的请求头

    return config;
  },
  error => {
    // 处理请求错误
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log('res:',res)
    // 根据业务逻辑判断响应状态
    if (res.code !== 100000) {
      Taro.showToast({
        title: res.message || 'Error',
        icon: 'none',
        duration: 2000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Taro.showToast({
      title: error.message,
      icon: 'none',
      duration: 2000
    });
    return Promise.reject(error);
  }
);

// 封装 RESTFUL 请求方法
const request = {
  get(url, config = {}) {
    return service.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return service.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return service.put(url, data, config );
  },
  delete(url, config = {}) {
    return service.delete(url, config);
  }
};

export default request;
