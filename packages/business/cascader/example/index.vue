<template>
  <Example v-bind="$data" ref="exam">
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
import sourcecode from '!!raw-loader!./usage.vue';

export default {
  components: {
    Example,
    Readme,
    Usage,
  },
  data() {
    return {
      sourcecode,
      compPath: 'business/cascader',
      packageJson,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.exam.onReset();
    next();
  },
};
</script>
