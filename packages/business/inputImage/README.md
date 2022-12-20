## Props

| Name      |    Type  | Default  | Description |
| :-------- | :------ | :------- | :---     |
| value     | String  |     -    | 图像的base64  |
| maxSize   | Number  |     3    | 图像尺寸大小，默认单位MB |
| desc      | String  |     -    | value为空时生效，描述内容 |
| width     | String  |     -    | 组件尺寸 |
| height    | String  |     -    | 组件尺寸 |
| errMsg    | String  |     -    | 报错信息 |
| hideErrMsg| Boolean |     -    | 隐藏报错信息 |
| disabled  | Boolean |     -    | 是否禁用 |

##  事件
| Name | Description|
| :--- | :---|
| input | 上传成功或者删除时触发，返回图片base64和图片信息 |
| error | 上传图片报错时触发，返回报错信息 |

## Slot
| Name     | Description |
| :------- | :------- |
| default      | 主要内容  |
| empty    | 数据为空时显示的内容 |
