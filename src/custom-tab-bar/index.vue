<template>
  <!-- https://nutui.jd.com/taro/vue/4x/#/zh-CN/component/tabbar -->
  <nut-tabbar bottom safe-area-inset-bottom placeholder v-model="selected" unactive-color="#7d7e80"
    :active-color="themeColor">
    <nut-tabbar-item v-for="(item, index) in list" :key="item.pagePath" :tab-title="item.text"
      @click="switchTab(index, item.pagePath)">
      <template #icon>
        <img :src="selected === index ? item.selectedIconPath : item.iconPath" alt="" srcset="" />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import { useStore } from '@/stores';

import home_default from '@/assets/icons/home_default.svg';
import home_selected from '@/assets/icons/home_selected.svg';
import activity_default from '@/assets/icons/activity_default.svg';
import activity_selected from '@/assets/icons/activity_selected.svg';
import course_default from '@/assets/icons/course_default.svg';
import course_selected from '@/assets/icons/course_selected.svg';
import my_default from '@/assets/icons/my_default.svg';
import my_selected from '@/assets/icons/my_selected.svg';
import { THEME_COLOR } from '../assets/styles/config';

const app = useStore('app');
const selected = computed(() => app.tabbar); // 默认选中第二个tab 首页
const themeColor = THEME_COLOR;
const list = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: home_default,
    selectedIconPath: home_selected,
  },
  {
    pagePath: '/pages/activity/index',
    text: '活动',
    iconPath: activity_default,
    selectedIconPath: activity_selected,
  },
  {
    pagePath: '/pages/course/index',
    text: '课程',
    iconPath: course_default,
    selectedIconPath: course_selected,
  },
  {
    pagePath: '/pages/my/index',
    text: '我的',
    iconPath: my_default,
    selectedIconPath: my_selected,
  },
  // {
  //   pagePath: '/test/index',
  //   text: '测试',
  // },
];

const switchTab = (index, url) => {
  setSelected(index);
  Taro.switchTab({ url });
};

const setSelected = (index) => {
  app.changeTabbar(index);
};
</script>

<style lang="scss">
// .custom-tab-bar {
//   padding-bottom: constant(safe-area-inset-bottom);
//   /* iOS < 11.2 */
//   padding-bottom: env(safe-area-inset-bottom);
//   /* iOS >= 11.2 */
//   // position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 999;
//   // height: calc(10px + env(safe-area-inset-bottom));
//   background-color: #fff;
//   /* 50px是基础高度 */
//   /* 其他样式... */

//   position: absolute;
//   // bottom: 0;
//   // left: 0;
//   // right: 0;
//   // height: 80px;
//   // background: white;
//   display: flex;
//   flex-direction: row;
//   // padding-bottom: env(safe-area-inset-bottom);
//   pointer-events: auto;
// }</style>
