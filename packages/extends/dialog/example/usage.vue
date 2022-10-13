<template>
  <div class="c-example">
    <div>
      <button @click="onSuccess">成功</button>
      <button @click="onQuest">询问</button>
      <button @click="onError">报错</button>
      <button @click="onAlert">警告</button>
    </div>
    <h3>
      组件形式：
      <button @click="visible = !visible">显示</button>
    </h3>
    <Dialog v-model="visible">
      <template v-slot:title><h1>自定义标题</h1></template>
      <template v-slot:icon><div style="">自定义图标</div></template>
      <div>自定义内容</div>
    </Dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import dialog from '../index.js';

Vue.use(dialog);

export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onSuccess() {
      this.$dialog.show({
        type: 'success',
        title: '标题标题标题',
        desc: '描述描述描述描述',
      });
    },
    onQuest() {
      this.$dialog.show({
        type: 'query',
        title: '标题标题标题',
        htmlDesc: '<div style="background:red">自定义htmlDesc<button>按钮</button></div>',
        cancel: '自定义取消按钮',
        confirm: '自定义确定按钮',
      });
    },
    onError() {
      this.$dialog.show({
        type: 'warn',
        title: '标题标题标题',
        desc: '描述描述描述描述'
      });
    },
    onAlert() {
      this.$dialog.show({
        type: 'warn_y',
        title: '标题标题标题',
        desc: '描述描述描述描述'
      });
    },
  }
};
</script>
