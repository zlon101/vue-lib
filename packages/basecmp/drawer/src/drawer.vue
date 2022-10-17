<template>
  <transition name="slide-fade">
    <div v-if="innerVisible" class="c-drawer" @mousedown.self="handleMouseDown('c-drawer')" @mouseup.self="handleMouseUp">
      <div :class="['drawer-content', modeMap[mode], animation]" :style="contentSize">
        <header class="drawer-header">
          <slot v-if="$slots.title" name="title">{{title}}</slot>
          <h3 v-else>{{ title }}</h3>
          <div v-if="desc" class="drawer-desc">{{ desc }}</div>
          <div class="icon_close" @click="close"></div>
        </header>
        <div ref="body" class="drawer-body">
          <slot></slot>
        </div>
        <div class="drawer-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const modeMap = {
  tb: 'top-bottom',
  bt: 'bottom-top',
  lr: 'left-right',
  rl: 'right-left',
};

export default {
  name: 'Drawer',
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    /**
     * 四种模式
     */
    mode: {
      type: String,
      default: 'rl',
      validator(val) {
        return Object.keys(modeMap).includes(val);
      },
    },
    /**
     * 抽屉的宽或高
     */
    size: {
      type: String,
      default: '446px',
    },
    /**
     * 点击遮罩是否可以关闭
     */
    maskClosable: {
      type: Boolean,
      default: true, // 需求变更
    },
    escKeyClosable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      modeMap,
      animation: '',
      lastClickClassName: '',
      innerVisible: false,
      timerId: null,
    };
  },
  created() {
    document.addEventListener('keyup', this.handleKeyup);
  },
  destroyed() {
    document.removeEventListener('keyup', this.handleKeyup);
  },
  computed: {
    contentSize() {
      // size 如果没有单位默认px
      const size = this.size + (!Number.isNaN(Number(this.size)) ? 'px' : '');
      const modeLR = ['lr', 'rl'];
      const modeTB = ['tb', 'bt'];
      if (modeLR.includes(this.mode)) {
        return `width: ${size}`;
      }
      if (modeTB.includes(this.mode)) {
        return `height: ${size}`;
      }
      return `width: ${size}`;
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }

        if (val) {
          this.innerVisible = val;
          this.timerId = setTimeout(() => {
            this.animation = 'drawer-open';
          }, 10);
        } else {
          this.animation = 'drawer-close';
          this.timerId = setTimeout(() => {
            this.innerVisible = false;
          }, 250);
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleMouseDown(className) {
      this.lastClickClassName = className;
    },
    handleMouseUp() {
      if (this.lastClickClassName.includes('c-drawer')) {
        this.close('mask');
      }
    },
    close(type) {
      if (type === 'mask' && !this.maskClosable) {
        return false;
      }
      this.lastClickClassName = '';
      this.$emit('update:visible', false); // .sync
      this.$emit('close'); // @close
    },
    handleKeyup(e) {
      if (!this.escKeyClosable) { return; }
      e.keyCode === 27 && this.close();
    },
  },
};
</script>

<style lang="less" scoped>
.c-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.88);
  z-index: 100;
  .drawer-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 56px 32px 32px;
    background: #fff;
    border: 1px solid #EBEEF5;
    box-shadow: -10px 0 20px rgba(184, 192, 207, 0.2);
    transform: translate(0, 0);
    overflow: auto;
    &.top-bottom {
      top: 0;
      left: 0;
      width: 100%;
      transform: translate(0, -100%);
    }
    &.bottom-top {
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translate(0, 100%);
    }
    &.left-right {
      top: 0;
      left: 0;
      height: 100%;
      transform: translate(-100%, 0);
    }
    &.right-left {
      top: 0;
      right: 0;
      height: 100%;
      transform: translate(100%, 0);
    }

    /** animation */
    &.drawer-open {
      transition: transform .1s ease-out;
      &.top-bottom,
      &.bottom-top,
      &.left-right,
      &.right-left {
        transform: translate(0, 0);
      }
    }
    &.drawer-close {
      transition: transform .1s ease-out;
      &.top-bottom {
        transform: translate(0, -100%);
      }
      &.bottom-top {
        transform: translate(0, 100%);
      }
      &.left-right {
        transform: translate(-100%, 0);
      }
      &.right-left {
        transform: translate(100%, 0);
      }
    }

    .drawer-header {
      margin-bottom: 24px;
      & > h3 {
        font-size: 20px;
        line-height: 28px;
        font-weight: bold;
        color: #06003B;
      }
      .drawer-desc {
        font-size: 14px;
        color: #7F8FA4;
        margin: 8px 0 0;
      }
      .icon_close {
        position: absolute;
        top: 56px;
        right: 32px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    .drawer-body {
      flex: auto;
      overflow: auto;
    }
    .drawer-footer{
      margin-top: 32px;
    }
  }
}

</style>
