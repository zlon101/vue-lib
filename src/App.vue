<script>
const IgnoreDirs = ['node_modules'];
const loadFile = (filePath, cfg) => {
  if (IgnoreDirs.some(item => filePath.includes(item))) {
    return;
  }
  // filePath: button/example/index.vue
  if (/example\/index\.vue$/.test(filePath)) {
    filePath = filePath.replace(/^\.\//, '');
    const compDir = filePath.split('/')[0];
    import(/* webpackInclude: /\package.json$/ */ `../packages/${cfg.dir}/${compDir}/package.json`).then(res => {
      const pkgName = res.name.split('/').pop();
      cfg.router.push({
        name: res.name,
        path: `/${cfg.dir}/${compDir}`,
        desc: res.description,
        pkgName,
      });
    });
  }
};

const CompCfg = {
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
};

// 基础组件
const reqCtx = require.context('../packages/basecmp', true, /index\.vue$/);
reqCtx.keys().forEach(filePath => loadFile(filePath, CompCfg.base));

// 业务组件
const reqCtx2 = require.context('../packages/business', true, /index\.vue$/);
reqCtx2.keys().forEach(filePath => loadFile(filePath, CompCfg.business));

// 指令
const reqCtx3 = require.context('../packages/directives', true, /index\.vue$/);
reqCtx3.keys().forEach(filePath => loadFile(filePath, CompCfg.directive));

// 扩展的全局vue方法
const reqCtx4 = require.context('../packages/extends', true, /index\.vue$/);
reqCtx4.keys().forEach(filePath => loadFile(filePath, CompCfg.extend));

export default {
  name: 'App',
  data() {
    return {
      CompCfg,
      searchVal: '',
      Indexs: Object.keys(CompCfg),
      curInd: 'base',
    };
  },
  created() {
    const fullpath = window.location.pathname;
    const idx = this.Indexs.findIndex(k => fullpath.includes(CompCfg[k].dir));
    if (idx !== -1) {
      this.curInd = this.Indexs[idx];
    }
  },
  computed: {
    sideRoutes({ searchVal, curInd }) {
      const curList = CompCfg[curInd].router;
      if (!searchVal) return curList;
      const reg = new RegExp(searchVal, 'i');
      const all = Object.keys(CompCfg).reduce((acc, k) => acc.concat(CompCfg[k].router), []);
      return all.filter(item => reg.exec(item.pkgName + item.desc));
    },
  },
  methods: {
    onChangeIndex(val) {
      this.curInd = val;
    },
    onInputSearch(e) {
      this.searchVal = e.target.value.trim();
    },
  },
};
</script>

<template>
  <div id="app">
    <header class="header-wrap">
      <a href="/">主页</a>
      <div class="right">
        <input :value="searchVal" @input="onInputSearch" class="search-input" placeholder="按组件名和描述搜索，可使用正则" />
        <router-link to="/tool">工具函数</router-link>
        <router-link to="/style">全局样式</router-link>
        <router-link to="/image">所有图像</router-link>
        <!--<a href="http://127.0.0.1:xx" target="_blank" rel="noopener noreferrer">Registry</a>-->
        <a href="https://v12w.x34y.com/pikachu/picnpm" target="_blank" rel="noopener noreferrer">GitLab</a>
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
      <router-view class="page-content" />
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
  .right > * {
    margin-right: 8px;
    cursor: pointer;
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
