import { createApp } from 'vue';

// import './assets/styles/theme.scss';
import './assets/styles/global.scss';
import './app.scss';
// 引入所有组件的样式文件
// import "@nutui/nutui-taro/dist/style.css";
import { store } from '@/stores';

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(store);
export default App;
