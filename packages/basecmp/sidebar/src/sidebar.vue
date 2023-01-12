<template>
  <div ref="sidebar-ref" :class="['c-sidebar', visible ? 'visible' : 'hidden']">
    <slot name="header"></slot>
    <Scrollbar class="nav">
      <div v-for="(route, index) in routes" :key="route.path" class="mod-item">
        <MenuItem
          v-if="hasChild(route)"
          v-bind="$props"
          :title="route.meta.title"
          :vpath="route.meta.vpath"
          :icon="iconCmp[route.meta.icon]"
          :iconAttr="getIconAttr(route.meta)"
          :unfold="isUnfold(route, index)"
          :hasChild="true"
          @click.native="onUnfold(index)"
        />
        <!-- 没有二级菜单的一级菜单 -->
        <router-link v-else :to="route.name ? {name: route.name} : route.meta.fullpath">
          <MenuItem
            v-bind="$props"
            :vpath="route.meta.vpath"
            :icon="iconCmp[route.meta.icon]"
            :iconAttr="getIconAttr(route.meta)"
            :title="route.meta.title"
          />
        </router-link>
        <!-- 二级菜单 -->
        <div
          v-if="hasChild(route)"
          :style="{ maxHeight: isUnfold(route, index) ? `${route.children.length * 44 + 12}px` : 0 }"
          :class="['menu-group', { unfold: isUnfold(route, index) }]"
        >
          <router-link v-for="child in childMap[route.path]" :key="child.name" :to="child.name ? {name:child.name} : child.meta.fullpath">
            <MenuItem v-bind="$props" :title="child.meta.title" :vpath="child.meta.vpath" />
          </router-link>
        </div>
      </div>
    </Scrollbar>
  </div>
</template>

<script>
import Scrollbar from '@zl/scrollbar';
import MenuItem from './menuItem.vue';

export default {
  name: 'Sidebar',
  inheritAttrs: false,
  components: { MenuItem, Scrollbar },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    miniScreen: Boolean,
    routes: {
      type: Array,
      required: true,
    },
    iconCmp: Object,
    iconCfg: Object,
  },
  watch: {
    'routes.length': {
      handler(N) {
        if (!N) return;
        const curPath = this.$route.path;
        this.routes.forEach((nav, ind) => {
          if (curPath.includes(nav.path)) {
            this.unfoldInd.push(ind);
          }
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      unfoldInd: [],
    };
  },
  computed: {
    childMap() {
      const leveloneRouteArr = this.routes;
      const cache = {};
      if (!leveloneRouteArr) return cache;
      leveloneRouteArr.forEach(item => {
        if (!item.children) {
          cache[item.path] = [];
          return;
        }
        cache[item.path] = item.children.filter(item2 => !item2.meta || !item2.meta.parent);
      });
      return cache;
    },
  },
  mounted() {
    document.addEventListener('click', this.onHidden);
  },
  destroyed() {
    document.removeEventListener('click', this.onHidden);
  },
  methods: {
    getIconAttr(meta) {
      const defaultAttr = this.iconCfg.default || this.iconCfg;
      const curIcon = this.iconCfg[meta.icon];
      if (!curIcon) return defaultAttr;
      return {
        ...defaultAttr,
        fill: { ...(defaultAttr.fill || {}), ...(curIcon.fill || {}) },
        stroke: { ...(defaultAttr.stroke || {}), ...(curIcon.stroke || {}) },
      };
    },
    isUnfold(nav, navInd) {
      return this.unfoldInd.includes(navInd);
    },
    onHidden({ target }) {
      if (!this.miniScreen) {
        return false;
      }
      // 小屏点击空白自动隐藏
      const sidebar = this.$refs['sidebar-ref'];
      const hamburger = document.getElementById('hamburger');
      if (!sidebar.contains(target) && !hamburger.contains(target)) {
        this.$emit('update:visible', false);
      }
    },
    hasChild(route) {
      return (route.children || []).length > 0;
    },
    onUnfold(index) {
      const _idx = this.unfoldInd.indexOf(index);
      _idx === -1 ? this.unfoldInd.push(index) : this.unfoldInd.splice(_idx, 1);
    },
  },
};
</script>

<style lang="less">
.c-sidebar {
  width: 208px;
  min-width: 208px;
  height: 100%;
  box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.08);
  z-index: 100;
  background: #fff;
  transition: transform 0.3s ease-out;
  &.visible {
    transform: translateX(0);
  }
  &.hidden {
    transform: translateX(-200px);
  }
  @media screen and (max-width: 1024px) {
    & {
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  .nav {
    width: 100%;
    height: calc(100% - 163px);
    .menu-group {
      overflow: hidden;
      transition: all 0.15s ease-out;
    }
  }
  .version {
    color: #7f8fa4;
    font-size: 12px;
    padding: 16px;
  }
}
</style>
