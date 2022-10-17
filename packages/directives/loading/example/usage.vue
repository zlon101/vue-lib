<template>
  <div class="c-example" v-loading="{show: true, page: false}">
  </div>
</template>

<script>
import loading from '../index.js';

export default {
  directives: {
    loading,
  },
};
</script>

<style lang="less" scoped>
.c-example {
  width: 500px;
  height: 500px;
  position: relative;
  outline: 2px solid red;
}
</style>
