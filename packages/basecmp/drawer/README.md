## Props

| Name  |    Type  | Default  | Description |
| :-----| :--------| :------- | :--- |
| title | String |  -  | 标题 |
| mode  |   String |  rl  | 一共四种模式对应的方向缩写 tb | bt | lr | rl |
| size | String | 446px  | 设置对应模式下得宽或高，不带单位默认px |
| maskClosable | Boolean | false | 点击遮罩是否可以关闭 |
| escKeyClosable | Boolean | false | 按键esc是否可以关闭 |

### Slot
| Name     | Description |
| :-------- | :--------|
| title | 自定义标题内容,将会导致参数title无效 |
| footer | 自定义底部内容 |
| default  | 自定义抽屉内容 |

### 方法
| Name     | Description |
| :-------- | :--------|
| close     | 关闭 |
