import clientApi from './client/index'

// 检查环境变量 是否开启mock
export const isMockEnabled = process.env.TARO_APP_API_MOCK_ENABLED+'' === 'true';


// 导出所有接口
export default {
  ...clientApi,
};
