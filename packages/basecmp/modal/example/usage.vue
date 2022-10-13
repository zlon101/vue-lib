<template>
  <div>
    <button @click="show = !show">显示/隐藏</button>
    <Modal v-show="show" @close="show = false" style="z-index:999999">
      <div style="background-color:#ffffff;width:50%;height:50%">弹窗内容</div>
    </Modal>
  </div>
</template>

<script>
import Modal from '../src/modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
