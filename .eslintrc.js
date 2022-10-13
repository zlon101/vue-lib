/**
 * eslint 只做语法检查，不检查代码格式
 */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: false,
    es6: true,
  },
  // extends: [
  //   'plugin:vue/essential',
  //   '@vue/standard',
  // ],
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  plugins: ['vue', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 2, // 禁用var
    'no-unused-vars': [2, { args: 'none' }], // 消除未使用的变量  不检查函数的参数
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制使用全等
  },
};
