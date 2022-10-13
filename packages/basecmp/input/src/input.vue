<template>
  <div
    :style="{ width }"
    :class="[
      'c-sdp-input',
      search && 'search',
      clean && 'clean',
      sizeMap[size],
      focus && 'focus',
      disabled && 'disabled',
      type === 'textarea' && 'textarea',
    ]"
  >
    <div class="inputBox">
      <IconSearch v-if="search" class="sdp-input-search-icon" @click="$emit('search')" s="24px" />
      <input
        v-if="type !== 'textarea'"
        :tabindex="tabindex"
        ref="input"
        :type="innerType"
        v-bind="$attrs"
        :disabled="disabled"
        v-on="{ ...$listeners, input: handleInput, change: handleChange, focus: handleFocus, blur: handleBlur }"
        :value="value"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
      />
      <textarea
        v-else
        :tabindex="tabindex"
        ref="input"
        :value="value"
        :disabled="disabled"
        v-on="{ ...$listeners, input: handleInput, change: handleChange, focus: handleFocus, blur: handleBlur }"
        :autocomplete="autocomplete"
        v-bind="$attrs"
        :maxlength="maxlength"
      ></textarea>
      <IconCross v-if="clean" @click="cleanValue" :fill="{0: '#C0C4CC'}" class="sdp-input-close-icon" />
    </div>
    <span v-show="showCount" :class="['sdp-input-counter', type === 'textarea' && 'textarea']">
      {{ textLength }}/{{ maxlength }}
    </span>
    <slot></slot>
    <i
      v-if="type === 'password' && password"
      class="input-icon"
      :class="showPwd ? 'icon-eye-close-gray' : 'icon-eye-blue'"
      @click="showPwd = !showPwd"
    ></i>
    <IconCopy2 v-if="copy" class="input-icon copy_icon_black" @click="handleCopy" />
    <i v-if="iconClass" :class="['input-icon', iconClass]" @click="handleClickIcon"></i>
  </div>
</template>

<script>
import { copyString } from '@zl/utils';
import toast from '@zl/extend-toast';
import { IconSearch, IconCross, IconCopy2 } from '@zl/icon';
import Emitter from './emitter';

const sizeMap = {
  large: 'large',
  l: 'large',
  small: 'small',
  s: 'small',
};
export default {
  inheritAttrs: false,
  name: 'SdpInput',
  components: { IconSearch, IconCross, IconCopy2 },
  mixins: [Emitter],
  props: {
    search: {
      type: Boolean,
      default: false,
    },
    clean: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    copy: Boolean,
    min: [String, Number],
    max: [String, Number],
    value: [String, Number],
    tabindex: String,
    type: {
      type: String,
      default: 'text',
    },
    disabled: Boolean,
    autocomplete: {
      type: String,
      default: 'off',
    },
    showCount: {
      type: Boolean,
      default: false,
    },
    width: String,
    size: {
      type: String,
      default: 'large',
      validator(val) {
        return Object.keys(sizeMap).includes(val);
      },
    },
    maxlength: {
      type: [String, Number],
      default: '',
    },
    cleanBlank: {
      type: Boolean,
      default: true,
    },
    iconClass: String,
  },
  data() {
    return {
      sizeMap,
      currentValue: this.value,
      isInput: false,
      showPwd: false,
      focus: false,
    };
  },
  computed: {
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }
      return (this.value || '').length;
    },
    innerType() {
      if (this.type === 'password') {
        return this.showPwd ? 'text' : 'password';
      } else if (this.type === 'num') {
        return 'text';
      }
      return this.type;
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },
  methods: {
    handleInput(e) {
      if (this.type === 'num') {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      }
      if ((this.type === 'number' || this.type === 'num') && e.target.value.length) {
        if (this.min !== undefined && Number(e.target.value) < Number(this.min)) {
          e.target.value = Number(this.min);
        }
        if (this.max !== undefined && Number(e.target.value) > Number(this.max)) {
          e.target.value = Number(this.max);
        }
      }
      if (this.maxlength) {
        e.target.value = String(e.target.value).substring(0, Number(this.maxlength));
      }
      this.$emit('inputChange', e);
      this.$emit('input', e.target.value, e);
      this.dispatch('FormItem', 'on-form-input', e.target.value);
      this.setCurrentValue(e.target.value);
    },
    handleChange(e) {
      this.$emit('change', e);
      this.dispatch('FormItem', 'on-form-change', e.target.value);
    },
    handleFocus(e) {
      this.focus = true;
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.focus = false;
      // 失焦时去掉两端的空格
      if (this.cleanBlank) {
        const newVal = e.target.value.trim();
        e.target.value = newVal;
      }
      if (this.type === 'number' || this.type === 'num') {
        if (this.min !== undefined && Number(e.target.value) < Number(this.min)) {
          e.target.value = Number(this.min);
        }
      } else {
        this.$emit('input', e.target.value, e);
      }
      this.dispatch('FormItem', 'on-form-blur', e);
      this.$emit('blur', e);
    },
    handleCopy() {
      if (copyString(this.value || '')) {
        toast('复制成功');
      } else {
        toast('复制失败');
      }
    },
    cleanValue() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.$emit('clean');
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
      this.dispatch('FormItem', 'on-form-change', value);
    },
    startInput() {
      this.isInput = true;
    },
    endInput() {
      this.isInput = false;
    },
    handleClickIcon() {
      this.$emit('clickIcon');
    },
  },
  mounted() {
    this.$refs.input.addEventListener('compositionstart', this.startInput);
    this.$refs.input.addEventListener('compositionend', this.endInput);
  },
  beforeDestroy() {
    this.$refs.input.removeEventListener('compositionstart', this.startInput);
    this.$refs.input.removeEventListener('compositionend', this.endInput);
  },
};
</script>

