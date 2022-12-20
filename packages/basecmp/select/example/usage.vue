<script>
import Selecter from '../index';

export default {
  components: {
    Selecter,
  },
  data() {
    return {
      selectVal2: [],
      selectVal3: [],
      selectVal4: [],
      selectVal5: [],
      opts: [
        {
          label: 'label-a',
          value: 'aaa',
          checked: false,
        },
        {
          label: 'label-b',
          value: 'bbb',
          checked: true,
        },
        {
          label: 'label-c',
          value: 'ccc',
        },
      ],
      presetOpts: [
        {
          label: '预选A',
          value: 'aaa',
        }
      ]
    };
  },
};
</script>

<template>
  <div class="select-exam">
    <p>默认状态</p>
    <pre>{{selectVal2}}</pre>
    <Selecter v-model="selectVal2" :data="opts" />
    <p>预设值</p>
    <pre>{{selectVal3}}</pre>
    <Selecter v-model="selectVal3" :data="opts" :preset="presetOpts" title="标题" placeholder="placeholder" />
    <p>可搜索、多选</p>
    <pre>{{selectVal4}}</pre>
    <Selecter
      v-model="selectVal4"
      :data="opts"
      title="标题"
      multiple
      search
      searchDesc="searchDesc"
      placeholder="placeholder"
    />
  </div>
</template>

<style lang="less">
.select-exam {
  > p {
    font-weight: bold;
    margin: 16px 0;
  }
}
</style>
