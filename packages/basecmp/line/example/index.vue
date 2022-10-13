<template>
  <Example :packageJson="packageJson" :compPath="compPath" ref="exam">
    <template v-slot:readme>
      <Readme />
    </template>
    <template v-slot:usage>
      <Usage />
    </template>
  </Example>
</template>

<script>
import Example from '@packages/example.vue';
import Readme from '../README.md';
import packageJson from '../package.json';
import Usage from './usage.vue';

export default {
  components: {
    Example,
    Readme,
    Usage,
  },
  data() {
    return {
      compPath: 'basecmp/line',
      packageJson,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.exam.onReset();
    next();
  },
};
</script>
