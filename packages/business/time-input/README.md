## Props

| Name  |    Type  | Default  | Description |
| :-----| :--------| :------- | :--- |
| value |   Object<start, end> |     -    | 输入的时间范围{ start: {hour: '', min: ''}, end: {hour: '', min: ''} } |

### 事件

| Name  | Description |
| :-----| :--- |
| input | 修改选择标签后触发，返回开始和结束时间{ start, end } |
| blur  | 输入框失去焦点后触发，返回开始和结束时间{ start, end } |

