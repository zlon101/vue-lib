<template>
  <div class="c-empty-wrap">
    <slot name="icon"><img src="./icon-empty.svg" /></slot>
    <slot>
      <p class="desc-jh">{{ desc }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: '暂无相关内容',
    },
  },
};
</script>

<style lang="less">
.c-empty-wrap {
  text-align: center;
  .desc-jh {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    color: #06003b;
  }
}
</style>
