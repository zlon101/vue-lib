<script>
import vPartLoading from '../src/loading';

export default {
  directives: {
    loading: vPartLoading,
  },
};
</script>

<template>
  <div class="c-example">
    <div class="contain" v-loading="{ isLoading: true, page: false }"></div>
    <div class="contain" v-loading="{ isLoading: true, icon: 'iconfont icon-loading-arrow', page: false }"></div>
  </div>
</template>

<style lang="less">
.contain {
  position: relative;
  width: 200px;
  height: 200px;
  outline: 1px solid red;
}
.icon-loading-arrow {
  font-size: 48px;
  line-height: 48px;
  color: red;
}
</style>
