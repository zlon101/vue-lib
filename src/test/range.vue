<template>
  <div class="fwq">
    <section class="range">
      <h2>搜索高亮</h2>
      <input @input="onSearch" />
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
    <!--<section class="j9p">lloWo</section>-->
  </div>
</template>

<script>
/* eslint-disable */

const log = console.debug;

function traverseDoc(searchVal = 'lloWo') {
  // createTreeWalker createNodeIterator
  const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  const reg = new RegExp(searchVal, 'i');
  if (!reg.test(treeWalker.root.innerText)) {
    return false;
  }

  const nodeList = []; // 调试用
  let curNode = treeWalker.nextNode();
  reg.lastIndex = 0;
  let matchEle = null;
  const result = [];
  while (curNode) {
    const innerText = curNode.innerText;
    if (reg.test(innerText)) {
      matchEle = curNode;
      nodeList.push(curNode);
      matchEle = curNode;
      curNode = treeWalker.nextNode();
    } else {
      matchEle && result.push(matchEle);
      matchEle = null;
      curNode = treeWalker.nextSibling();
      if (!curNode) {
        treeWalker.previousNode();
        treeWalker.parentNode();
        curNode = treeWalker.nextSibling();
      }
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
}

function surroundContents(ele, matchText) {
  // const tmpEle = document.createElement('p');
  // tmpEle.style.display = 'none';
  // document.body.appendChild(tmpEle);
  let rangeStart = null,
    rangeEnd = null,
    curNode = null,
    fullText = '',
    nodeStack = [],
    regRes = null;

  const NodeIterator = document.createNodeIterator(ele, NodeFilter.SHOW_TEXT);

  while (curNode = NodeIterator.nextNode()) {
    // tmpEle.textContent = curNode.wholeText;
    // const nodeText = tmpEle.innerText;
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
    endInd = 0,
    tmpInd = 0,
    startText = rangeStart.node.wholeText,
    endText = rangeEnd.node.wholeText;

  startInd = /[^\s\n]/.exec(startText).index;
  while (startText[startInd] !== matchText[tmpInd]
    && startInd < startText.length
    && tmpInd < matchText.length
    ) {
    ++startInd, ++tmpInd;
  }
  --startInd;
  rangeStart.offset = startInd;


  endInd = 0;
  tmpInd = startInd;
  log('xxxx', matchText[tmpInd]);
  while (endText[endInd] === matchText[tmpInd]
    && endInd > 0
    && tmpInd > 0
    ) {
    --endInd, --tmpInd;
  }
  ++endInd, ++tmpInd;

  // log(`
  // matchText: ${matchText}
  // fullText: ${fullText}
  // ${startText.slice(startInd)}
  // ${endText.slice(0, endInd)}
  // rangeStart: %o
  // rangeEnd: %o
  // `,
  //   rangeStart,
  //   rangeEnd,
  // );

  /***
  if (rangeStart && rangeEnd) {
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
   ******************/
  // document.body.removeChild(tmpEle);
}

export default {
  mounted() {
    traverseDoc();
  },
  methods: {
    onSearch(e) {
      let searchVal = e.target.value.trim();
      if (!searchVal) return;

      console.group();
      log(`searchVal: ${searchVal}`);

      const reg = new RegExp(searchVal, 'i');
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
