## 说明

Toast为单例，重复调用会重置Toast状态。
默认会有1.5s的超时时间，如果不需要超时，需手动维护一下toast状态

## 参数

| Name      |    Type  | Default  | Describe |
| :-------- | :--------| :------- | :--- |
| type     | String |  success | toast类型，可选success,warning,error |
| text      |   String |  -  | 提示文字 |
| icon      |   String |  -  | 自定义icon的class |
| timeout | Number | 15000 | 超时时间 |

### 方法
| Name     | Describe |
| :-------- | :--------|
| close     | 关闭toast |
