<template>
  <div class="c-example">
    <button @click="onCopy">点击复制</button>
  </div>
</template>

<script>
import copy from '../index';

window._APP.use(copy);

export default {
  methods: {
    onCopy() {
      this.$copy('复制的文本');
    },
  },
};
</script>
