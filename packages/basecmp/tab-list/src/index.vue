<template>
  <div class="c-tab-wrap">
    <div v-for="item in list" :key="item.id" :class="['table-tabs-tab', item.class, { active: item.id === curTab }]">
      <LinkBtn :to="getRoute(item)" @click="onClick(item, $event)" replace>{{ item.name }}</LinkBtn>
      <i v-if="item.icon" :class="['icon', item.icon]"></i>
    </div>
    <div v-if="$slots.default" class="right-slot"><slot></slot></div>
  </div>
</template>

<script>
import { updateUrlQuery } from '@zl/utils/lib/url';
import LinkBtn from '@zl/link-btn';

export default {
  name: 'TabList',
  components: {
    LinkBtn,
  },
  props: {
    // { name, id, class, icon }
    list: Array,
    curTab: String,
    manualRoute: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getRoute(tabItem) {
      const curRoute = this.$route;
      return {
        name: curRoute.name,
        path: curRoute.path,
        query: { ...curRoute.query, t: tabItem.id },
        params: { ...curRoute.params },
      };
    },
    onClick(tabItem, event) {
      // 新开标签页
      if (event.ctrlKey || event.metaKey) {
        return;
      }
      this.$emit('active', tabItem);
      if (!this.manualRoute) {
        updateUrlQuery({ t: tabItem.id });
      }
    },
  },
};
</script>

<style lang="less">
.c-tab-wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #ebeef5;
  .table-tabs-tab {
    position: relative;
    display: block;
    padding-bottom: 16px;
    margin: 0 32px;
    color: @text_color_desc;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Regular, sans-serif;
    cursor: pointer;
    &.active::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
      display: inline-block;
      width: 32px;
      height: 4px;
      background: #3a51e0;
      border-radius: 2px;
    }
    &.active {
      color: #3a51e0;
      font-family: PingFangSC-Semibold, sans-serif;
    }
    .icon {
      position: absolute;
      top: 5px;
      right: -4px;
      transform: translateX(100%);
    }
  }
  .right-slot {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>
