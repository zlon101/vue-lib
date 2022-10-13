## Props

| Name      |    Type  | Default  | Describe |
| :-------- | :------ | :------- | :---     |
| data      | Array   |     -    | 选项数据 { value, (label | text), disable }  |
| select    | String, Boolean, Number  |     -    | 当地选中数据 |
| direction | String  |     -    | 选项排列方向 H 水平 V 垂直, (Tips: 大写) |
| disable   | Boolean |     -    | 是否整体禁用 |

##  事件

| Name | Describe|
| :--- | :---|
| change | 选中选项时触发，返回当前选中数据 |
