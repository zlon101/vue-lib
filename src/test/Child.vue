<template>
  <h2>child.vue</h2>
</template>

<script>
const log = console.debug;

export default {
  props: {
    propsVal: {
      type: String,
      default: '0',
    },
  },
  data() {
    log(`执行data函数
    this: %o
    this.propsVal: ${this.propsVal}
    this.age: ${this.age}
    `, this);
    return {
      age: '90',
    };
  },
  beforeCreate() {
    log(`执行data函数
    this: %o
    this.age: ${this.age}
    this.propsVal: ${this.propsVal}
    `, this);
  },
  // created() {
  //   log('child created');
  // },
  // beforeMount() {
  //   log('child beforeMount');
  // },
  // mounted() {
  //   log('child mounted');
  // },
};
</script>
