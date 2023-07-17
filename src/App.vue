<script setup>
import {ref, reactive, defineOptions, computed, unref, toRaw, toRef} from 'vue';
import { IconGithub } from '@/icon';

window._IsProd = import.meta.env.PROD;
const IgnoreDirs = ['node_modules'];
const loadFile = (filePath, loader, cfg) => {
  if (IgnoreDirs.some(item => filePath.includes(item))) {
    return;
  }
  // filePath: '../packages/business/time-input/package.json'
  const pathFras = filePath.split('/');
  loader().then(res => {
    const pkgName = res.name.split('/').pop();
    cfg.router.push({
      name: res.name,
      path: `/${cfg.dir}/${pathFras[pathFras.length - 2]}`,
      desc: res.description,
      pkgName,
    });
  });
};

const CompCfg = reactive({
  base: {
    router: [],
    text: '基础组件',
    dir: 'basecmp',
  },
  business: {
    router: [],
    text: '业务组件',
    dir: 'business',
  },
  directive: {
    router: [],
    text: '指令',
    dir: 'directives',
  },
  extend: {
    router: [],
    text: '原型链方法',
    dir: 'extends',
  },
});

// 基础组件
let moduleObj = import.meta.glob(['../packages/basecmp/**/package.json', '!../packages/**/node_modules']);
// ['../packages/business/time-input/package.json']
Object.keys(moduleObj).forEach(filePath => loadFile(filePath, moduleObj[filePath], CompCfg.base));

// 业务组件
moduleObj = import.meta.glob(['../packages/business/**/package.json', '!../packages/**/node_modules']);
Object.keys(moduleObj).forEach(filePath => loadFile(filePath, moduleObj[filePath], CompCfg.business));

// 指令
moduleObj = import.meta.glob(['../packages/directives/**/package.json', '!../packages/**/node_modules']);
Object.keys(moduleObj).forEach(filePath => loadFile(filePath, moduleObj[filePath], CompCfg.directive));

// 扩展的全局vue方法
moduleObj = import.meta.glob(['../packages/extends/**/package.json', '!../packages/**/node_modules']);
Object.keys(moduleObj).forEach(filePath => loadFile(filePath, moduleObj[filePath], CompCfg.extend));

// 组件script
defineOptions({
  name: 'App',
});

const Indexs = Object.keys(CompCfg);
const homeUrl = window._IsProd ? 'https://zlon101.github.io/npm-lib/#/' : '/';
const searchVal = ref('');
const curInd = ref('base');

const fullpath = window.location.href;
const idx = Indexs.findIndex(k => fullpath.includes(CompCfg[k].dir));
if (idx !== -1) {
  curInd.value = Indexs[idx];
}

const sideRoutes = computed(() => {
  const curList = CompCfg[curInd.value].router;
  if (!searchVal.value) return curList;
  const reg = new RegExp(searchVal.value, 'i');
  const all = Object.keys(CompCfg).reduce((acc, k) => acc.concat(CompCfg[k].router), []);
  return all.filter(item => reg.exec(item.pkgName + item.desc));
});

const onChangeIndex = (_val) => {
  curInd.value = _val;
};
const onInputSearch = e => {
  searchVal.value = e.target.value.trim();
};
</script>

<template>
  <div id="app">
    <header class="header-wrap">
      <a :href="homeUrl">主页</a>
      <div class="right">
        <input :value="searchVal" @input="onInputSearch" class="search-input" placeholder="按组件名和描述搜索，可使用正则" />
        <router-link to="/tool">工具函数</router-link>
        <router-link to="/style">全局样式</router-link>
        <router-link to="/image">所有图像</router-link>
        <a href="https://github.com/zlon101/npm-lib" target="_blank" rel="noopener noreferrer">
          <IconGithub s="24px" />
        </a>
      </div>
    </header>
    <div class="page-wrap">
      <div class="sidebar-wrap">
        <p class="ind-t">索引</p>
        <div>
          <p
            v-for="k in Indexs"
            @click="onChangeIndex(k)"
            :class="['ind-item', { active: k === curInd }]"
            :key="k"
          >{{ CompCfg[k].text }}</p>
        </div>
        <router-link v-for="item in sideRoutes" :to="item.path" class="r-item" :key="item.name">
          <p class="t" :title="item.desc">{{ item.pkgName }}</p>
          <p class="desc" :title="item.desc">{{ item.desc }}</p>
        </router-link>
      </div>
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="less">
#app {
  // max-width: 1440px;
  margin: 0 auto;
}
.page-wrap {
  padding-top: 40px;
  position: relative;
}
.header-wrap {
  width: 100%;
  // max-width: 1440px;
  height: 40px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  z-index: 100;
  font-weight: bold;
  background: #fff;
  position: fixed;
  top: 0;
  > *,
  .right {
    display: inline-flex;
    align-items: center;
    > * {
      margin-right: 8px;
      cursor: pointer;
    }
  }
  > :last-child {
    margin: 0 0 0 auto;
  }
  .search-input {
    height: 32px;
    width: 250px;
    margin-left: auto;
    text-indent: 8px;
    cursor: initial;
    font-size: 12px;
  }
}
.sidebar-wrap {
  width: 200px;
  padding: 0 16px;
  position: fixed;
  top: 40px;
  bottom: 0;
  overflow: auto;
  border-right: 1px solid #d3d3d3;
  .ind-t {
    padding-top: 8px;
    font-weight: bold;
  }
  .ind-item {
    margin: 8px 0;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    &.active::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: blue;
    }
    &:last-child {
      margin-bottom: 12px;
      border-bottom: 2px solid #7f8fa4;
    }
  }
  .r-item {
    display: block;
    margin-bottom: 12px;
    &:hover .t {
      color: #3eaf7c;
      font-size: 20px;
    }
  }
  .t {
    font-size: 16px;
    font-weight: bold;
  }
  .desc {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    font-weight: normal;
    color: #111419;
    text-overflow: ellipsis;
  }
  .router-link-active .t {
    color: #3eaf7c;
    font-size: 20px;
  }
}
.page-content {
  margin-left: 210px;
}
</style>
