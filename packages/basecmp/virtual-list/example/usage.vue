<template>
  <div class="p-virtual-list">
    <div class="tab-list" @click="toggleAct">
      <span data-k="fix-size">固定尺寸</span>
      <span data-k="dynamic-size">动态尺寸</span>
      <span data-k="inline-block">多列布局</span>
      <span data-k="infinite-loading">无限下拉</span>
      <span data-k="keep-state">维护状态</span>
      <span data-k="page-mode">页面模式</span>
      <span data-k="chat-room">chat-room</span>
    </div>
    <component :is="who" />
  </div>
</template>

<script>
import VirtualList from '../src';
window._APP.component('virtual-list', VirtualList);

const IgnoreDirs = ['node_modules'];
const loadFile = (pkgPath, component, compDir, list) => {
  if (IgnoreDirs.some(item => pkgPath.includes(item))) {
    return;
  }
  const paths = pkgPath.split('/');
  const pkgName = paths[paths.length - 3];
  const caseName = compDir.replace(/^\w/, c => c.toUpperCase()) + pkgName.replace(/^\w/, c => c.toUpperCase());
  list.push({
    name: caseName,
    path: pkgName,
    component,
  });
};

const requireGlobal = import.meta.glob('./components/*.vue', {
  import: 'default',
  eager: true,
});
Object.keys(requireGlobal).forEach(pkgPath => {
  const cmp = requireGlobal[pkgPath];
  if (!cmp.name) {
    console.error(`${pkgPath} no component name!`);
    return;
  }
  window._APP.component(cmp.name, cmp);
});

// 批量注册局部组件
const requireComponent = import.meta.glob('./views/**/(index|Main).vue', {
  import: 'default',
  eager: true,
});
const cmps = {};
Object.keys(requireComponent).map(fileName => {
  const cmp = requireComponent[fileName];
  if (!cmp.name) {
    console.error(`${fileName} no component name!`);
    return;
  }
  cmps[cmp.name] = cmp;
});

export default {
  components: cmps,
  data() {
    return {
      who: 'fix-size',
    };
  },
  methods: {
    toggleAct(e) {
      this.who = e.target.getAttribute('data-k');
    },
  },
};
</script>

<style lang="less" scoped>
.p-virtual-list {
  @media (max-width: 640px) {
    padding: 3px;
    width: 100%;
  }
}

.tab-list {
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 1em;
  white-space: nowrap;
  overflow-x: auto;
  > * {
    margin-right: 16px;
    color: #3a51e0;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    padding: 0;
    position: relative;
    background-color: unset;
    color: unset;
    height: unset;
    padding-left: unset;
    align-items: unset;
  }
  .router-link-exact-active,
  .router-link-exact-active:hover {
    color: inherit;
    cursor: default;
    text-decoration: underline;
    @media (max-width: 640px) {
      border-bottom: 1px solid;
      border-color: #606c76;
      text-decoration: none;
    }
  }
}

.example {
  width: 776px;
  padding-top: 3em;
  @media (max-width: 640px) {
    margin: unset;
    padding: unset;
    width: unset;
    padding-top: unset;
  }
}
.example-content {
  margin-top: 1em;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

.scroll-touch {
  -webkit-overflow-scrolling: touch;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: #f4f4f4;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(0, 0, 0, 0.12);
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #b2b2b2;
  }
}

code {
  background-color: pink !important;
}
</style>
