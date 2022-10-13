<template>
  <div class="c-tooltip-ex">
    <h2>默认状态</h2>
    <Tooltip content="提示内容提示内容提示内容提示内容" :showIfOverflow="false">
      <span>鼠标移到我上面</span>
    </Tooltip>

    <h2>一直显示</h2>
    <Tooltip content="提示内容提示内容提示内容提示内容" always :showIfOverflow="false" placement="top-start">
      <p>一直显示</p>
    </Tooltip>

    <h2>文本溢出时显示</h2>
    <Tooltip theme="darkDeep" content="提示内容提示内容提示内容提示内容">
      <p class="g-single-text" style="max-width:100px;">长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本</p>
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '../src/tooltip';
export default {
  components: { Tooltip },
};
</script>

<style lang="less">
.c-tooltip-ex {
  h2 {
    font-weight: bold;
    margin: 8px 0;
  }
}
</style>
