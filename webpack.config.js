// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const serverMiddle = require('./plugin/server-middle.js');

const isProd = process.env.NODE_ENV === 'production';
console.log(`$ ${isProd ? '生产' : '开发'}环境`);

const getAbsPath = relatePath => path.resolve(__dirname, relatePath);

const commonCfg = {
  mode: 'development',
  // 运行上下文，默认为 nodejs 当前工作目录
  context: getAbsPath('./'),
  entry: './src/main.js',
  output: {
    publicPath: isProd ? './' : '/',
    path: getAbsPath('docs'),
    filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
    assetModuleFilename: 'assets/[contenthash:8][ext][query]',
    clean: true,
    pathinfo: false,
  },
  resolve: {
    alias: {
      '@': getAbsPath('./src'),
      '@packages': getAbsPath('./packages'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.vue'
    ]
  },
  plugins: [
    new DefinePlugin({
      // enable/disable Options API support, default: true
      __VUE_OPTIONS_API__: true,
      // enable/disable devtools support in production, default: false
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      title: 'npm lib',
      template: 'public/index.html',
    }),
    new VueLoaderPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, getAbsPath('./src')],
        include: getAbsPath('./packages/business/react-image-editor'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: getAbsPath('./packages/business/react-image-editor'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@vue/cli-plugin-babel/preset'],
          },
        }
      },
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          isProd ?
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 图像和css输出目录为同一级
                publicPath: '../',
              },
            }
            : 'vue-style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                getAbsPath('./packages/styles/var.less'),
              ]
            }
          }
        ]
      },
      /******
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.svg/,
        exclude: getAbsPath('packages/basecmp/icon'),
        use: {
          loader: 'svg-url-loader',
          options: {
            // make all svg images to work in IE
            iesafe: true,
            limit: 4096, // 4Kb
          },
        },
      },***/
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
    ],
  },
};

// 开发环境
const devCfg = {
  stats: 'errors-only',
  // 取值: source-map、eval
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    host: 'localhost',
    port: '7120',
    // 解决单页面应用，在某个路径下刷新页面时404
    historyApiFallback: true,
    /***
    setupMiddlewares: function (middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      serverMiddle(devServer.app);
      return middlewares;
    },**/
  },
};

// 生产环境
const prodCfg = {
  mode: 'production',
  devtool: 'eval',
  optimization: {
    runtimeChunk: 'single',
      splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
        }
      }
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = (env) => {
  console.log('$ env:', env);
  let dstCfg = null;
  if (isProd) {
    dstCfg = { ...commonCfg, ...prodCfg };
    dstCfg.plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name]-[fullhash:8].css',
      chunkFilename: 'css/[name]-[fullhash:8].css',
      ignoreOrder: true
    }));
  } else {
    dstCfg = { ...commonCfg, ...devCfg };
  }
  return dstCfg;
};
