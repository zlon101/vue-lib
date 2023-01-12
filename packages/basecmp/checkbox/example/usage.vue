<template>
  <div>
    <h3>普通用法</h3>
    <Checkbox :status.sync="status1">
      <div>
        <p>自定义label</p>
        <p>自定义label</p>
      </div>
    </Checkbox>
    <h3>部分选中</h3>
    <Checkbox :status.sync="status2">自定义label</Checkbox>
    <h3>disabled</h3>
    <Checkbox :status.sync="status2" disabled disabledTips="提示语提示语提示语提示语">自定义label</Checkbox>
    <hr style="height:2px;border-top:1px solid red"/>
    <h3>CheckboxGroup 水平</h3>
    <CheckboxGroup :options.sync="options" margin="32px" class="group" />
    <h3>CheckboxGroup 垂直</h3>
    <p>CheckboxGroup 复选框的状态有两个方式决定，有且只有一种方式有效，如下</p>
    <h3>(1). 由options[index].status 决定, 优先级高于第2种</h3>
    <div class="group">
      <CheckboxGroup :options.sync="optionsV2" vertical />
      <!-- <pre>{{optionsV2}}</pre> -->
      <button @click="onUpdateAll('all')">全选</button>
      <button @click="onUpdateAll('none')">全不选</button>
      <button @click="onUpdateAll('some')">部分选中</button>
    </div>
    <h3>(2). 由已选中id列表决定</h3>
    <p>这种无法处理部分选中状态</p>
    <div class="group">
      <CheckboxGroup :options="optionsV3" :checkeds.sync="valueV3" vertical />
      <button @click="onUpdateAllV3(true)">全选</button>
      <button @click="onUpdateAllV3(false)">全不选</button>
    </div>
  </div>
</template>

<script>
import Checkbox, { CheckboxGroup } from '../index';

export default {
  components: { Checkbox, CheckboxGroup },
  data() {
    return {
      status1: false,
      status2: 'some',
      options: [
        {
          id: 1,
          label: 'some label',
          status: false,
        },
        {
          id: 2,
          label: '<span class="iconfont icon-add"></span> 自定义icon',
          status: 'some',
        },
      ],
      optionsV2: [
        {
          id: 100,
          label: 'some label',
        },
        {
          id: 200,
          label: '<span class="iconfont icon-cross"></span> 自定义icon',
        },
      ],
      optionsV3: [
        {
          id: 100,
          label: 'some label',
        },
        {
          id: 200,
          label: '呵呵哈哈哈或',
        },
      ],
      valueV3: [200],
    };
  },
  methods: {
    onUpdateAll(val) {
      this.optionsV2 = this.optionsV2.map(item => ({ ...item, status: val }));
    },
    onUpdateAllV3(val) {
      this.valueV3 = val ? this.optionsV3.map(item => item.id) : [];
    },
  },
};
</script>

<style lang="less" scoped>
h3 {
  margin: 16px 0;
}
.group {
  outline: 1px solid forestgreen;
}
</style>