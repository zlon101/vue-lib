<template>
  <section>
    <h2>搜索高亮</h2>
    <input @input="onSearch" />
    <p id="p1" ref="p">
      abcd
      <b>Hello</b>
      World!
    </p>
  </section>
</template>

<script>
/* eslint-disable */
import { HtmlEscapes } from '@packages/utils/src/dom.js';

export default {
  methods: {
    onSearch(e) {
      let searchVal = e.target.value.trim();
      if (!searchVal)  return;

      console.group();
      searchVal = searchVal.replace(/[&<>"']/g, match => HtmlEscapes[match]);
      console.debug(`searchVal: ${searchVal}`);
      const reg = new RegExp(searchVal, 'i');
      const innerHtml = document.body.innerHTML;
      if (!reg.test(innerHtml)) {
        console.debug('搜索结果为0');
        return;
      }
      // 读取元素的 innerText
    }
  },
  mounted() {
    /******
    const p = this.$refs.p;
    // const startNode = p.firstChild.firstChild;
    const startNode = p.firstChild;
    // const endNode = p.lastChild;
    const endNode = p.firstElementChild.firstChild;
    const range = document.createRange();
    range.setStart(startNode, 2);
    range.setEnd(endNode, 3);
    // console.debug(`
    //   startContainer: %o
    //   startOffset: ${range.startOffset}
    //   endContainer: %o
    //   endOffset: ${range.endOffset}
    //   commonAncestorContainer: %o
    // `, range.startContainer, range.endContainer, range.commonAncestorContainer);
    const span = document.createElement('span');
    span.style.cssText = 'background-color:red';
    span.appendChild(range.extractContents());
    range.insertNode(span);********/
  }
};
</script>
