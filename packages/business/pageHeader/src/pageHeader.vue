<template>
  <div class="c-page-header">
    <div class="page-header-desc">
      <slot name="title" v-if="$slots.title">{{ title }}</slot>
      <h1 v-else>{{ title }}</h1>
      <slot v-if="$slots.desc" name='desc'/>
      <p v-else>{{ desc }}</p>
    </div>
    <div class="page-header-action-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
    desc: String,
  },
};
</script>

<style lang="less" scoped>
.c-page-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0;
  margin-bottom: 24px;
  .page-header-desc {
    > h1 {
      color: @text_color_basic;
      margin-bottom: 8px;
      font-size: 26px;
      font-weight: bold;
      line-height: 36px;
    }
    > p {
      color: @text_color_desc;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
</style>
