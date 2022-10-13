<template>
  <div class="c-example">
    <button @click="onCopy">点击复制</button>
  </div>
</template>

<script>
import Vue from 'vue';
import copy from '../index';

Vue.use(copy);

export default {
  methods: {
    onCopy() {
      this.$copy('复制的文本');
    }
  }
};
</script>
