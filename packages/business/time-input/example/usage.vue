<template>
  <TimeInput v-model="time"></TimeInput>
</template>

<script>
import TimeInput from '../src/timeInput';

export default {
  components: {
    TimeInput,
  },
  data() {
    return {
      time: {
        start: { hour: '12', min: '20' },
        end: { hour: '18', min: '02' },
      },
    };
  },
};
</script>
