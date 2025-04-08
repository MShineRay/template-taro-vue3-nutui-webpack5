import request from '@/utils/request';
const CLIENT_PATH = process.env.TARO_APP_API_BASE_PATH_CLIENT;

export const getLoginModes = () => {
  return request.post(`${CLIENT_PATH}/auth/get-login-modes`);
};

export const login = (data) => {
  return request.post(`${CLIENT_PATH}/auth/login`, data);
};

// 导出所有接口
export default {
  getLoginModes,
  login
};