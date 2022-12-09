## 使用

将 svg 文件添加到当前 `assets` 目录下，在项目目录运行 `npm run minSvg && npm run build:icon` 生成 iconfont 和 icon 组件。iconfont 的 css 类名与文件名相同，icon 组件的名称是组件名的大驼峰形式。

## Props

| Name     | Type   | Default | Description                                                                     |
|:---------|:-------|:--------|:--------------------------------------------------------------------------------|
| s        | String | 16px    | 图标的宽度和高度                                                                        |
| w        | String | -       | 图标宽度                                                                            |
| h        | String | -       | 图标高度                                                                            |
| fill     | Object | -       | 指定 svg 中 fill 属性值，对象的 key 是某个 fill 出现的索引，如：`{1: red}` 指定第2个 fill 属性值为 red       |
| stroke   | Object | -       | 指定 svg 中 stroke 属性值，对象的 key 是某个 stroke 出现的索引，如：`{1: red}` 指定第2个 stroke 属性值为 red |
| idPrefix | String | ''      | 元素的Id属性值前缀，为了确保一个页面上Id属性值唯一性，Icon组件内已经进行了处理，如果还是出现Id属性值重复，则手动设置前缀               |
