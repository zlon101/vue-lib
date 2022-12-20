<template>
  <div class="icon-text-exam">
    <IconText icon="iconfont icon-add">默认状态</IconText>
    <IconText icon="iconfont icon-err" color="red" iconMargin="16" fontSize="24">失败</IconText>
    <IconText icon="iconfont icon-success" to="/">主页</IconText>
    <IconText>
      <template v-slot:icon><span class="cus-icon"></span></template>
      自定义图标
    </IconText>
  </div>
</template>

<script>
import IconText from '../index';

export default {
  components: {
    IconText,
  },
  data() {
    return {
      val: '',
    };
  },
};
</script>

<style lang="less">
.icon-text-exam {
  > * {
    margin: 16px 0;
  }
  .cus-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: #f2d761;
    border-radius: 50%;
  }
}
</style>
