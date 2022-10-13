<template>
  <MultiStepBar :list="list" :curStep="curStep" />
</template>

<script>
import MultiStepBar from '../src/multiStepBar';

export default {
  components: {
    MultiStepBar,
  },
  data() {
    return {
      list: ['第一步', '第二步', '第三步'],
      curStep: '第二步',
    };
  },
};
</script>
