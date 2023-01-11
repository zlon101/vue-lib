<template>
  <div @click="onClick" :class="wrapCls">
    <Tooltip
      v-if="disabled && disabledTips"
      :content="disabledTips"
      class="checkbox-tip"
      :showIfOverflow="false"
      maxWidth="250"
      baseIndex="300"
      placement="top"
    >
      <span :class="['checkbox', checkIconCls]"></span>
    </Tooltip>
    <span v-else :class="['checkbox', checkIconCls]"></span>
    <slot></slot>
  </div>
</template>

<script>
import Tooltip from '@zl/tooltip';
import './checkbox.less';

const TranStrVal = {
  all: 'none',
  some: 'all',
  none: 'all',
};

export default {
  name: 'CheckboxV2',
  inheritAttrs: false,
  components: { Tooltip },
  props: {
    // 复选框状态: 全选|未选|部分选中
    status: {
      type: [Boolean, String], // Boolean | String<'all'|'none'|'some'>
      required: true,
    },
    disabled: Boolean,
    // 不可点击的提示语
    disabledTips: String,
  },
  computed: {
    wrapCls({ status }) {
      const dstCls = ['c-checkbox-gb'];
      if (typeof status === 'boolean') {
        status && dstCls.push('selected');
      } else if (typeof status === 'string') {
        status === 'all' && dstCls.push('selected');
      }
      return dstCls;
    },
    checkIconCls() {
      const dstCls = ['checkbox'];
      const { status } = this;
      const typeofCheck = typeof status;
      if (typeofCheck === 'boolean') {
        dstCls.push(status ? 'all' : 'none');
      } else if (typeofCheck === 'string') {
        dstCls.push(status);
      }
      if (this.disabled) {
        dstCls.push('disable');
      }
      return dstCls.join('-');
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;

      const preVal = this.status;
      const typeofVal = typeof preVal;
      let newVal = '';
      if (typeofVal === 'boolean') {
        newVal = !preVal;
      } else if (typeofVal === 'string') {
        newVal = TranStrVal[preVal];
      }
      this.$emit('update:status', newVal);
      this.$emit('change', newVal);
    },
  },
};
</script>
