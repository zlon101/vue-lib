**注意**

在后端分页列表中使用该组件时，当筛选条件变化调用接口更新列表数据时，必须在调用接口之前将当前页码置为1

## Props

| Name  |    Type  | Default  | Describe |
| :-----| :--------| :------- | :--- |
| options |   Array |  -  | 可选项列表，详情见下面 |
| value |   String|Number |  -  | 当前选中的值 |
| placeholder |   String |  请选择  | 提示语 |
| width |   String |  360px  | 宽度 |
| height |   String |  40px  | 高度 |
| padding |  String|Number |  24  | 内边距 |
| popupClass |  String |  xahhums2w3  | 弹层类名 |
| search |   Boolean |  false  | 是否可搜索 |
| searchPlaceholder |   String |  搜索  | 搜索框提示语 |


##  事件
| Name | Describe|
| :--- | :---|
| input | 切换选中项 |
| change | 切换选中项 |
