<template>
  <div class="c-card">
    <div :class="['header', { bottom: $slots.default }]">
      <div class="title-desc">
        <p v-if="title || $slots.title" class="title">
          <slot name="title">{{ title }}</slot>
        </p>
        <p v-if="desc || $slots.desc" class="desc">
          <slot name="desc">{{ desc }}</slot>
        </p>
      </div>
      <slot name="right"></slot>
    </div>
    <div v-if="$slots.default" class="body" :style="{ padding }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    desc: String,
    padding: {
      type: String,
      default: '16px 32px',
    },
  },
};
</script>

<style lang="less" scoped>
.c-card {
  border-radius: 12px;
  border: 1px solid #ebeef5;
  box-shadow: 0 4px 13px 0 rgba(184, 192, 207, 0.13);
  overflow: hidden;
  margin: 24px 0 32px;
  .header {
    display: flex;
    align-items: center;
    padding: 16px 32px;
    background: #f5f7fa;
    &.bottom {
      border-bottom: 1px solid #ebeef5;
    }
    .title-desc {
      flex: 1 1 auto;
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 22px;
    }
    .desc {
      display: flex;
      align-items: center;
      color: #7f8fa4;
      margin-top: 8px;
      line-height: 22px;
    }
  }
}
</style>
