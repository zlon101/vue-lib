## Props

- 原生 input标签 的属性不变，type maxlength 等其他属性用法不变；
- 原生 input标签 的监听事件只有 input、blur 事件抛出的参数有变化，input、blur 抛出两个参数: value 和 event，其他监听器不变


| Name       | Tpye          | Default | 必填  | Description                |
|:-----------|:--------------|:--------|:----|:------------------------|
| width      | Number\String | -       | 否   | 宽度                      |
| height     | Number\String | 40px    | 否   | 高度                      |
| inputSty     | String\Object | -       | 否   | 作用到原生input、textarea上的样式 |
| search     | Boolean       | false   | 否   | 是否有搜索Icon               |
| copy       | Boolean       | false   | 否   | 是否可以复制输入框的值             |
| desc       | String        | ''      | 否   | 字段描述                    |
| textarea   | Boolean       | false   | 否   | 是否是textarea             |
| cleanBlank | Boolean       | true    | 否   | 清除首尾空格                  |
| errMsg     | String        | ''      | 否   | 报错信息                    |
| purenumber | Boolean       | false   | 否   | 纯数字类型，只有0-9             |
| min        | Number        | -       | 否   | 输入数字时使用，最小值             |
| max        | Number        | -       | 否   | 最大值                     |
| fakerValue | String        | ''      | 否   | 模糊处理的字符                 |
| indent     | Boolean       | false   | 否   | 是否缩进                    |

## 主要功能

- 根据传入的 errMsg 是否为空显示报错文案
- 复制输入框内容
- 自动计算 textarea 的字符数量
- type 为 number 只能输入数字，不能输入特殊字符
- 失焦自动清除首尾空格
