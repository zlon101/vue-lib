<template>
  <div class="c-icon-text">
    <div v-if="$slots.icon || icon" class="icon" :style="{ marginRight: `${iconMargin}px` }">
      <slot name="icon"><i :class="icon"></i></slot>
    </div>
    <span v-if="!to" class="text" :style="style"><slot></slot></span>
    <router-link v-else :to="to" :target="target">
      <span class="text link" :style="style"><slot></slot></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'IconText',
  props: {
    icon: String,
    iconMargin: {
      type: String,
      default: '4',
    },
    color: {
      type: String,
      default: '#06003B',
    },
    to: [String, Object],
    target: String,
    fontSize: {
      type: [String, Number],
      default: 14,
    },
  },
  computed: {
    style() {
      return {
        color: this.color,
        fontSize: `${this.fontSize}px`,
      };
    },
  },
};
</script>

<style lang="less">
.c-icon-text {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .text.link {
    color: @theme !important;
  }
  .icon {
    display: flex;
    align-items: center;
  }
}
</style>
