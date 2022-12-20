<script>
import vCopy from '@zl/v-copy'
import { IconSearch } from '@zl/icon';

const DefaultAttr = {
  type: 'text',
};

export default {
  name: 'self-input',
  inheritAttrs: false,
  directives: { copy: vCopy },
  components: { IconSearch },
  props: {
    value: [String, Number],
    search: {
      type: Boolean,
      default: false,
    },
    copy: {
      type: Boolean,
      default: false,
    },
    // 字段描述
    desc: {
      type: String,
      default: '',
    },
    errMsg: {
      type: String,
      default: '',
    },
    width: [Number, String],
    height: {
      type: [Number, String],
      default: '40px',
    },
    inputSty: [String, Object],
    indent: Boolean,
    // 是否是textarea
    textarea: {
      type: Boolean,
      default: false,
    },
    // 失焦时自动清除空白
    cleanBlank: {
      type: Boolean,
      default: true,
    },
    fakerValue: String,
    placeholder: String,
    purenumber: Boolean,
    min: Number,
    max: Number,
  },
  data() {
    return {
      clsPrefix: 'c-input',
      hasChanged: false, // 处理ie bug
      firstFocus: false, // focus一次之后不再显示faker value
      nowFocus: false,
    };
  },
  computed: {
    attrs() {
      const mergedAttr = { ...DefaultAttr, ...this.$attrs };
      if (this.purenumber) {
        mergedAttr.type = 'text';
      }
      return mergedAttr;
    },
    listeners() {
      const propsListeners = this.$listeners;
      return {
        ...propsListeners,
        change: e => this.handleVal(e, 'change'),
        input: e => this.handleVal(e, 'input'),
        blur: e => this.handleBlur(e),
        focus: this.handleFocus,
      };
    },
    contentStyle() {
      const dst = {};
      ['width', 'height'].forEach(k => {
        const propVal = this[k];
        if (typeof propVal !== 'undefined') {
          if (Number.isNaN(Number(propVal))) {
            dst[k] = propVal;
          } else {
            dst[k] = `${propVal}px`;
          }
        }
      });
      return dst;
    },
    visibleFakerVal() {
      return !this.firstFocus && this.fakerValue && !this.value;
    },
    numWord() {
      return (this.value || '').length;
    },
  },
  methods: {
    handleVal(e, eventName) {
      if (this.$attrs.disabled) return;

      const dom = e.target;
      let val = dom.value;
      // console.debug(0, val);
      if (this.purenumber) {
        val = val.replace(/\D/g, '');
      }
      // console.debug(1, val);
      const maxlength = Number(this.$attrs.maxlength || 0);
      if (maxlength && val.length > maxlength) {
        val = val.slice(0, maxlength);
      }
      if (this.cleanBlank) {
        val = val.trim();
      }
      // console.debug(2, val);
      // min max 校验
      const { min, max } = this;
      if (this.purenumber || this.$attrs.type === 'number') {
        const valNumber = parseFloat(val);
        // console.debug('parseFloat', val);
        if (typeof min === 'number' && valNumber < min) {
          val = min;
        }
        if (typeof max === 'number' && valNumber > max) {
          val = max;
        }
      }

      const nValStr = String(val);
      if (dom.value !== nValStr) {
        dom.value = nValStr;
      }
      if (this.hasChanged) {
        this.$emit(eventName, nValStr, e);
      }
    },
    handleFocus() {
      this.hasChanged = true;
      this.firstFocus = true;
      this.nowFocus = true;
      this.$emit('focus');
    },
    handleBlur(e) {
      this.nowFocus = false;
      this.handleVal(e, 'blur')
    },
    // 供父组件调用
    focus() {
      this.$el.querySelector('.input').focus();
    },
  },
};
</script>

