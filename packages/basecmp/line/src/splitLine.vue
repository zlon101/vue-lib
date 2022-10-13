<template>
  <div :class="['c-split-line']" :style="style"></div>
</template>

<script>
export default {
  name: 'SplitLine',
  props: {
    color: {
      type: String,
      default: '#ebeef5',
    },
    /** dashed dotted */
    type: {
      type: String,
      default: 'solid',
    },
    // 上下外边距
    margin: {
      type: String,
      default: '32',
    },
    full: {
      type: [String, Number],
      default: 0,
    }, // X轴延伸
  },
  computed: {
    style() {
      return {
        borderBottomColor: this.color,
        borderBottomStyle: this.type,
        margin: `${this.margin}px 0`,
        width: `calc(100% + ${this.full}px)`,
        transform: `translateX(-${this.full / 2}px)`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.c-split-line {
  display: block;
  width: 100%;
  height: 1px;
  border-bottom-width: 1px;
}
</style>
