<template>
  <div class="c-example">
    <p v-copy>复制dom.textContent</p>
    <p v-copy="'自定义自定义'">自定义字符串</p>
    <div v-copy="{ target: '.desc' }">
      <p>标题</p>
      <p class="desc">指定点击的dom</p>
    </div>
    <div v-copy="{ str: '自定义复制内容', target: '.sub-cls' }">
      <p>标题</p>
      <p class="sub-cls">自定义</p>
    </div>
  </div>
</template>

<script>
import vCopy from '../index.js';

export default {
  directives: {
    copy: vCopy,
  },
};
</script>

<style lang="less">
.c-example {
  > * {
    margin: 16px 0;
  }
}
</style>
