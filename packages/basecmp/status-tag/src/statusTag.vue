<template>
  <div :class="['c-status-tag', type]" :style="style">
    <i v-if="icon" :class="['tag-icon', icon]"></i>
    <slot name="icon"></slot>
    <slot></slot>
  </div>
</template>

<script>
const typeList = ['warning', 'success', 'error'];

export default {
  name: 'StatusTag',
  props: {
    type: {
      type: String,
      default: 'warning',
      validator(val) {
        return typeList.includes(val);
      },
    },
    icon: String,
    bg: String,
  },
  computed: {
    style() {
      return this.bg ? `background: ${this.bg}` : '';
    },
  },
};
</script>

<style lang="less" scoped>
.c-status-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border-radius: 100px;
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
  &.error {
    background: #F56C6C;
  }
  &.warning {
    background: #FAAD14;
  }
  &.success {
    background: #67C23A;
  }
  .tag-icon {
    width: 14px;
    height: 14px;
    margin: 0 4px 0 0;
    color: #ffffff;
    background-color: transparent;
  }
}
</style>
