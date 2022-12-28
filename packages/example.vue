<script>
// 组件的 example 模板
import Hlt from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
// import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/base16/dracula.css';
import Api from '@/axios';

Hlt.registerLanguage('javascript', javascript);
Hlt.registerLanguage('xml', xml);

export default {
  inheritAttrs: false,
  props: {
    packageJson: Object,
    compPath: String,
    nocode: Boolean,
    sourcecode: String,
  },
  data() {
    return {
      devMod: !window._IsProd,
      oldCode: '',
      newCode: '',
      canGetCode: false,
    };
  },
  computed: {
    deps() {
      const { packageJson } = this;
      const result = {};
      ['dependencies', 'peerDependencies', 'devDependencies'].forEach(k => {
        const dep = packageJson[k];
        if (dep) {
          const list = [];
          Object.keys(dep).forEach(k2 => {
            list.push(`${k2}: ${dep[k2]}`);
          });
          result[k] = list;
        }
      });
      return result;
    },
  },
  mounted() {
    let codeStr = (this.sourcecode || '').trim();
    this.canGetCode = Boolean(this.$slots.usage) && !!codeStr;
    if (!this.canGetCode) return;

    // codeStr = codeStr.split('').map(chat => HtmlEscapes[chat] || chat).join('');
    if (!this.oldCode) {
      this.oldCode = codeStr;
      !sessionStorage.getItem(this.compPath) && sessionStorage.setItem(this.compPath, codeStr);
    }
    this.newCode = Hlt.highlight(codeStr, { language: 'xml' }).value;
  },
  methods: {
    onUpdateCode() {
      const nCode = this.$refs.code.textContent;
      Api.setCode(this.compPath, nCode);
      setTimeout(() => window.location.reload(), 300);
    },
    onReset() {
      if (!this.canGetCode || window._IsProd) return;

      const { compPath } = this;
      const oldCode = sessionStorage.getItem(compPath);
      const nCode = this.$refs.code.textContent;
      if (oldCode.trim() === nCode.trim()) return;

      if (oldCode) {
        Api.setCode(compPath, oldCode);
        // setTimeout(() => window.location.reload(), 300);
      } else {
        console.debug('\n未查找到旧代码');
      }
    },
  },
};
</script>

<template>
  <div class="page-example">
    <h1>1.组件信息</h1>
    <div class="cmp-info">
      <p>name: {{ packageJson.name }}</p>
      <p>version: {{ packageJson.version }}</p>
      <p>description: {{ packageJson.description }}</p>
      <template v-if="Object.keys(deps).length">
        <p><b>依赖：</b></p>
        <div v-for="k in Object.keys(deps)" :key="k">
          <p>{{k}}</p>
          <ul style="margin-left:16px">
            <li v-for="dep in deps[k]" :key="dep">{{dep}}</li>
          </ul>
        </div>
      </template>
    </div>

    <h1 class="margin-top">2.使用方法</h1>
    <div class="markdown-body">
      <slot name="readme"></slot>
    </div>

    <h1 class="margin-top">3.代码示例</h1>
    <slot name="usage"></slot>
    <details open v-if="canGetCode">
      <summary>
        <span>source code</span>
        <template v-if="devMod">
          <button @click="onUpdateCode">更新</button>
          <button @click="onReset">重置</button>
          <span style="margin-left: 16px">(注: 点击更新会直接修改源码, 离开当前路由后会自动恢复)</span>
        </template>
      </summary>
      <pre>
        <code class="hljs" ref="code" v-html="newCode" contenteditable="true"></code>
      </pre>
    </details>
  </div>
</template>

<style lang="less">
.page-example {
  h1 {
    margin-bottom: 12px;
    padding: 0;
    font-weight: bold;
    font-size: 1.5em;
  }
  .margin-top {
    margin-top: 12px;
  }
  .markdown-body {
    h2,
    h2 {
      font-size: 1.3em;
      margin: 8px 0;
      padding: 0;
    }
    ul {
      padding-left: 16px;
      margin-top: 12px;
    }
    li {
      margin: 4px 0;
      &::marker {
        display: none;
        visibility: hidden;
        color: transparent;
      }
    }
    ul li {
      position: relative;
      //outline: 1px solid red;
      &::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #3a51e0;
        position: absolute;
        left: -16px;
        top: 4px;
      }
    }
    ol {
      margin-top: 12px;
      counter-reset: olcount;
      padding-left: 0;
    }
    ol li {
      position: relative;
      &::before {
        counter-increment: olcount;
        content: counters(olcount, '.') ' ';
        //content: '';
        //display: block;
        //width: 8px;
        //height: 8px;
        //border-radius: 50%;
        //background-color: #3a51e0;
        //position: absolute;
        //left: -16px;
        //top: 4px;
      }
      ol {
        padding-left: 16px;
      }
    }
  }
  details {
    margin-top: 16px;
    margin-right: 16px;
    pre {
      padding-top: 0;
    }
  }
  summary {
    padding: 8px;
    border-radius: 4px;
    background-color: #3eaf7c;
    display: list-item;
    cursor: pointer;
  }
  .cmp-info {
    p {
      margin: 8px 0;
    }
  }
  pre {
    line-height: 0;
    code.hljs {
      padding: 4px;
      line-height: 1.5;
      white-space: pre-wrap;
      position: relative;
      outline: 2px solid blue;
      &::after {
        content: 'code';
        // display: block;
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        color: green;
      }
    }
  }
  .code-item {
    margin: 16px;
    padding: 8px;
    border: 1px solid #aaa;
    border-radius: 8px;
  }
}
</style>
