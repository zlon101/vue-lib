<template>
  <h1>home page</h1>
</template>

<script setup>
import {onMounted} from "vue";

sessionStorage.setItem('testValue', 'abcdefg');
onMounted(() => {
  console.debug('onMounted', sessionStorage.getItem('testValue'));
});
</script>
