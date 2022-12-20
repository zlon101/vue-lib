<template>
  <DropdownTree :value="value" :data="opts" placeholder="请选择" @input="onInput"></DropdownTree>
</template>

<script>
import DropdownTree from '../index';

export default {
  components: { DropdownTree },
  data() {
    return {
      value: '4',
      opts: {
        value: '1',
        label: '一级 1',
        children: [
          {
            value: '4',
            label: '二级 1-1',
            children: [
              {
                value: '9',
                label: '三级 1-1-1',
              },
              {
                value: '10',
                label: '三级 1-1-2',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    onInput(v) {
      console.log('onInput: ', v, this.value);
    },
  },
};
</script>
