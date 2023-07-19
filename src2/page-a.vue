<template>
  <h1>aaaaaaaaaaaaa</h1>
  <router-link to="/b">page b</router-link>
  <a href="/b">page b by link</a>
</template>

<script setup>
import {toRaw} from 'vue';
import {useRoute} from 'vue-router';

const nowRoute = useRoute();
console.debug('nowRoute', toRaw(nowRoute));

console.debug('session', sessionStorage.getItem('testValue'));
</script>
