## Props

| Name      |    Type  | Default  | Description |
| :-------- | :--------| :------- | :--- |
| value     | Boolean |  false | 是否显示 |
| config    |   Object |  -  | 对话框配置 |


## Slot
| Name     | Description |
| :-------- | :--------|
| icon     | 对话框header图标，props.config.type 无法满足时使用，自定义图标 |
| title     | 对话框标题，当 props.config.title 无法满足时使用，自定义标题 |
| default     | 对话框 body 区域，当 props.config.desc | props.config.htmlDesc 无法满足时使用，自定义内容 |

## props.config 配置对象

```javascript
const defaultConfig = {
  type: 'query',
  title: '',
  desc: '',
  htmlDesc: '', // 不可以使用动态内容传入
  htmlDescStyle: '',
  width: '430px',
  cancel: '取消',
  cancelClass: '',
  cancelEvent: () => {},
  confirm: '确定',
  confirmClass: '',
  confirmColor: 'blue', // 确定按钮颜色，参数详情见Button组件
  confirmEvent: () => {},
  closeEvent: () => {}, // 任何手段关闭时触发，cancel和confirm都会触发
  reverse: false, // 调换button的位置，需要注意回车触发的为confirm事件
  column: false, // 按钮组调整样式
  buttonShow: true,
  maxHeight: 'none', // 插槽和htmlDesc内容的最大高度，用来做滚动需求
  autoClose: true, // 点击按钮或者回车后自动关闭
};
```
