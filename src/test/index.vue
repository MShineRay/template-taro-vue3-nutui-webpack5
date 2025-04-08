<template>
  <view class="index">
    <!-- <nut-toast :msg="state.msg" v-model:visible="state.show" :type="state.type" @closed="onClosed" :cover="state.cover" />
    <nut-cell title="Text 文字提示" is-link @click="openToast('text', '网络失败，请稍后再试~')"></nut-cell>
    <nut-cell
      title="Title 标题文字"
      is-link
      @click="openToast('text', '网络失败，请稍后再试~', false, '标题文字')"
    ></nut-cell>
    <nut-cell
      title="Text 自定义位置"
      is-link
      @click="openToast('text', '自定义位置', false, '', '20%', false)"
    ></nut-cell>
    <nut-cell title="Success 成功提示" is-link @click="openToast('success', '成功提示')"></nut-cell>
    <nut-cell title="Error 失败提示" is-link @click="openToast('fail', '失败提示')"></nut-cell>
    <nut-cell title="Warning 警告提示" is-link @click="openToast('warn', '警告提示')"></nut-cell>
    <nut-cell title="Loading 加载提示" is-link @click="openToast('loading', '加载中')"></nut-cell>
    <nut-cell title="Loading 带白色背景遮罩" is-link @click="openToast('loading', '加载中', true)"></nut-cell> -->
    <!-- 新增一个按钮用于触发请求 -->
    <nut-cell title="触发 POST 请求" is-link @click="triggerPostRequest"></nut-cell>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { getLoginModes } from '@/api/client/auth' // 引入封装的请求方法

const state = reactive({
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
  title: '',
  bottom: '',
  center: true
})

const openToast = (type, msg, cover = false) => {
  state.show = true
  state.msg = msg
  state.type = type
  state.cover = cover
  // state.title = title
  // state.bottom = bottom
  // state.center = center
}

const onClosed = () => console.log('closed')

// 新增触发 POST 请求的方法
const triggerPostRequest = async () => {
  const customHeaders = {
    'Custom-Header': 'custom-value'
  }
  const postData = {
    key: 'value'
  }
  try {
    const response = await getLoginModes()
    console.log('请求成功:', response)
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>
