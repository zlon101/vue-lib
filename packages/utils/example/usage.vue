<template>
  <div class="p-tool-note">
    <h1>工具函数文档</h1>
    <div class="module-item" v-for="modItem in list" :key="modItem.subpath">
      <h2>{{getModulePath(modItem)}}</h2>
      <div class="fn-item" v-for="item in modItem.fnArr" :key="item.fnName">
        <pre v-if="item.note">{{ item.note }}</pre>
        <pre><code class="hljs language-javascript" v-html="getCode(item.fnName)"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import FnList from './note.json';
import PkgJson from '../package.json';

export default {
  data() {
    return {
      list: FnList,
    };
  },
  methods: {
    getModulePath(modItem) {
      if (modItem.subpath === 'index') {
        return PkgJson.name;
      }
      return `${PkgJson.name}/${modItem.subpath}`;
      // return `${PkgJson.name}/lib/${modItem.subpath}`;
    },
    getCode(code) {
      if (window.hljs) {
        return window.hljs.highlight(code, { language: 'javascript' }).value;
      }
      return code;
    },
  },
};
</script>

<style lang="less" scoped>
.p-tool-note {
  h1 {
    font-weight: bold;
  }
  pre {
    margin: 0 0 8px;
    padding-top: 0;
  }
  .module-item {
    border: 1px solid gray;
    border-radius: 8px;
    margin: 16px 0;
    padding: 8px;
    h2 {
      font-weight: bold;
      background-color: aquamarine;
    }
  }
  .fn-item {
    margin: 16px 0;
    padding-bottom: 4px;
    &:not(:last-child) {
      border-bottom: 1px solid gray;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
