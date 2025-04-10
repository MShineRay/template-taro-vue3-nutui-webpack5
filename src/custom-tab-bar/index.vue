<template>
  <nut-tabbar v-model="selected">
    <nut-tabbar-item
      v-for="(item, index) in list"
      :key="index"
      :tab-title="item.text"
      @click="switchTab(index, item.pagePath)"
    >
      <template #icon>
        <img
          :src="selected === index ? item.selectedIconPath : item.iconPath"
          alt=""
          srcset=""
        />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { computed } from 'vue'
import { useStore } from '@/stores'

import user_default from '@/assets/icons/user_default.png'
import user_selected from '@/assets/icons/user_selected.png'

const app = useStore('app')
const selected = computed(() => app.tabbar)

const list = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: user_default,
    selectedIconPath: user_selected
  },
  {
    pagePath: '/pages/activity/index',
    text: '活动'
  },
  {
    pagePath: '/pages/course/index',
    text: '课程'
  },
  {
    pagePath: '/pages/my/index',
    text: '我的'
  },
  {
    pagePath: '/test/index',
    text: '测试'
  }
]

const switchTab = (index, url) => {
  setSelected(index)
  Taro.switchTab({ url })
}

const setSelected = (index) => {
  app.changeTabbar(index)
}
</script>

<style lang="scss"></style>
