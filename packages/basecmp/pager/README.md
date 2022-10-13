**注意**

在后端分页列表中使用该组件时，当筛选条件变化调用接口更新列表数据时，必须在调用接口之前将当前页码置为1

## Props

| Name  |    Type  | Default  | Describe |
| :-----| :--------| :------- | :--- |
| value |   Number |  1  | 页数 |
| total |   Number |  0  | 页码总数 |
| pageSize |   Number |  10  | 每页的显示的数据量 |
| changeRouter |   Boolean |  true  | 根据url上的页码参数初始化 |
| routeName |   String |  page  | url上的页码参数名称，changeRouter为true生效 |
| scrollWrap |   String，Object |  -  | 滚动容器 css选择器或者dom元素 |

##  事件
| Name | Describe|
| :--- | :---|
| input | 页数发生变化时触发，当前页数 |
| change | 页数发生变化时触发，当前页数 |
| changePageSize | pageSize更改时触发，返回报错信息 |
