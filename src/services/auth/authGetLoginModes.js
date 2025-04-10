import { authGetLoginModes } from '@/api/client/auth'
import {isMockEnabled} from "@/api";
import {mockAuthGetLoginModes} from "../../mock/client/auth"; // 引入封装的请求方法

/** 获取活动列表 */
function mockAuthGetLoginModesHandler() {
  const { delay } = require('../_utils/delay');
  const { mockAuthGetLoginModes } = require('../../mock/client/auth');

  return delay().then(() => mockAuthGetLoginModes());
}


export function apiAuthGetLoginModes() {
  if (isMockEnabled) {
    return mockAuthGetLoginModesHandler();
  }
  return new Promise((resolve, reject) => {
    authGetLoginModes().then(res => {
      if (res.code === 100000) {
        // 成功
        resolve(res);
      } else {
        // 失败
        reject(res);
      }
    })
  });
}
