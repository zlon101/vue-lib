## Props

| Name          | Type                        | Default | Description                                                                                                  |
|:------------|:-------------------------- |:------ | :-------------------------------------------------------------------------------------------------------- | ----- | -------------- |
| value         | Boolean                     | String  | Number                                                                                                    | false | 选中时的返回值 |
| checked       | Array/String/Number/Boolean | false   | checkbox 的双向绑定，传入 Array 时包含 value 表示选中，为 Number/Boolean/String 时，与 value 相同表示选中 |
| disabled      | Boolean                     | false   | 是否禁用                                                                                                  |
| indeterminate | Boolean                     | false   | 用于展示中间状态 some，不影响 checked 绑定                                                                |
| size          | String                      | middle  | 尺寸可选 `small`,`middle`,`large`                                                                         |
| label         | String                      | -       | 标签                                                                                                      |

## Checkbox 事件

| Name   | Description            |
|:-------|:--------------------|
| change | 选中项发生更改时触发，返回当前选中的值 |

## Checkbox/CheckboxGroup 插槽

| Name | Description |
|:-----|:---------|
| -    | 标签       |

## CheckboxGroup 参数

| Name     | Type    | Default | Description                      |
|:---------|:--------|:--------|:------------------------------|
| value    | Array   | []      | 选中项的双向绑定                      |
| options  | Array   | []      | 可选配置，每一项最少包含{label,value}字段   |
| disabled | Boolean | false   | 是否禁用                          |
| min      | Number  | -       | 可选数量下限                        |
| max      | Number  | -       | 可选数量上限                        |
| size     | String  | middle  | 尺寸可选 `small`,`middle`,`large` |

## CheckboxGroup 事件

| Name   | Description         |
|:-------|:-----------------|
| input  | 在输入时触发 返回当前选中的值  |
| change | 在值变更时触发，返回当前选中的值 |
