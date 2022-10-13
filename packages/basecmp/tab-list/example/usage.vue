<template>
  <TabList :list="opts" :curTab="curTab" @active="item => curTab = item.id">
    <button>右侧插槽</button>
  </TabList>
</template>

<script>
import TabList from '../src/index';

export default {
  components: {
    TabList,
  },
  data() {
    return {
      curTab: 'aa',
      opts: [{
        name: '激活(1)',
        id: 'aa'
      }, {
        name: '禁用(2)',
        id: 'bb',
        icon: 'iconfont icon-err'
      }],
    };
  },
};
</script>
