<template>
  <div id="vue-app">
    <h1>测试各种功能</h1>
    <Child :propsVal="msg" />
    <!--<XhrTest />-->
    <!--<ServeEvent />-->
    <!--<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie">mdn</a>-->
    <!--<Range />-->
  </div>
</template>

<script>
/* eslint-disable */
// import XhrTest from './xhr';
// import WsTest from './ws';
import ServeEvent from './event-source';
import Range from './range';
import Child from './Child.vue';

export default {
  components: { ServeEvent, Range, Child },
  data() {
    return {
      msg: '00',
    };
  },
  // beforeCreate() {
  //   console.debug('parent beforeCreate');
  // },
  // created() {
  //   console.debug('parent created');
  // },
  // beforeMount() {
  //   console.debug('parent beforeMount');
  // },
  // mounted() {
  //   console.debug('parent mounted');
  // }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
}

h1, h2 {
  margin: 16px 0;
}
p {
  margin: 8px 0;
}
</style>
