export default {
  navigationBarTitleText: '首页',
  usingComponents:{
    // https://nervjs.github.io/taro-docs/docs/hybrid
    'mp-html': '../../components/mp-html/index'
  },
  copy: {
    patterns: [
      { from: 'src/components/mp-html/', to: 'dist/components/mp-html/'}
    ]
  },
}
