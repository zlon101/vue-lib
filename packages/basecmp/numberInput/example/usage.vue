<template>
  <div>
    <InputNumber v-model="num" :min="5" :max="10" unit="秒"/>
  </div>
</template>

<script>
import InputNumber from '../src/numberInput';

export default {
  components: {
    InputNumber,
  },
  data() {
    return {
      num: 5,
    };
  },
};
</script>
