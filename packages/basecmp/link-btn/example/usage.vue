<template>
  <div>
    <button><LinkBtn to="/basecmp/button">当前标签页</LinkBtn></button>
    <button><LinkBtn to="/basecmp/button" _blank>新开标签页</LinkBtn></button>
  </div>
</template>

<script>
import LinkBtn from '../src/linkBtn.vue';
import jump from '@zl/extend-router';

window._APP.use(jump);

export default {
  components: {
    LinkBtn,
  },
};
</script>
