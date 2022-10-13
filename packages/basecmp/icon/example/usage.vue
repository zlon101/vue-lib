<template>
  <div class="c-icon-example">
    <h2>组件方式</h2>
    <div>
      <IconCross s="40px" :fill="{0: 'green', 1: 'blue'}" />
    </div>
    <div class="icon-item" v-for="name in compNames" :key="name">
      <p>{{ name }}</p>
      <component :is="Icon[name]" s="30px" />
    </div>
    <h2>icon-font方式</h2>
    <div>
      <span class="iconfont icon-cross" style="color: red; font-size: 40px"></span>
    </div>
    <div class="icon-item" v-for="name in compNames" :key="`font-${name}`">
      <p>css 类名: .iconfont.{{ transformName(name) }}</p>
      <span :class="['iconfont', transformName(name)]" style="font-size:40px;line-height:40px;"></span>
    </div>
  </div>
</template>

<script>
import '../src/font.less';
import * as Icon from '../src/icon.js';
import { IconCross } from '../src/icon.js';

const names = Object.keys(Icon);
const comps = names.reduce((acc, name) => {
  acc[name] = Icon[name];
  return acc;
}, {});

export default {
  components: { ...comps, IconCross },
  data() {
    return {
      Icon,
      compNames: names,
    };
  },
  methods: {
    // 驼峰转短横线
    transformName(name) {
      const first = name[0].toLowerCase();
      const two = name.slice(1).replace(/[A-Z]{1}/g, w => '-' + w.toLowerCase());
      return `${first}${two}`;
    },
  },
};
</script>

<style lang="less">
.c-icon-example {
  .icon-item {
    display: inline-block;
    margin: 8px;
    width: 200px;
    outline: 1px solid gray;
  }
  .iconfont {
    color: green;
    &.icon-cross {
      color: #F56C6C;
    }
    &.icon-err {
      color: #F56C6C;
    }
    &.icon-success {
      color: #67C23A;
    }
  }
}
</style>
