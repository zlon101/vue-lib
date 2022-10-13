> 路由跳转，可以在当前页面跳转也可以新开标签页跳转

## 使用

`this.$routerJump(route, param)`
- 参数 route 支持和 `$router.push` 相同的参数
- 参数 param 是个对象，默认值为： `{ blank: false, replace: false, event: {} }`， `blank` 表示是否新开标签页；
`replace` 表示是否替换当前路由记录；`event` 表示点击事件，当用户按住 `shift` 或其他功能键时使用
