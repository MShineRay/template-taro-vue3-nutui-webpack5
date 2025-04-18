import { defineConfig } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'
import NutUIResolver from '@nutui/auto-import-resolver'
import Components from 'unplugin-vue-components/webpack'

import path from 'path'


// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'template-taro-vue3-nutui-webpack5',
    date: '2025-4-3',
    designWidth (input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    alias:{
      '@tarojs/runtime': require.resolve('@tarojs/runtime'),
      '@/api': path.resolve(__dirname, '..','src/api'),
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils'),
      '@/package': path.resolve(__dirname, '..', 'package.json'),
      '@/project': path.resolve(__dirname, '..', 'project.config.json'),
      '@/stores': path.resolve(__dirname, '..', 'src/stores'),
      '@/assets': path.resolve(__dirname, '..', 'src/assets'),
      '@/services': path.resolve(__dirname, '..', 'src/services'),
      '@/theme': path.resolve(__dirname, '..', 'src/theme'),
      '@/pages': path.resolve(__dirname, '..', 'src/pages'),
      '@/config': path.resolve(__dirname, '..', 'src/config'),
      '@/constants': path.resolve(__dirname, '..', 'src/constants'),
      '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
      '@/mixins': path.resolve(__dirname, '..', 'src/mixins'),
      '@/directives': path.resolve(__dirname, '..', 'src/directives'),
      '@/filters': path.resolve(__dirname, '..', 'src/filters'),
    },
    sass: {
      // projectDirectory: path.resolve(__dirname, '..'),
      resource: [path.resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')],
      // 默认京东 APP 10.0主题 > @import "@nutui/nutui-taro/dist/styles/variables.scss";
      // 京东科技主题 > @import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";
      // 京东B商城主题 > @import "@nutui/nutui-taro/dist/styles/variables-jdb.scss";
      // 京东企业业务主题 > @import "@nutui/nutui-taro/dist/styles/variables-jddkh.scss";
      data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html', '@tarojs/plugin-http'],
    // 全局变量设置
    defineConstants: {},
    // 文件 copy 配置
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'vue3',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    // 小程序端专用配置
    mini: {
      enableSourceMap: false,
      postcss: {
        autoprefixer: {
          enable: true,
        },
        pxtransform: {
          enable: true,
          config: {
            // https://docs.taro.zone/docs/size
            // onePxTransform: true,
            // unitPrecision: 5,
            // propList: ['*'],
            // selectorBlackList: [],
            // replace: true,
            // mediaQuery: false,
            // minPixelValue: 0
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      // 自定义 Webpack 配置
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(
          Components({
            resolvers: [NutUIResolver({ taro: true })],
          })
        );

        chain.merge({
          plugin: {
            install: {
              plugin: require('terser-webpack-plugin'),
              args: [
                {
                  terserOptions: {
                    compress: true, // 默认使用terser压缩
                    // mangle: false,
                    keep_classnames: true, // 不改变class名称
                    keep_fnames: true, // 不改变函数名称
                  },
                },
              ],
            },
          },
        });
        // chain.plugin('copyRawComponent').use(new CopyWebpackPlugin({
        //   patterns: [{
        //     from: path.resolve(__dirname, '../src/components/mp-html'), // 源目录
        //     to: path.resolve(__dirname, '../dist/components/mp-html'),   // 目标目录
        //   }]
        // }))
        // chain.plugin('ignoreRawComponent').use(new IgnorePlugin({
        //   resourceRegExp: /mp-html/
        // }))
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        // https://docs.taro.zone/docs/size
        // pxtransform: {
        //   enable: true,
        //   config: {
        //     onePxTransform: true,
        //     unitPrecision: 5,
        //     propList: ['*'],
        //     selectorBlackList: [],
        //     replace: true,
        //     mediaQuery: false,
        //     minPixelValue: 0,
        //     baseFontSize: 20,
        //     maxRootSize: 40,
        //     minRootSize: 20
        //   }
        // }
      },
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(
          Components({
            resolvers: [NutUIResolver({ taro: true })],
          })
        );

        // chain.merge({
        //   optimization: {
        //     splitChunks: {
        //       cacheGroups: {
        //         styles: {
        //           name: 'styles',
        //           test: /\.(scss|css)$/,
        //           chunks: 'all',
        //           enforce: true,
        //         },
        //       },
        //     },
        //   },
        // });
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
