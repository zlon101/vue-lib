/**
 * eslint 只做语法检查，不检查代码格式
 * eslint-config-prettier: 仅仅关闭与 prettier 冲突的规则，需要与其他配置一起使用
 * eslint-plugin-prettier: Runs Prettier as an ESLint rule
 */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  // 继承基础配置(已有的规则集) [airbnb-base | eslint:recommended]
  // 省略 eslint-config 前缀
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  // 插件名称省略 eslint-plugin 前缀
  plugins: ['vue'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    // 0:off 1:warn 2:error
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 'error', // 禁用var
    'no-unused-vars': [2, { args: 'none' }], // 消除未使用的变量  不检查函数的参数
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
    'no-underscore-dangle': 0, // 允许下划线开头结尾
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    semi: ['error', 'always'],
    quotes: [2, 'single'],
    camelcase: 0,
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制使用全等
    'vue/multi-word-component-names': 'off',
    // 关闭 prettier/prettier 语法报错
    'prettier/prettier': 'off',
  },
  // 配置全局变量
  globals: {
    window: 'writable',
    process: 'readonly'
  }
};
