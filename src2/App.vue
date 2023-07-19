<template>
  <router-link to="/a?id=23">page a</router-link>
  <a href="/a">page a by link</a>
  <button @click="onClick">跳转</button>
  <div class="page-content">
    <router-view />
  </div>
</template>

<script setup>
const onClick = () => {
  window.open('http://localhost:9003/a', '_target');
}
</script>

<style lang="less">
#app {
  margin: 0 auto;
  padding: 20px;
}
</style>
