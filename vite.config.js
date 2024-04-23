import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Markdown from 'vite-plugin-vue-markdown';
import eslintPlugin from 'vite-plugin-eslint';
// 调式插件
import VueDevTools from 'vite-plugin-vue-devtools';

const isProd = process.env.NODE_ENV === 'production';
const getAbsPath = relatePath => path.resolve(__dirname, relatePath);
console.log(`$ ${isProd ? '生产' : '开发'}环境`);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': getAbsPath('./src'),
      '@packages': getAbsPath('./packages'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    VueDevTools(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    vueJsx({
      include: /\.[jt]sx$/,
    }),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${getAbsPath('./packages/styles/var.less')}";`,
      },
    },
  },
  build: {
    // rollupOptions: {
    //   // https://rollupjs.org/configuration-options/
    // },
    outDir: 'docs',
  },
  server: {
    port: 9003,
    open: false,
    host: true,
  },
});
