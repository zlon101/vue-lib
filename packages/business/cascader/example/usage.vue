<template>
  <AreaSelect :root="AreaRoot" />
</template>

<script>
import AreaSelect from '../src/index';
import AreaJson from '../area.json';

export default {
  components: {
    AreaSelect,
  },
  data() {
    return {
      AreaRoot: AreaJson,
    };
  },
  methods: {
    onChange(range) {
      console.log(range);
    },
  },
};
</script>
