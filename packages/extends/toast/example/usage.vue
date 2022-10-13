<template>
  <div class="c-example">
    <div>
      <button @click="$toast('默认状态')">默认状态</button>
      <button @click="$toast({
        text: 'success',
        type: 'success',
      })">success</button>
      <button @click="$toast({
        text: 'warning',
        type: 'warning',
      })">warning</button>
      <button @click="$toast({
        text: 'error',
        type: 'error',
      })">error</button>
    </div>
    <div>
      <button @click="onAllShow">一直显示</button>
      <button @click="onClose">取消显示</button>
    </div>
    <button @click="onCusTimeout">自定义显示时长</button>
  </div>
</template>

<script>
import Vue from 'vue';
import toast from '../index';

Vue.use(toast);

export default {
  methods: {
    onAllShow() {
      this.toastVm = this.$toast({
        timeout: null,
        text: '一直显示',
        type: 'error',
      });
    },
    onClose() {
      this.toastVm && this.toastVm.close();
    },
    onCusTimeout() {
      this.$toast({
        timeout: 3000,
        text: '操作失败',
        type: 'error'
      });
    },
  },
};
</script>
