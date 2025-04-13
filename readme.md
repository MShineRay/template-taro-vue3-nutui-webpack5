# template-taro-vue3-nutui-webpack5

## 开发
~~~bash
pnpm i # 安装依赖
pnpm dev:weapp # 本地启动微信小程序
使用微信开发者工具打开dist目录
~~~

~~~bash
pnpm build:weapp #生产打包
使用微信开发者工具打开dist目录，点击上传发布
~~~

## 设计
~~~html
图片尺寸16:9 比例尺寸 (宽 × 高)：
16 × 9
32 × 18
48 × 27
64 × 36
80 × 45
96 × 54
112 × 63
128 × 72
144 × 81
160 × 90
176 × 99
192 × 108
208 × 117
224 × 126
240 × 135
256 × 144
272 × 153
288 × 162
304 × 171
320 × 180
336 × 189
352 × 198
368 × 207

应用场景：
- 对于新闻列表中的缩略图，可以选择中等尺寸如128×72或144×81
- 对于详情页的大图，可以选择更大的尺寸如256×144或288×162
- 对于轮播图，可以选择最大的尺寸如368×20
~~~

## 技术栈
- taro
- vue3
- nutui-vue
- pinia
- scss
- webpack5
## 技术栈资料
- [taro](https://docs.taro.zone/docs/)
  - [Taro 使用原生模块](https://docs.taro.zone/docs/hybrid)
  - [Taro 模式和环境变了 TARO_APP_XXXXXXX](https://docs.taro.zone/docs/env-mode-config)
  - [Taro 微信小程序自定义Tabbar](https://docs.taro.zone/docs/custom-tabbar)
    - [微信小程序自定义 TabBar（Vue3）](https://github.com/NervJS/taro/tree/next/examples/custom-tabbar-vue3)
- [nutui-vue](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro)
  - [nutui-vue组件](https://nutui.jd.com/taro/vue/4x/#/zh-CN/component/button)
- [vue3](https://vuejs.org/)
- [pinia](https://pinia.vuejs.org/)
- [scss](https://sass-lang.com/)
- [webpack5](https://webpack.js.org/)
- rich-text
  - [mp-html](https://github.com/jin-yufeng/mp-html)
- [渲染html](https://nervjs.github.io/taro-docs/docs/html)
  - @tarojs/taro/html.css: W3C HTML4 的内置样式，只有 HTML4 标签样式，体积较小，兼容性强，能适应大多数情况。
  - @tarojs/taro/html5.css: Chrome(Blink) HTML5 的内置样式，内置样式丰富，包括了大多数 HTML5 标签，体积较大，不一定支持所有小程序容器。
- [tailwindcss](https://www.tailwindcss.cn/docs/margin)
- [微信小程序view设置margin-top和margin-button无效的解决方案](https://blog.csdn.net/qq_46170459/article/details/136107666)
- [微信小程序底部内容被底部tabbar遮挡](https://juejin.cn/post/6922840522767728648)

## TODO
- [公共]自定义tabbar避免被iphone底部横条遮挡
- [首页]右侧按钮大小、颜色适配
- tailind
- NutUI Icon 不生效 https://nutui.jd.com/taro/vue/4x/#/zh-CN/component/icon
- style 添加scope后不生效？

## 协议
MIT
