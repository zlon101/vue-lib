<script>
import vTransfer from '../index';

export default {
  directives: {
    transfer: vTransfer,
  },
};
</script>

<template>
  <div class="c-transfer-ex">
    <div class="content-hjy" data-transfer="true" v-transfer>{{new Array(100).fill('内容').join('')}}</div>
  </div>
</template>

<style lang="less">
.c-transfer-ex {
  position: relative;
  width: 200px;
  height: 200px;
  outline: 1px solid red;
  overflow: auto;
}

.content-hjy {
  position: absolute;
  left: 50%;
  top: 20%;
  width: 300px;
  height: 300px;
  outline: 1px solid blue;
}
</style>
