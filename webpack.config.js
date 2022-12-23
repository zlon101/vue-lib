// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const serverMiddle = require('./plugin/server-middle.js');

const isProd = process.env.NODE_ENV === 'production';
console.log(`$ ${isProd ? '生产' : '开发'}环境`);

const getAbsPath = relatePath => path.resolve(__dirname, relatePath);

// const stylesHandler = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

const commonCfg = {
  mode: 'development',
  // 运行上下文，默认为 nodejs 当前工作目录
  context: getAbsPath('./'),
  entry: './src/main.js',
  output: {
    publicPath: isProd ? './' : '/',
    path: getAbsPath('docs'),
    filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
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
      // {
      //   test: /\.less$/i,
      //   use: [stylesHandler, 'css-loader', 'less-loader'],
      // },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
      // {
      //   test: /\.svg$/,
      //   use: 'file-loader'
      // },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // make all svg images to work in IE
            iesafe: true,
            limit: 4096, // 4Kb
          },
        },
      },
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
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
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
    // before: serverMiddle,
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
    }
  },
};

module.exports = (env) => {
  console.log('\n env:', env);
  let dstCfg = null;
  if (isProd) {
    dstCfg = { ...commonCfg, ...prodCfg };
    dstCfg.plugins.push(new MiniCssExtractPlugin({
      filename: 'assets/[name]-[hash:8].css',
      chunkFilename: 'assets/[name]-[hash:8].css',
      ignoreOrder: true
    }));
  } else {
    dstCfg = { ...commonCfg, ...devCfg };
  }
  return dstCfg;
};
