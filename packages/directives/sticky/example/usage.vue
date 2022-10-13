<script>
import vSticky from '../src/sticky';

export default {
  directives: {
    sticky: vSticky,
  },
};
</script>

<template>
  <div class="c-sticky-wrap">
    <div class="header"></div>
    <h2 v-sticky>sticky 定位</h2>
    <div class="content">{{new Array(10000).fill('内容').join('')}}</div>
  </div>
</template>

<style lang="less">
.c-sticky-wrap {
  position: relative;
  max-height: 400px;
  overflow: auto;
  outline: 1px solid red;
  h2 {
    background: #67C23A;
  }
  .header {
    height: 100px;
  }
  .content {
    height: 900px;
  }
}
</style>
