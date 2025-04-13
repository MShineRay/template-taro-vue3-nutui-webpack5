// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'vue3',
      ts: false,
      compiler: 'webpack5',
      'dynamic-import-node': true,// dynamic-import https://docs.taro.zone/docs/dynamic-import
    }]
  ],
  // plugins: [
  //   ['@babel/plugin-proposal-decorators', { legacy: true }],
  //   ['@babel/plugin-proposal-class-properties', { loose: true }]
  // ]
}
