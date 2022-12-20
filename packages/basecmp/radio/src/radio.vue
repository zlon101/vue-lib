<template>
  <div :class="['c-radio', direction]">
    <div
      class="content"
      v-for="item in data"
      :key="item.value"
      :class="{ selected: item.value === select, disable: disable || item.disable }"
      @click="clickSelect(item)"
    >
      <span class="gir-radio"></span>
      <span v-if="item.label || item.text" class="gir-value">{{ item.label || item.text }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    data: Array, // Array<Obj> { value, (label | text), disable }
    select: [String, Boolean, Number],
    // 方向 H 水平 V 垂直, (Tips: 大写)
    direction: {
      type: String,
      default: 'H',
    },
    disable: Boolean, // 整体禁用
  },
  methods: {
    clickSelect(v) {
      if (this.disable || v.disable) {
        return;
      }
      this.$emit('change', v.value);
    },
  },
};
</script>

<style lang="less" scoped>
.c-radio {
  display: flex;
  &.H {
    flex-wrap: wrap;
    align-items: center;
    .content:not(:last-child) {
      margin-right: 32px;
    }
  }
  &.V {
    flex-direction: column;
    .content:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .content {
    cursor: pointer;
    .gir-radio {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #dcdfe6;
      vertical-align: middle;
    }
    .gir-value {
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
      font-size: 14px;
      color: #3c4758;
    }
    &.selected {
      .gir-radio {
        position: relative;
        border: none;
        background: #3a51e0;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
        }
      }
      .gir-value {
        // color: #06003B;
        color: #3a51e0;
      }
    }
    &.disable {
      cursor: unset;
      .gir-radio {
        background-color: #f0f2f5;
      }
      .gir-value {
        color: #bfc4cd;
      }
    }
  }
}
</style>
