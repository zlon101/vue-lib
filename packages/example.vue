<script>
// 组件的 example 模板
import Api from '../src/axios';

export default {
  props: {
    packageJson: Object,
    compPath: String,
    nocode: Boolean,
  },
  data() {
    return {
      oldCode: '',
      newCode: '',
      canHlight: false,
      canGetCode: false,
    };
  },
  computed: {
    deps() {
      const { dependencies } = this.packageJson;
      const list = [];
      if (dependencies) {
        Object.keys(dependencies).forEach(k => {
          list.push(`${k}: ${dependencies[k]}`);
        });
      }
      return list;
    },
  },
  mounted() {
    this.canGetCode = Boolean(this.$slots.usage) && process.env.NODE_ENV === 'development';
    if (!this.canGetCode) return;

    Api.getCode(this.compPath).then(res => {
      const codeStr = res.data.codeStr;
      if (!this.oldCode) {
        this.oldCode = codeStr;
      }
      this.canHlight = window.hljs;
      if (window.hljs) {
        this.newCode = window.hljs.highlight(codeStr, { language: 'html' }).value;
      } else {
        this.newCode = codeStr;
      }
    });
  },
  methods: {
    onUpdateCode() {
      const nCode = this.$refs.code.textContent;
      Api.setCode(this.compPath, nCode);
    },
    onReset() {
      if (!this.canGetCode) return;
      const nCode = this.$refs.code.textContent;
      if (nCode !== this.oldCode) {
        Api.setCode(this.compPath, this.oldCode);
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
      <p v-if="deps.length"><b>依赖：</b></p>
      <ul style="margin-left:16px">
        <li v-for="item in deps" :key="item">{{item}}</li>
      </ul>
    </div>

    <h1 class="margin-top">2.使用方法</h1>
    <div class="markdown-body">
      <slot name="readme"></slot>
    </div>

    <h1 class="margin-top">3.代码示例</h1>
    <slot name="usage"></slot>
    <details open v-if="canGetCode">
      <summary>
        <span>code</span>
        <button @click="onUpdateCode">更新</button>
        <button @click="onReset">重置</button>
        <span style="margin-left: 16px">(注: 点击更新会直接修改源码, 离开当前路由后会自动恢复)</span>
      </summary>
      <pre v-if="canHlight"><code class="hljs" ref="code" v-html="newCode" contenteditable="true"></code></pre>
      <code v-else ref="code" class="hljs" contenteditable="true">{{ newCode }}</code>
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
    pre code {
      background-color: #000;
    }
  }
  details {
    margin-top: 16px;
    margin-right: 16px;
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
  pre code {
    padding: 4px;
    display: block;
    white-space: pre-wrap;
    position: relative;
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
  .code-item {
    margin: 16px;
    padding: 8px;
    border: 1px solid #aaa;
    border-radius: 8px;
  }
}
</style>
