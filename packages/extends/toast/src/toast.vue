<template>
  <transition name="slide-fade">
    <div :class="['sdp-toast', type]" v-show="visible">
      <div :class="['iconfont', icon || iconClassMap[type]]"></div>
      <span class="toast-text">{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      visible: false,
      /**
       * toast 类型 success | error | warning
       */
      type: 'success',
      iconClassMap: {
        success: 'icon-success',
        warning: 'icon-err',
        error: 'icon-cross',
      },
      text: '',
      icon: '',
      timeout: 1500,
      timerId: null,
    };
  },
  methods: {
    show() {
      this.visible && this.clearTimer(); // Toast已经在显示时，重复调用先重置Timer
      this.visible = true;
      if (this.timeout) {
        this.timerId = setTimeout(() => {
          this.visible = false;
          this.timerId = null;
        }, this.timeout);
      }
    },
    close() {
      this.visible = false;
      this.clearTimer();
    },
    clearTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.sdp-toast {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 48px;
  border-radius: 20px;
  z-index: 99999;
  .iconfont {
    color: #ffffff;
    background-color: transparent;
    width: 16px;
    height: 16px;
    margin: 0 8px 0 0;
  }
  .toast-text {
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
  }
  &.success {
    background: #67C23A;
  }
  &.warning {
    background: #ffcd7b;
  }
  &.error {
    background: #f56c6c;
  }
}
</style>
