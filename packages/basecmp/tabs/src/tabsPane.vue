<template>
  <div
    class="tabs-pane"
    v-if="currentPaneLabel() === label"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabsPane',
  props: {
    label: String, // 用来切换当做key来用，这里名字有遗留问题
    navLabel: String, // 用来展示, 可以不传默认取label
    icon: String,
  },
  watch: {
    label() {
      this.initTabs();
    },
    navLabel() {
      this.initTabs();
    },
    icon() {
      this.initTabs();
    },
  },
  inject: ['currentPaneLabel', 'initTabs'],
  mounted() {
    this.initTabs();
  },
  destroyed() {
    this.initTabs();
  },
};
</script>
