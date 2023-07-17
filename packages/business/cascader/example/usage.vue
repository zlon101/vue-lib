<template>
  <AreaSelect :root="AreaRoot" uid="code" labelKey="name" @input="onChange" style="width:300px" />
</template>

<script>
import AreaSelect from '../src/index.vue';
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
    onChange(evt) {
      console.log(evt);
    },
  },
};
</script>
