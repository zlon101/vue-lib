<template>
  <transition name="slide-fade">
    <div :class="[className, 'g-flex-center']" @mousedown.self="handleMouseDown(className)" @mouseup.self="handleMouseUp">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      className: 'c-modal',
      lastClickClassName: '',
    };
  },
  created() {
    document.addEventListener('keyup', this.handleKeyup);
  },
  destroyed() {
    document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    close() {
      this.lastClickClassName = '';
      this.$emit('close');
    },
    handleMouseDown(className) {
      this.lastClickClassName = className;
    },
    handleMouseUp() {
      // 在遮罩上按下并抬起才会关闭，避免操作内容时关闭
      if (this.lastClickClassName.includes(this.className)) {
        this.close();
      }
    },
    handleKeyup(e) {
      e.keyCode === 27 && this.close();
      e.keyCode === 13 && this.$emit('enter');
    },
  },
};
</script>

<style lang="less" scoped>
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(2, 0, 5, 0.88);
  z-index: @zLeveMask;
}
</style>
