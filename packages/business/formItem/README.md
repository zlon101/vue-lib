## Props
| 属性  | 类型  | 默认值  | 说明  |
| :--   | :--   | :--  | :-- |
| title | String |  空  | 左标题 |
| desc  | String/Array/Number | 空 | 左描述信息，配合miniDesc表示是否小字号显示 |
| miniDesc  | Boolean | false | 是否小字号显示左描述 |
| tips  | String | 空 | 右描述信息，配合titleTips，表示是否将tips显示为右标题，当tips不为空时，左边宽度固定 |
| titleTips | Boolean | false | 是否将右描述信息显示为右标题 |
| must |  Boolean | false | 是否显示必填星号 |
| num | String  | 空 | 标题前编号 |
| copy | Boolean  | false  | 描述信息，是否显示可以copy下划线 |
| error | String/Number | 空  | 错误信息 |
| marginB | String | 24 | 下边距 |
| paddingL | String | 空 | 左内边距 |

### Slot
| Name     | Describe |
| :------- | :------- |
| default      | 子元素  |
| icon      | 标题图标 |
