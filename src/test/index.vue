<template>
  <div id="vue-app">
    <h1>测试各种功能</h1>
    <XhrTest />
    <ServeEvent />
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie">mdn</a>
    <Range />
  </div>
</template>

<script>
/* eslint-disable */
import XhrTest from './xhr';
// import WsTest from './ws';
import ServeEvent from './event-source';
import Range from './range';

export default {
  components: { XhrTest, ServeEvent, Range },
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