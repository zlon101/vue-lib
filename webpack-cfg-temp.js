const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const json5 = require('json5');

const IsPro = process.mode === 'production';
console.log('🔥环境: ', process.env.NODE_ENV);

module.exports = {
  /*************************
   * 如果配置文件或命令行没有设置 mode 的值，会使用 NODE_ENV 的值作为 mode
   * 例如 --node-env production 时，会把 process.env.NODE_ENV 和 mode 均设置为 'production'
   * production development
   * ************************/
  mode: 'production',
  /*****************************
   * 一个 entry 对应一个 html 页面，一个 entry 就是 SPA
   * ***********/
  entry: {
    index: './src/index.js',
    /************
    不同入口的 chunk 间共享代码
    print: './src/print.js',
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
    ******/
  },
  output: {
    publicPath: '/',
    // name 对应 entry 对象的 key
    filename: IsPro ? '[name].[contenthash:8].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // 每次编译时删除旧的 dist
    clean: true,
    // 禁用在 output bundle 中生成路径信息
    pathinfo: false,
    // 文件路径 => http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
    /** 库开发（非应用）配置
    globalObject: 'this',
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },  **/
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  // externals: [/^library\/.+$/],

  /***
  optimization: {
    一个 html 文件中有多个 js 入口时 runtimeChunk: 'single'
    运行时配置为 `runtimeChunk: true`,
    runtimeChunk: 'single',
    提取公共依赖 => https://webpack.js.org/guides/code-splitting/#splitchunksplugin
    splitChunks: {
      chunks: 'all',
    },
  },**/
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 9101,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // 使用 include 字段只在指定的目录中应用 loader
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        /****************************************
         * 效果: js 文件中导入 import './style.css'
         * 将 css 已 <style> 插入到 <head> 中
         * ******************************************/
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        /**
         * import MyImage from './my-image.png'
         * css-loader => url('./my-image.png')
         * html-loader => <img src="./my-image.png" />
         */
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      /**
      {
        test: /\.json5$/i,
        type: 'json',
        // 自定义解析器
        parser: {
          parse: json5.parse,
        },
      }, **/
    ],
  },
};

/**************************
想使用环境变量，必须用函数形式
module.exports = (env, argv) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.development); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
***********************/
