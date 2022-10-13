##  参数

| Name  |    Type  | Default  | Describe |
| :-----| :--------| :------- | :--- |
| value | String,Number | - | 双向绑定的值 |
| search | Boolean | - | 是否显示搜索按钮 |
| clean | Boolean | - | 是否显示清空按钮 |
| copy | Boolean | - | 是否显示复制按钮 |
| cleanBlank | Boolean | - | 失焦是否清楚输入内容两侧空格|
| type | String | text | 输入框类型 可选：`text`,`number`,`password`,`textarea`, `num`, num取消了number的原生效果，用正则规定只能输入数字 |
| min | Number | - | 限制可输入的最小值，仅在type为`numebr`时有效 |
| max | Number | - | 限制可输入的最大值，仅在type为`number`时有效 |
| showCount | Boolean | false | 是否显示字数统计 |
| size | String | large | 尺寸 可选：`large(l)`,`small(s)`|
| 其他同原生Input属性

## 事件

| Name | Describe|
| :--- | :---|
| change | 选中项发生更改时触发，返回当前选中的值 |
| focus | 获得焦点时触发 |
| blur | 失去焦点时触发 |
| clean | 点击清空按钮时触发 |
| search | 点击搜索按钮时触发 |
| inputChange | 原生input事件 |

## 插槽
| Name | Describe |
| :--- | :--- |
| - | 输入框右侧区域|
