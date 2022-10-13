### 功能

使指定dom元素在页面滚动时固定在屏幕指定位置

- 兄弟节点以行内元素计算距离顶部高度，如需换行可在指令调用处使用v-sticky="{wrap:true}"
- 非兄弟节点以块级元素计算距离顶部高度，如需同一行可在指令调用处使用v-sticky="{wrap:false}"
- 自动计算距离顶部距离(上一个设置了指令的元素top值+元素高度)，可自行传入stickyTop设置高度
- sticky的元素z-index默认从10开始递减，请避免z-index冲突造成元素遮挡 可传入zIndex手动设置

### 注意事项

- 基础组件中使用请尽量让其自动计算,避免调用组件过于复杂

## 参数

|参数名 | 数据类型 | 描述 | 默认值|
|:--- | :--- | :--- | :---|
|disabled | Boolean | 是否禁用 | false |
|zIndex | Number | 指定元素z-index属性 | 随页面使用指令情况自行计算|
|stickyTop | Number | 指定元素top属性 | 随页面使用指令情况自行计算|
|wrap | Boolean | 强制是否换行 | 兄弟节点false，其他true|
