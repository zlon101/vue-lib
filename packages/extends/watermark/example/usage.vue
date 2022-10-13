<template>
  <div class="c-example">
    <button @click="onTest">测试</button>
  </div>
</template>

<script>
import watermark from '../index.js';

export default {
  methods: {
    onTest() {
      watermark('张三', '12345877');
    }
  }
};
</script>
