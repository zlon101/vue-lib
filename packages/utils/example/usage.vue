<template>
  <div class="p-tool-note">
    <h1>工具函数文档</h1>
    <div class="module-item" v-for="modItem in list" :key="modItem.subpath">
      <h2>{{getModulePath(modItem)}}</h2>
      <div class="fn-item" v-for="item in modItem.fnArr" :key="item.fnName">
        <pre v-if="item.note" class="fn-note">{{ item.note }}</pre>
        <pre><code class="hljs language-javascript" v-html="getCode(item.fnName)"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import Hlt from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import FnList from './note.json';
import PkgJson from '../package.json';

Hlt.registerLanguage('javascript', javascript);

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
    },
    getCode(code) {
      // const codeStr = code.split('').map(chat => HtmlEscapes[chat] || chat).join('');
      return Hlt.highlight(code, { language: 'javascript' }).value;
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
    margin: 0;
    line-height: 1.5;
    //padding-top: 0;
  }
  .module-item {
    border: 1px solid gray;
    border-radius: 8px;
    margin: 16px 0;
    //padding: 8px;
    overflow: hidden;
    h2 {
      font-weight: bold;
      background-color: #57c39f;
    }
  }
  .fn-item {
    //margin: 16px 0;
    //padding-bottom: 4px;
    &:not(:last-child) {
      border-bottom: 1px solid gray;
    }
    &:last-child {
      margin-bottom: 0;
    }
    code.hljs {
      padding: 8px 4px;
      outline: none;
    }
  }
  .fn-note {
    margin-top: 16px;
    color: #000;
    font-size: 16px;
  }
}
</style>
