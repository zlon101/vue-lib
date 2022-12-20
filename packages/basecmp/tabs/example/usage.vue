<template>
  <Tabs v-model="paneName">
    <TabsPane label="标签A">
      <div style="outline: 1px solid red; height: 200px">内容AAAAAAAAA</div>
    </TabsPane>
    <TabsPane label="标签B">
      <div style="outline: 1px solid blue; height: 200px">内容BBBBBBBB</div>
    </TabsPane>
  </Tabs>
</template>

<script>
import Vue from 'vue';
import Tabs from '../index';

Vue.use(Tabs);

export default {
  data() {
    return {
      paneName: '标签B',
    };
  },
};
</script>
