<template>
  <div>
    <div><PicInput v-model="val" /></div>
    <div><PicInput v-model="val" search /></div>
    <div><PicInput v-model="val" copy clean /></div>
    <div><PicInput type="textarea" v-model="val" maxlength="10" showCount /></div>
  </div>
</template>

<script>
import PicInput from '../src/input';

export default {
  components: {
    PicInput,
  },
  data() {
    return {
      val: '',
    };
  },
};
</script>
