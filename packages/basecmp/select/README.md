## Props

| Name           | Tpye    | Default | Describe                        |
|:---------------|:--------|:--------|:--------------------------------|
| title          | String  | -       | 标题                              |
| placeholder    | String  | -       | select内提示文本                     |
| data           | Array   | []      | 可选择列表，每一项需包含label和value         |
| preset         | Array   | []      | 预设列表                            |
| value          | Array   | []      | 已选中项列表，单选模式下也是                  |
| search         | Boolean | -       | 是否可搜索                           |
| size           | String  | large   | 选择框尺寸 可选large(l)和small(s)       |
| withLabel      | Boolean | false   | 返回值是否包含label，为false时返回值仅包含value |
| multiple       | Boolean | false   | 是否为多选模式                         |
| normalMultiple | Boolean | -       | 默认是否为多选模式                       |
| disable        | Boolean | -       | 是否禁用                            |
| transfer       | Boolean | false   | 弹出层是否挂载到body                    |
| offset         | String  | -       | 弹出层偏移值                          |

## 事件

| Name   | Describe                                               |
|:-------|:-------------------------------------------------------|
| change | 选中的值发生更改是触发，返回选中的值列表，withLabel为true时，每一项为{label,value} |
