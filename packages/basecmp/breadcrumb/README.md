## Props

无

## 事件

无

## 备注

如果面包屑中需要显示动态文本，如："某某的用户详情"，将 router 配置中的 meta.title 设置为 "\<bs\>的用户详情"。

并且，在跳转到该页面时添加 `bs` 参数使用 `this.$router.push({ name:'xx', query: { bs: '张三' } })`
