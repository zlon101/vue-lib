<template>
  <div class="c-sdp-tabs" :style="{ width: tabsWidth, height: tabsHeight }">
    <div class="sdp-tabs-nav-list" v-sticky="{ disable: disableSticky, stickyTop }">
      <div v-if="visibleNav" ref="sdp-tabs-nav-wrap-ref" class="sdp-tabs-nav-wrap">
        <TabsNav
          v-for="(label, index) in panesLabel"
          :key="index"
          :ref="`sdp-tabs-nav-${label}`"
          :label="label"
          :navLabel="navLabel[index]"
          :icon="iconList[index]"
          :changeRouter="changeRouter"
          :routeName="routeName">
        </TabsNav>
      </div>
      <div class="sdp-tabs-nav-right">
        <i v-if="shadow" class="sdp-tabs-nav-shadow"></i>
        <slot name="nav"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { updateUrlQuery } from '@pic/utils/lib/url';
import sticky from '@pic/sticky';
import TabsNav from './tabsNav.vue';

const PaneCmpName = ['TabsPane', 'TabsPaneV2'];

export default {
  name: 'Tabs',
  directives: { sticky },
  components: { TabsNav },
  props: {
    defaultLabel: String,
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
    value: {},
    disableSticky: {
      type: Boolean,
      default: false,
    },
    changeRouter: {
      type: Boolean,
      default: true,
    },
    routeName: {
      type: String,
      default: 'tab',
    },
    visibleNav: {
      type: Boolean,
      default: true,
    },
    stickyTop: Number,
    hijack: Boolean, // 是否拦截切换
    shadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      panesLabel: [],
      navLabel: [], // 只用来展示
      iconList: [],
      currentPaneLabel: '',
    };
  },
  computed: {
    tabsWidth() {
      return this.width + (!Number.isNaN(Number(this.width)) ? 'px' : '');
    },
    tabsHeight() {
      return this.height + (!Number.isNaN(Number(this.height)) ? 'px' : '');
    },
  },
  watch: {
    value(val) {
      this.currentPaneLabel = val;
    },
  },
  mounted() {
    this.initTabs();
  },
  provide() {
    return {
      switchTabs: this.switchTabs,
      currentPaneLabel: () => this.currentPaneLabel,
      initTabs: this.filterPaneInstances,
    };
  },
  methods: {
    initTabs() {
      this.filterPaneInstances();
      let label = (this.changeRouter && this.$route.query[this.routeName]) || this.value || this.defaultLabel || '';
      if (!this.panesLabel.includes(label)) { // 校验默认值是否存在
        label = this.panesLabel[0] || '';
      }
      this.switchTabs(label);
    },
    filterPaneInstances() {
      if (this.$slots.default) {
        const panelArr = this.findComponentsDownward(this);
        this.panesLabel = [];
        this.navLabel = [];
        this.iconList = [];
        panelArr.forEach(({ label, navLabel, icon } = {}) => {
          this.panesLabel.push(label);
          this.navLabel.push(navLabel || label);
          this.iconList.push(icon);
        });
      } else if (this.panesLabel.length !== 0) {
        this.panesLabel = [];
        this.navLabel = [];
        this.iconList = [];
      }
    },
    switchTabs(label) {
      const next = () => {
        this.currentPaneLabel = label;
        this.$emit('input', label); // v-model
        this.$emit('change', label, this.panesLabel.indexOf(label)); // @change
        this.changeRouter && updateUrlQuery({ [this.routeName]: label }); // 更改url
        this.changeScroll(label); // 调整滚动条位置
      };
      if (this.hijack) {
        this.$emit('beforeSwitch', next);
      } else {
        next();
      }
    },
    changeScroll(label) {
      this.$nextTick(() => {
        const targetWrap = this.$refs['sdp-tabs-nav-wrap-ref'];
        if (targetWrap) {
          const target = this.$refs[`sdp-tabs-nav-${label}`][0].$el;
          const width2 = targetWrap.clientWidth / 2;
          targetWrap.scrollLeft = target.offsetLeft - width2;
        }
      });
    },
    findComponentsDownward(context, ignoreComponentNames = []) {
      if (!Array.isArray(ignoreComponentNames)) {
        ignoreComponentNames = [ignoreComponentNames];
      }
      return context.$children.reduce((components, child) => {
        if (PaneCmpName.includes(child.$options.name)) components.push(child);
        if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
          const foundChilds = this.findComponentsDownward(child);
          return components.concat(foundChilds);
        }
        return components;
      }, []);
    },
  },
};
</script>

<style lang="less">
.c-sdp-tabs {
  display: flex;
  flex-direction: column;
  background: #fff;
  .sdp-tabs-nav-list {
    display: flex;
    border-bottom: 1px solid #EBEEF5;
    background-color: #fff;
  }
  .sdp-tabs-nav-wrap {
    flex: 1 1 auto;
    position: relative;
    display: flex;
    width: 100%;
    padding-top: 4px;
    overflow-x: auto;
    scroll-behavior: smooth;
    .sdp-tabs-nav {
      position: relative;
      cursor: pointer;
      font-size: 16px;
      line-height: 24px;
      margin: 0 32px;
      padding: 0 0 16px 0;
      white-space: nowrap;
      transition: color 0.15s ease-out;
      p {
        color: #7F8FA4;
        position: relative;
        .tabs-nav-icon {
          position: absolute;
          top: 50%;
          right: -4px;
          transform: translate(100%, -50%);
          display: inline-block;
          width: 16px;
          height: 16px;
        }
        .icon_tips_red {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #F56C6C;
        }
      }
      &.active {
        font-weight: bold;
        p {
          color: @theme;
        }
        &::after {
          content: ' ';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 32px;
          height: 4px;
          background: @theme;
          border-radius: 2px;
          transform: translateX(-50%);
        }
      }
    }
  }
  .sdp-tabs-nav-right {
    position: relative;
    .sdp-tabs-nav-shadow {
      position: absolute;
      top: 0;
      left: -80px;
      bottom: 0;
      width: 80px;
      // background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      pointer-events: none;
    }
  }
  .tabs-pane {
    flex: 1;
    position: relative;
    width: 100%;
  }
}
</style>
