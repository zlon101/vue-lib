<template>
  <div>
    <h2>child.vue</h2>
    <p>propsVal: {{propsVal}}</p>
  </div>
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
  watch: {
    propsVal: {
      handler() {
        // log('watch');
      },
      immediate: true,
    },
  },
  data() {
    log(`执行data函数
      this: ${typeof this}
      this.propsVal: ${this?.propsVal}
      this.age: ${this?.age}
      原型属性: ${typeof this.$msg}
    `);
    return {
      age: '90',
    };
  },
  beforeCreate() {
    log(`beforeCreate
      this: ${typeof this}
      this.age: ${this?.age}
      原型属性: ${typeof this.$msg}
    `);
  },
  created() {
    log(`child created
      原型属性: ${typeof this.$msg}
    `);
  },
  // beforeMount() {
  //   log('child beforeMount');
  // },
  // mounted() {
  //   log('child mounted');
  // },
};
</script>
