<template>
  <div style="display:flex; justify-content:flex-end">
    <DatePicker defaultModel="today" @onchange="onChange"/>
  </div>
</template>

<script>
import DatePicker from '../src/timepicker';

export default {
  components: {
    DatePicker,
  },
  methods: {
    onChange(range) {
      console.log(range);
    },
  },
};
</script>
