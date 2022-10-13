<template>
  <div class="c-example">
    <button @click="onClick()">当前标签页打开</button>
    <button @click="onClick('newtab')">新建标签页</button>
  </div>
</template>

<script>
import Vue from 'vue';
import routeJump from '../index.js';

Vue.use(routeJump);

export default {
  methods: {
    onClick(newtab) {
      if (newtab) {
        this.$routerJump('/basecmp/button', { blank: true });
      } else {
        this.$routerJump('/basecmp/button');
      }
    }
  }
};
</script>
