// import json from '@rollup/plugin-json';
// import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'rollup/index.js',
  output: {
    file: 'rollup/bundle.js',
    format: 'es', // amd, cjs, es, iife, umd, system
  },
  /**
  output: [
    {
      file: 'bundle.js',
      format: 'cjs',
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()], // 压缩
    },
  ],**/
  /**
  plugins: [
    // 解析三方npm包
    resolve({
      // pass custom options to the resolve plugin
      moduleDirectories: ['node_modules'],
    }),
    // 解析json文件
    json(),
  ],**/
  // indicate which modules should be treated as external
  // external: ['lodash', 'vue'],
};

// 打包 npx rollup -c config.js
