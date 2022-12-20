<template>
  <div
    :class="['sdp-tabs-nav', currentPaneLabel() === label && 'active']" @click="switchTabs(label)">
    <router-link :to="routerPath()" replace>
      <p>{{ navLabel || label }}<i v-if="icon" :class="icon === 'icon_tips_red' ? 'icon_tips_red' : 'tabs-nav-icon'"></i></p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TabsNav',
  props: {
    label: String, // 用来切换当做key来用，这里名字有遗留问题
    navLabel: String, // 用来展示, 可以不传默认取label
    icon: String,
    routeName: String,
    changeRouter: Boolean,
  },
  inject: ['switchTabs', 'currentPaneLabel'],
  methods: {
    routerPath() {
      const data = {
        name: this.$route.name,
        path: this.$route.path,
        query: { ...this.$route.query },
        params: { ...this.$route.params },
      };
      if (this.changeRouter) {
        data.query[this.routeName] = this.label;
      }
      return data;
    },
  },
};
</script>
