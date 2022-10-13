'use strict';

const path = require('path');
const serverMiddle = require('./plugin/server-middle.js');

// 解析文件绝对路径
const resolveDir = dir => path.resolve(__dirname, dir);

module.exports = {
  publicPath: '/',
  outputDir: resolveDir('./docs'),
  productionSourceMap: false,
  // 不分离组件css
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      // webpack4 无效
      mainFields: ['module', 'exports', 'main', 'browser'],
      alias: {
        '@packages': resolveDir('packages'),
      },
    },
    module: {
      unknownContextCritical: false,
      // noParse: /\.md$/,
      // @vue/cli-service 内置的rules要在 chainWebpack 中修改
      // https://cli.vuejs.org/guide/webpack.html
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './packages/styles/var.less')],
    },
  },
  chainWebpack: config => {
    config.module.rule('md').test(/\.md/).use('vue-loader').loader('vue-loader').end()
      .use('vue-markdown-loader').loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });
    // 图像
    // config.module.rule('images').use('url-loader').loader('url-loader')
    //   .tap(options => Object.assign(options, { limit: 200 }));
    // svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    // 编码为utf-8，体积更小
    svgRule.use('svg-url-loader').loader('svg-url-loader').options({
      iesafe: true,
      limit: 4096, // 4Kb
    });
    // 编码为base64
    // svgRule.use('url-loader').loader('url-loader').options({ limit: 200 });
  },
  devServer: {
    port: '9810',
    before: serverMiddle,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};


// entry: './src/basecmp/button/index.js',
// output: {
//   filename: 'js/[name]-[hash:6].js',
//   chunkFilename: 'js/[name]-chunk-[hash:6].js',
// },
// 本地运行注释
// externals: ['vue'],
// optimization: {
//   splitChunks: {
//     chunks: 'all',
//   },
//   runtimeChunk: 'single',
//   splitChunks: {
//     cacheGroups: {
//       vendor: {
//         test: /[\\/]node_modules[\\/]/,
//         name: 'vendors',
//         chunks: 'all',
//       },
//     },
//   },
// },
// rules: [
//   {
//     test: /\.(gif|png|jpe?g|svg)$/i,
//     use: [
//       'file-loader',
//       {
//         loader: 'image-webpack-loader',
//         options: {
//           // disable: true,
//           mozjpeg: {
//             enabled: false,
//           },
//           svgo: {
//             multipass: true,
//             datauri: 'base64', // 'base64' (default), 'enc' or 'unenc'.
//             js2svg: {
//               indent: 2, // string with spaces or number of spaces. 4 by default
//               pretty: true, // boolean, false by default
//             },
//           },
//         },
//       },
//     ],
//   },
//   config.module.rule('svg').exclude.add(selfResolve('src/icons')),
// ],
