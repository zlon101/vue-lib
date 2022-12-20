<template>
  <div :class="['c-checkbox', {checked:statusClass.checked}]">
    <label class="c-checkbox-wrap" @click="$emit('click',$event)">
      <i class="checkbox" :class="statusClass">
        <input type="checkbox" :disabled="disabled" v-model="modelValue" :value="value" @change="_change">
      </i>
      <span class="checkbox-content">
        <template v-if="label">{{label}}</template>
        <slot v-else></slot>
      </span>
    </label>
  </div>
</template>

<script>
import { isSame } from '@pic/utils/lib/object';
import Emitter from './emitter';

export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
    checked: {
      default: false,
    },
    value: {
      default: true,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'middle',
      validator(val) {
        return ['large', 'middle', 'small'].includes(val);
      },
    },
  },
  data() {
    return {
      modelValue: this.checked,
    };
  },
  watch: {
    checked(value) {
      this.modelValue = value;
    },
  },
  computed: {
    statusClass() {
      return {
        checked: Array.isArray(this.modelValue) ? this.modelValue.some(temp => isSame(this.value, temp)) : this.modelValue,
        some: this.indeterminate,
        lg: this.size === 'large',
        small: this.size === 'small',
        disabled: this.disabled,
      };
    },
  },
  methods: {
    _change(e) {
      let value = this.modelValue;
      if (typeof this.checked === 'string' && this.value) {
        if (value) {
          value = e.target.value;
        } else {
          value = '';
        }
      }
      if (typeof this.checked === 'boolean') {
        value = e.target.checked;
      }
      this.$emit('change', value, this.label);
      this.dispatch('FormItem', 'change', value);
    },
  },
};
</script>

<style lang="less" scoped>
.c-checkbox-group{
  display: inline-block;
  &.middle{
    height: 16px;
  }
  &.lg,&.large{
    height: 20px;
  }
  &.small,&.s{
    height: 14px;
  }
}

.c-checkbox {
  display: inline-block;
  // cursor: pointer;
  .c-checkbox-wrap {
    display: flex;
    align-items: center;
    font-size: 13px;
    &.lg {
      font-size: 14px;
    }
    &.small {
      font-size: 12px;
    }
  }
  .checkbox{
    position: relative;
    display: inline-block;
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid #DCDFE6;
    position: relative;
    transition: all 0.2s;
    cursor: pointer;
    &-content{
      margin-left: 8px;
      line-height: 1;
      cursor: pointer;
      &:empty{
        display: none;
      }
    }
    &.lg{
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
    }
    &.small{
      flex:0 0 14px;
      width: 14px;
      height: 14px;
    }
    input{
      display: none;
    }
    &.checked, &.some {
      background-color: #3A51E0;
    }
    &.checked {
      border: none;
      &.disabled{
        background-color: #DCDFE6;
        // background-color: #F0F2F5;
      }
    }
    &.checked{
      &::before{
        display: inline-block;
        content: ' ';
        width: 50%;
        border: 2px solid #fff;
        height: 25%;
        border-top: none;
        border-right: none;
        transform: translateX(-50%) rotate(-45deg);
        top: 20%;
        left: 50%;
        position: absolute;
      }
    }
    &.some{
      border: 1px solid #DCDFE6;
      background-color: unset;
      &::before{
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #3A51E0;
        content: '';
        width: 60%;
        height: 15%;
        border-radius: 2px;
        border: none;
      }
    }
    &.disabled {
      cursor: not-allowed;
      background: #F5F7FA;
    }
  }
}
</style>
