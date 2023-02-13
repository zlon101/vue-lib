## Props

| Name          | Type         | 必填    | Default | Description                                                                   |
|:--------------|:-------------|:------|:--------|:------------------------------------------------------------------------------|
| value         | Array/String | 否     | -       | 当前选中的值，如果父级需要指定选中的值，传入字符串类型的[uid]值。当用户点击会向父级传递数组类型的值。                         |
| root          | Object       | 是     | -       | 根节点                                                                           |
| uid           | String       | 是     | -       | 可选项的唯一标识字段                                                                    |
| labelKey      | String       | 是     | -       | UI显示时使用可选项的哪个字段                                                               |
| zIndex        | String       | 否     | 100     | 弹窗的 z-index 值                                                                 |
| joinSym       | String       | 否     | `/`     | UI 显示时使用的连接符                                                                  |
| showRootLabel | Boolean      | 否     | false   | 是否显示根节点                                                                       |
| placeholder   | String       | 否     | 请选择     | 输入框提示语                                                                        |



## 事件

| Name  | Description        |
|:------|:-------------------|
| input | 点击每项时触发，参数为包含父级的数组 |

