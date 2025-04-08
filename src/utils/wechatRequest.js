import Taro from '@tarojs/taro';

const wechatRequest = {
  get(url, params = {}) {
    return Taro.request({
      url,
      method: 'GET',
      data: params
    });
  },
  post(url, data = {}) {
    return Taro.request({
      url,
      method: 'POST',
      data
    });
  },
  put(url, data = {}) {
    return Taro.request({
      url,
      method: 'PUT',
      data
    });
  },
  delete(url, params = {}) {
    return Taro.request({
      url,
      method: 'DELETE',
      data: params
    });
  }
};

export default wechatRequest;