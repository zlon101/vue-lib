## Props

| Name      |    Type  | Default  | Describe |
| :-------- | :--------| :------- | :---     |
| placement   | String  |  bottom    | 提示框位置，可选值有：top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end |
| content   | String  |  -    | 提示框内容 |
| delay   | Number  |  100    | 延迟时间 |
| disabled   | Boolean  |  false    | 是否禁用 |
| controlled   | Boolean  |  false    | 手动控制弹窗消失 |
| always   | Boolean  |  false    | 一直显示 |
| transfer   | Boolean  |  true    | 是否将弹窗dom移动到body下面 |
| theme   | String  |  dark    | 主题，可选值有：dark、light、notOpacity、darkDeep |
| maxWidth   | String|Number  |  434    | 弹窗最大宽度 |
| width   | Number  |  -    | 弹窗宽度 |
| showIfOverflow   | Boolean  |  true    | 是否在文本溢出时才生效 |
| popCls   | String  |  -    | 弹窗的class |
| baseIndex   | String  |  250    | 弹窗的 z-index 属性值 |

## Slot

| Name        | Default  | Describe |
| :-------- | :------- | :---     |
| content   | -  | 弹窗内容   |
| default   | -  | 默认子节点，必填 |
