## Props

| Name      |    Type  | Default  | Description |
| :-------- | :--------| :------- | :---     |
| disable   | Boolean  |          | 是否禁用   |
| text      | String   |  点我下拉  | 文本展示内容 |
| options   | Array    |          | 弹出层的数据 (['xx', 'xxx'] | [{ name: 'xxx', color: 'res' }]) |
| hover     | Boolean  |          | 鼠标悬浮触发弹出层 |
| color     | String   |  #3A51E0 | 展示层的color，影响text |
| equalWidth | Boolean |          | 下拉框是否和展示内容等宽 |
| popupHeight | String |  auto    |  弹出层高度，等同style中的height |
| textAlign | String   |  center  |  弹出层文本对齐方式，等同style中的textAlign |
| popupClass | String  |  center  |  弹出层类名 |
| autoClose | Boolean  |  true    |  点击其他地方自动关闭弹出层 |
| autoOpen | Boolean   |          |  弹出层默认打开或者关闭 |

### 事件
| Name | Description|
| :--- | :---|
| change | 选中项发生更改时触发，返回当前选中的值 |
| changeVisible | 选弹出层的状态更改时触发，返回当前状态和当前组件的的元素 |
| switchPopup | 点击展示层的内容触发，返回弹出层的状态 |

### Slot
| Name     | Description |
| :------- | :------- |
| -        | 展示层内容  |
| icon      | 展示层图标 |
| options     | 弹出层内容 |
| footer     | 弹出层底部内容  |
