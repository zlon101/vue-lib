<template>
  <h2>child.vue</h2>
</template>

<script>
export default {
  beforeCreate() {
    console.debug('child beforeCreate');
  },
  created() {
    console.debug('child created');
  },
  beforeMount() {
    console.debug('child beforeMount');
  },
  mounted() {
    console.debug('child mounted');
  },
};
</script>
