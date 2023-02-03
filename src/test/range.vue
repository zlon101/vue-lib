<template>
  <div class="fwq">
    <section class="range">
      <h2>搜索高亮</h2>
      <input :value="searchText" @change="onSearch" />
      <p id="p1" ref="p">
        abcd
        <b>Hello</b>
        World!
      </p>

      <p id="p2" ref="p2" style="display: none">
        是的发送到发
        <b>24离开家 水电费</b>
        234232
      </p>

      <div class="hide" style="display: none"></div>
      <div class="hide" style="visibility: hidden"></div>
      <div class="hide" style="opacity: 0"></div>
    </section>
    <section class="j9p">lloWo</section>
  </div>
</template>

<script>
/* eslint-disable */

const log = console.debug;

function isHideElement(element) {
  if (!element.offsetHeight || !element.offsetWidth) {
    return true;
  }
  const styleAttr = window.getComputedStyle(element);
  if (styleAttr.display === 'none'
  || styleAttr.visibility === 'hidden'
  || styleAttr.opacity === '0') {
    return true;
  }
  return false;
}

function traverseDoc(searchVal = 'oWo') {
  const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  const reg = new RegExp(searchVal, 'i');
  if (!reg.test(treeWalker.root.innerText)) {
    return false;
  }

  const currentIsRoot = () => treeWalker.currentNode === treeWalker.root;
  let curNode = treeWalker.nextNode();
  reg.lastIndex = 0;
  let matchEle = null;
  const result = [];
  log('开始遍历');
  console.time();
  while (curNode && !currentIsRoot()) {
    const innerText = curNode.innerText;
    if (isHideElement(curNode) || !reg.test(curNode.innerText)) {
      matchEle && result.push(matchEle);
      matchEle = null;
      curNode = treeWalker.nextSibling();
      while (!curNode && !currentIsRoot()) {
        // 没有下一个兄弟节点, 当前 current node 没有变化
        // treeWalker.previousNode();
        treeWalker.parentNode();
        curNode = treeWalker.nextSibling();
      }
    } else {
      matchEle = curNode;
      matchEle = curNode;
      curNode = treeWalker.nextNode();
    }
    reg.lastIndex = 0;
  }
  matchEle && result.push(matchEle);

  const targetEles = [];
  let N = result.length;
  result.forEach((node, ind) => {
    if (ind === N - 1 || !node.contains(result[ind + 1])) {
      targetEles.push(node);
    }
  });

  // log(`
  // nodeList: %o
  // targetEles: %o
  // `, nodeList, targetEles);

  for (const ele of targetEles) {
    reg.lastIndex = 0;
    surroundContents(ele, reg.exec(ele.innerText)[0].trim());
  }
  console.timeEnd();
}


function surroundContents(ele, matchText) {
  log('surroundContents start');
  let rangeStart = null,
    rangeEnd = null,
    curNode = null,
    fullText = '',
    nodeStack = [],
    regRes = null;

  const NodeIterator = document.createNodeIterator(ele, NodeFilter.SHOW_TEXT);

  while (curNode = NodeIterator.nextNode()) {
    nodeStack.push(curNode);
    fullText = nodeStack.map(node => node.wholeText.trim()).join('');
    if (fullText.includes(matchText)) {
      rangeEnd = { node: curNode };
      let startNode;
      do {
        startNode = nodeStack.shift();
        fullText = nodeStack.map(node => node.wholeText.trim()).join('');
      } while (fullText.includes(matchText));
      rangeStart = { node: startNode };
      break;
    }
  }

  let startInd = 0,
    startText = rangeStart.node.wholeText,
    endText = rangeEnd.node.wholeText,
    endInd = endText.length - 1;

  // 空格换行处理？
  if (rangeStart.node && rangeStart.node === rangeEnd.node) {
    startInd = startText.split(matchText)[0].length;
    endInd = startInd + matchText.length - 1;
  } else {
    while (startInd < startText.length && !matchText.includes(startText.slice(startInd))) {
      ++startInd;
    }
    while (endInd > 0 && !matchText.includes(endText.slice(0, endInd))) {
      --endInd;
    }
  }
  rangeStart.offset = startInd;
  rangeEnd.offset = endInd;

  // log(`
  //   startInd: ${rangeStart.offset}
  //   ${startText.slice(startInd)}
  //   endInd: ${rangeEnd.offset}
  //   ${endText.slice(0, endInd)}
  //   ${rangeStart.node === rangeEnd.node}
  // `);

  if (rangeStart && rangeEnd) {
    // 必须是text类型的节点
    if ([rangeStart.node, rangeEnd.node].some(_node => _node.nodeType !== 3)) {
      throw new Error('rangeStart 或 rangeEnd 节点不是 text 类型');
    }
    if (rangeStart.node === rangeEnd.node) {
      rangeEnd.offset++;
    }
    const range = document.createRange();
    range.setStart(rangeStart.node, rangeStart.offset);
    range.setEnd(rangeEnd.node, rangeEnd.offset);

    const span = document.createElement('span');
    span.style.cssText = 'background-color:red;font-size:larger';

    span.appendChild(range.extractContents());
    range.insertNode(span);
  } else {
    console.debug('rangeStart 或 rangeEnd 为null');
  }
  log('surroundContents end');
}

export default {
  data() {
    return {
      searchText: '',
    };
  },
  mounted() {
    // traverseDoc('a');
    return;

    const p1 = this.$el.querySelector('#p1');
    const startNode = p1.childNodes[1].firstChild;
    const endNode = startNode;

    const range = document.createRange();
    range.setStart(startNode, 1);
    range.setEnd(startNode, 4);

    const span = document.createElement('span');
    span.style.cssText = 'background-color:red;font-size:larger';
    span.appendChild(range.extractContents());
    range.insertNode(span);
  },
  methods: {
    onSearch(e) {
      let searchVal = e.target.value.trim();
      this.searchText = searchVal;
      if (!searchVal) return;

      traverseDoc(searchVal);
    },
  },
};
</script>

<style>
input {
  border: 1px solid red;
  border-radius: 4px;
  height: 40px;
}
.hide {
  width: 100px;
  height: 200px;
  outline: 1px solid red;
}
</style>
