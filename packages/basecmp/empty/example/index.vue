<template>
  <Example :packageJson="packageJson" :compPath="compPath" ref="exam" nocode>
    <template v-slot:readme>
      <Readme />
    </template>
  </Example>
</template>

<script>
import Example from '@packages/example.vue';
import Readme from '../README.md';
import packageJson from '../package.json';

export default {
  components: {
    Example,
    Readme,
  },
  data() {
    return {
      compPath: 'basecmp/empty',
      packageJson,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.exam.onReset();
    next();
  },
};
</script>
