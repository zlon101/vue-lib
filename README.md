<h1 style="text-align:center">npm 组件库</h1>

- [ ] gitlab Hook 自动上传到服务器？
- [x] ie浏览器测试图标是否正常

## [example](https://zlon101.github.io/npm-lib/#/)

----------------------------------------------------------------

<h1 style="text-align:center">私有源部署文档</h1>

## 1. 安装环境

**安装 nvm**
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

**安装 nodejs、pm2、verdaccio**
```shell
nvm install 16.16.0
npm install -g verdaccio@5.18.0
npm install -g pm2@5.2.2
```
## 2.在服务器上运行项目

> 作用
> 将项目部署到服务器上可以更方便预览组件、组件搜索、查看全局方法、查看全局样式，如果部署开发环境还可以编辑组件代码

### 部署静态版本

1. 执行 `npm run deploy`，将生成的 docs 目录上传到服务器上，用 nginx 以 docs 为静态资源文件运行站点
2. [ubuntu 设置nginx 开机自启](https://www.jianshu.com/p/15eee4d38184)

### 部署开发环境

1. 执行 `npm run deploy`：将项目代码上传到服务器上，在服务器上项目目录下执行 `npm install`
2. 执行 `npm link:all type=c`：创建本地软链接
3. 执行 `npm run start`：运行 vue-cli-service 和 verdaccio
4. 执行 `pm2 startup && pm2 save`：设置开机自启

## 3. 创建账号

由管理员创建账号，然后将账号分发给成员

```shell
npm adduser --registry  http://private-address (私有源地址)
```

账号创建之后修改配置文件，禁止其他用户添加账号

```shell
vim /<user-dir>/.config/verdaccio/config.yaml
// 修改 auth.max_users 为 -1，禁止匿名用户添加账号
```

## 4.删除账号

```shell
vim /<user-dir>/.config/verdaccio/htpasswd
// 删除对应账号名所在行
```

## 5.用户登录

```shell
npm login --registry=http://private-address --scope=@private-scope (组件前缀)
npm config set @private-scope:registry http://private-address
```

> 安装私有组件和发布私有组件都需要先在本机登录管理员提供的账号
> 上一步会将 @private-scope 与 指定的私有源关联，所有 @private-scope/xx 组件的安装和发布都从私有源上安装、发布到私有源。本地不需要切换 registrym, 也不影响其他 npm、ant-design 源的使用。


# pm2

当前使用 pm2 管理服务器上的 verdaccio 和 vue-cli-service 进程

常用 pm2 命令：

> app指pm2创建的项目名，现在有 picNpm 和 verda

- pm2 -h： 查看pm2帮助信息，显示命令用法
- pm2 list： 显示所有项目
- pm2 show app： 显示应用程序的所有信息
- pm2 stop app： 停止应用服务
- pm2 restart app： 重启应用服务
- pm2 delete app： 在进程中删除应用
- pm2 status： 查看状态
- pm2 monit： 查看占用的CPU和内存
- pm2 startup：设置开机自启
- pm2 unstartup：取消开机自启

----------------------------------------------------------------

<h1 style="text-align:center">组件库开发规范</h1>

## Git 规范

git commit 会触发 pre-commit 钩子，对暂存区中的文件进行 eslint 检查，并且执行 scripts/check-package.js 脚本检查组件的 README.md 和 package.json 文件，还会删除项目根目录中的 package.json 中 dependencies、devDependencies 中版本号前面的 ^、~ 等，避免依赖自动升级。

## 开发规范

- 首次执行 `npm install` 后，需要执行 `npm run link:all type=c`（注：不要在 Webstorm 的终端中执行，IDE 会执行 npm install）
- `scripts/cfg.js` 中配置和项目相关的信息，包括 private-address、private-scope
- 组件的 package.json 中 name 字段必须以 `@zl/` 为前缀，并且必须配置 publishConfig 字段
- 组件 A 使用组件 B 时，在 A 的 package.json 中将组件 B 配置到 `dependencies` 字段，并在 A 的 packages.json -> scripts.link-local 中添加命令（参考已有示例）
- 组件的 example 写法参考 button 组件写法，只需要修改 example/index.vue 中的 `compPath` 参数。

> 组件发布

组件开发完成，需要发布时在组件目录下执行

```shell
npm publish
```

若没有登录到私有源则先执行

```shell
npm login --registry=http://private-address --scope=@private-scope
```

> 删除已经发布到私有源上的组件

```shell
npm unpublish @zl/xxx --force
```

> 本地测试组件

- 在测试项目根目录执行 `npx link <组件路径>`
- 不用发布组件，其他项目中组件的代码会同步更新

> 组件安装

其他项目需要安装私有组件时，先登录，然后执行

```shell
npm install @zl/xx
```

> 可执行命令

- `npm run predev`: 锁定项目根目录中 package.json 中的依赖版本，压缩所有 svg 文件，生成 icon 组件和 iconfont 样式（运行 `npm run dev` 时会自动执行该命令）
- `npm run minSvg`: 压缩 scr 目录下的所有 svg 文件
- `npm run build:icon`: 生成 icon 组件和 iconfont 样式文件
- `npm run edit:pkg`: 修改指定目录下所有 package.json 配置，默认修改 `name` 和 `publishConfig` 字段，也可以用参数指定其他字段
- `npm run scripts/edit-package.js`: 可以批量将修改组件的 package.json 中的 name 和 publishConfig 字段
- `npm run link:all`: 执行 packages 目录下所有组件内部的 npm run link-local，为所有组件的依赖创建本地软链接
- `npm run update:registry`: 批量 publish 或 unpublish 指定目录下的组件
- `npm run create:comp`: 已 packages/template 为模板创建新的组件

## 图标

- 图标用svg格式，公共图标放在 packages/components/icon/assets，不需要共享的图像放在组件自己的目录下
- svg文件的名称用小写加'-'命名
- 执行 `npm run minSvg` 会压缩 packages/ 目录下的所有 svg 文件，执行 `npm run build:icon` 自动在 components/icon 下生成图标组件和 icon-font 资源，图标组件的名称是svg文件名的大驼峰形式，如 icon-fold => IconFold。icon-font 的 css 类名和文件名一样。
- svg 图像的使用有2种形式，具体查看 icon 组件的 example
  1. 组件: `<IconFold />`
  2. icon-font: `<span class="iconfont icon-fold"></span>`

## 使用该组件库开发其他业务项目

- 业务项目依赖的包最好和组件库中的依赖使用相同版本（直接复制组件库中的 package.json、package-lock.json 和 vue.config.js 文件）
- 在 `src/main.js` 中引入全局样式 `import '@zl/style';`
- 执行 `vue add style-resources-loader` 并配置 `vue.config.js`
  ```javascript
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './node_modules/@zl/style/var.less')],
    },
  },
  ```

## 其他

- vue-template-compiler 和 vue 的版本必须保持一样
- husky 版本不能更新
- vue-loader vue-markdown-loader 版本不能更新
- style-resources-loader vue-cli-plugin-style-resources-loader 用作导入全局less
- 使用该组件库开发其他项目时，项目的依赖 dependencies、devDependencies 和 vue.config.js 最好和该组件库一样

> 备注：部分组件代码质量低（特别是从三方库抄过来的组件），但是因为已经有很多地方在使用，修改难度太高。若有一天项目组有多余的人力、物力建议重新建立一个比较稳定的组件库。

## Q

> 使用场景：项目 A 使用 @zl 组件库进行开发

1. 项目A 使用编译后的组件代码开发，不用关心组件的依赖（包括样式变量），但是项目A 编译生成的代码可能包含不需要的代码，特别是 @zl/icon 和 @zl/tool 这类会 `export` 很多独立模块的 npm 包。
2. 项目A 使用组件源码（未编译）代码开发，可以解决第一条问题，但是需要在组件的 package.json 中声明依赖（dependencies、peerDependencies），当组件内使用了@zl/style/var.less 中的变量，需要在组件内引入该文件，或者在项目A中配置style-resources-loader
