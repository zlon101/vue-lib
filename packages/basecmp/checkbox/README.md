# checkbox 组件

## props

| Name         | Tpye           | Default  | Describe                                         |
|:-------------|:---------------|:---------|:-------------------------------------------------|
| status       | String、Boolean | -        | 必填项, 复选框的状态, 取值有: false、true、'all'、'none'、'some' |
| disabled     | Boolean        | false    | 不可点击                                             |
| disabledTips | String         | ''       | 不可点击的提示语                                         |

## 事件

| 名称             | 描述                               |
|:---------------|:---------------------------------|
| update:status  | 更新status，动态绑定(:status.sync="xx") |
| change         | 更新status                         |

## slot

| 名称      | 描述    |
|:--------|:------|
| default | 默认插槽  |

# CheckboxGroup 组件

## props

| Name      | Tpye     | Default   | Describe                                         |
|:----------|:---------|:----------|:-------------------------------------------------|
| options   | Array    | -         | 必填项, 每项的属性有id、lable、status、disabled、disabledTips |
| checkeds  | Array    | undefined | 已选中的id列表                                         |
| vertical  | Boolean  | false     | 是否垂直布局                                           |
| margin    | String   | '16px'    | 水平布局时复选框左右间距，垂直布局时上下间距                           |

## 事件

| 名称              | 描述                   |
|:----------------|:---------------------|
| update:options  | 更新 options           |
| update:checkeds | 更新checkeds           |
| change          | 与 update:checkeds 相同 |
