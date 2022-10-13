<template>
  <Dropdown class="outline" :text="value" color="#06003b" hover :options="['AAA', 'BBB']" @change="$event => (value = $event)" />
</template>

<script>
import Dropdown from '../src/dropdown';
export default {
  components: { Dropdown },
  data() {
    return {
      value: 'AAA',
    };
  },
};
</script>
