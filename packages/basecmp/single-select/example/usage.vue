<template>
  <div>
    <p>默认样式</p>
    <SingleSelect :value="name" :options="options" @change="item => (name = item.value)" />
    <p style="margin-top:16px">可搜索</p>
    <SingleSelect search :value="name" :options="options" @change="item => (name = item.value)" />
  </div>
</template>

<script>
import SingleSelect from '../src/singleSelect';

export default {
  components: {
    SingleSelect,
  },
  data() {
    return {
      name: '',
      options: [
        {
          label: '张三',
          value: 'a',
        },
        {
          label: '李四',
          value: 'b',
        },
      ],
    };
  },
};
</script>