<style lang="less" scoped>
.c-sdp-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdfe6;
  padding: 1px;
  border-radius: 4px;
  transition: border 0.15s ease-out;
  &.large {
    width: 360px;
    height: 40px;
    .inputBox {
      > input {
        font-size: 14px;
        height: 36px;
      }
    }
    &.textarea {
      height: 100px;
    }
  }
  .input-icon {
    margin-right: 8px;
    cursor: pointer;
    user-select: none;
    &:last-child {
      margin-right: 12px;
    }
    &.copy_icon_black {
      width: 16px;
      height: 16px;
    }
  }
  &.focus {
    border-color: #3a51e0;
  }
  &.small {
    width: 200px;
    height: 32px;
    &.search {
      .inputBox {
        > input {
          padding-left: 30px;
        }
      }
    }
    &.clean {
      .inputBox {
        > input {
          padding-right: 24px;
        }
      }
    }
    &.textarea {
      height: 80px;
    }
    .inputBox {
      > input {
        font-size: 12px;
        height: 29px;
      }
      > textarea {
        height: 70px;
      }
    }
    .sdp-input-close-icon {
      width: 12px;
      height: 12px;
    }
  }
  &.search {
    .inputBox {
      > input {
        padding-left: 36px;
      }
    }
  }
  &.clean {
    .inputBox {
      > input {
        padding-right: 30px;
      }
    }
  }
  &.disabled {
    pointer-events: auto;
    .inputBox {
      > input,
      textarea {
        color: #7f8fa4;
      }
    }
  }

  .inputBox {
    position: relative;
    display: flex;
    flex: auto;
    height: 100%;
    > input,
    textarea {
      width: 100%;
      display: inline-block;
      padding: 0 12px;
      color: #06003b;
      text-indent: 0;
      border-width: 0;
      line-height: 24px;
      border-radius: 4px;
      &::placeholder {
        color: #c0c4cc;
        font-size: 14px;
      }
      &:focus {
        outline: none;
      }
    }
    textarea {
      padding-top: 8px;
      height: 90px;
    }
  }
  .sdp-input-counter {
    display: inline-block;
    position: absolute;
    font-size: 10px;
    color: #bfc4cd;
    letter-spacing: 0;
    text-align: right;
    line-height: 14px;
    font-weight: normal;
    right: 5px;
    &.textarea {
      bottom: 5px;
    }
  }
  .sdp-input-search-icon,
  .sdp-input-close-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    user-select: none;
  }
  .sdp-input-search-icon {
    left: 8px;
  }
  .sdp-input-close-icon {
    right: 8px;
  }
}
</style>