<template>
  <div class="c-input">
    <div :class="[`${clsPrefix}-search`, { search }]">
      <IconSearch v-if="search" s="24px" class="icon_search" />
      <div class="c-input-desc-wrap">
        <div :class="[`${clsPrefix}-content`, { textarea, copy, focus: nowFocus }]" :style="contentStyle">
          <textarea
            v-if="textarea"
            class="input"
            :style="inputSty"
            v-bind="attrs"
            :value="value"
            v-on="listeners"
            :placeholder="visibleFakerVal ? '' : placeholder"
          ></textarea>
          <input
            v-else
            :class="['input', { indent }]"
            :style="inputSty"
            v-bind="attrs"
            :value="value"
            v-on="listeners"
            :placeholder="visibleFakerVal ? '' : placeholder"
          />
          <span v-if="textarea && attrs.maxlength" :class="`${clsPrefix}-count`">
            {{ `${numWord}/${attrs.maxlength}` }}
          </span>
          <span v-if="copy" v-copy="value" class="copy_icon iconfont icon-copy2"></span>
          <div class="more-btn">
            <slot name="morebtn"></slot>
          </div>
          <p v-if="visibleFakerVal" class="faker-value">{{ fakerValue }}</p>
        </div>
        <p :class="`${clsPrefix}-desc`">{{ desc }}</p>
      </div>
    </div>
    <div v-if="errMsg" :class="`${clsPrefix}-error iconfont icon-err`"><span style="margin-left:4px">{{errMsg}}</span></div>
  </div>
</template>

<style lang="less">
.c-input {
  position: relative;
  .c-input-search {
    position: relative;
    .icon_search {
      margin-left: 8px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    &.search {
      input {
        padding-left: 36px;
        text-indent: 0;
      }
    }
  }
  .c-input-desc-wrap {
    position: relative;
    .c-input-desc {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 440px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      font-size: 12px;
      color: #7f8fa4;
      line-height: 18px;
      font-weight: 400;
      &:empty {
        display: none;
      }
    }
  }
  .c-input-content {
    min-height: 40px;
    position: relative;
    font-size: 14px;
    background: #ffffff;
    color: #06003b;

    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border 0.15s ease-out;
     overflow: hidden;
    &.focus {
      border-color: #3a51e0;
    }
    .faker-value {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      padding: 12px 8px 8px 12px;
    }
    input {
      width: 100%;
      //height: 40px;
      height: 100%;
      vertical-align: middle;
      border: none;
      outline: none;
      font-size: 14px;
      color: #06003b;
      //&:focus {
      //  border-color: #3a51e0;
      //}
      &.indent {
        text-indent: 12px;
      }
    }
    textarea {
      width: 100%;
      height: 100%;
      min-height: 90px;
      padding: 8px 8px 8px 12px;
      position: relative;
      vertical-align: middle;
      overflow: auto; // 隐藏ie滚动条
      outline: none;
      border: none;
      resize: none;
      .min-placeholder {
        font-size: 14px;
        color: #c0c4cc;
        line-height: 24px;
        font-weight: 400;
      }
      &::placeholder {
        .min-placeholder();
      }
      &::-webkit-input-placeholder,
      &::-moz-placeholder,
      &:-ms-input-placeholder {
        .min-placeholder();
      }
      //&:focus {
      //  border-color: #3a51e0;
      //}
    }
    .copy_icon {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      cursor: pointer;
      text-decoration: none !important;
    }
    .c-input-count {
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-size: 10px;
      color: #bfc4cd;
      text-align: right;
      line-height: 14px;
      font-weight: 400;
    }
    .more-btn {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0, -50%);
    }
    &.copy {
      input,
      textarea {
        padding-right: 32px;
      }
    }
  }
  .c-input-error {
    max-width: 358px;
    display: flex;
    margin-top: 8px;
    align-items: center;
    font-size: 12px;
    color: #f56c6c;
    line-height: 18px;
    font-weight: 400;
    word-break: break-all;
  }
}
</style>
