<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-rel']" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper" ref="reference">
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        :class="[prefixCls + '-popper', prefixCls + '-' + theme, popCls]"
        :style="dropStyles"
        ref="popper"
        v-show="!disabled && (always || visible)"
        @mouseenter="handleShowPopper"
        @mouseleave="handleClosePopper"
        :data-transfer="transfer"
        v-transfer-dom
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']"></div>
          <div :class="innerClasses" :style="innerStyles">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { isOverflow } from '@zl/utils/dom';
import TransferDom from '@zl/transfer';
import { transferIndex, transferIncrease } from './transfer-queue';
import popperMixins from './popperMixins';
// import textOverflowMinxin from './textOverflowMinxin';

const prefixCls = 'c-tooltip';

export default {
  name: 'Tooltip',
  directives: { TransferDom },
  mixins: [popperMixins], // textOverflowMinxin
  props: {
    placement: {
      type: String,
      default: 'bottom',
      /*
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end', */
    },
    content: {
      type: [String, Number],
      default: '',
    },
    delay: {
      type: Number,
      default: 100,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    controlled: {
      // under this prop,Tooltip will not close when mouseleave
      type: Boolean,
      default: false,
    },
    always: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String, // 'dark', 'light', 'notOpacity', 'darkDeep'
      default: 'dark',
    },
    maxWidth: {
      type: [String, Number],
      default: '434',
    },
    width: Number,
    showIfOverflow: {
      type: Boolean,
      default: true,
    },
    popCls: {
      type: String,
      default: '',
    },
    // modal 里面使用该组件时，baseIndex 设置为 @zLeveMask(即300)
    baseIndex: {
      type: String,
      default: '250',
    },
  },
  data() {
    return {
      prefixCls,
      tIndex: this.handleGetIndex(),
      visible: false,
    };
  },
  computed: {
    innerStyles() {
      const styles = {};
      if (this.width) styles.width = `${this.width}px`;
      if (this.maxWidth) styles['max-width'] = `${this.maxWidth}px`;
      return styles;
    },
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-with-width`]: !!this.maxWidth,
        },
      ];
    },
    dropStyles() {
      const styles = {};
      // 解决点击tip里面的按钮，出现modal时UI错误
      const _baseIndex = Number.parseInt(this.baseIndex, 10);
      const maxIndex = _baseIndex + 49;
      if (this.transfer) styles['z-index'] = Math.min(_baseIndex + this.tIndex, maxIndex);
      return styles;
    },
  },
  watch: {
    always: {
      immediate: true,
      handler(val) {
        val ? this.handleShowPopper() : this.handleClosePopper();
      },
    },
  },
  methods: {
    // 暂时留着
    handleShowPopperBack() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (!this.hidePoper) {
          this.visible = true;
        }
      }, this.delay);
      this.tIndex = this.handleGetIndex();
    },
    textOverFlow() {
      const anchorDom = this.$refs.reference;
      let result = false;
      result = isOverflow(anchorDom);
      if (result) {
        return true;
      }
      let ele = anchorDom;
      while (!result && ele.childElementCount) {
        [ele] = ele.children;
        result = isOverflow(ele);
      }
      return result;
    },
    handleShowPopper() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.showIfOverflow) {
          this.visible = !!this.textOverFlow();
        } else {
          this.visible = true;
        }
        this.$emit('toggle', this.visible);
      }, this.delay);
      this.tIndex = this.handleGetIndex();
    },
    handleClosePopper() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        if (!this.controlled) {
          this.timeout = setTimeout(() => {
            this.visible = false;
            this.$emit('toggle', this.visible);
          }, this.delay);
        }
      }
    },
    handleGetIndex() {
      transferIncrease();
      return transferIndex;
    },
  },
};
</script>

<style lang="less" scoped>
@bgcolor: rgba(0, 4, 16, 0.7);

.popper() {
  display: block;
  visibility: visible;
  font-size: 14px;
  line-height: 1.5;
  position: absolute;
  z-index: 250;
  &[x-placement^="top"] {
    padding: 5px 0 8px 0;
  }

  &[x-placement^="right"] {
    padding: 0 5px 0 8px;
  }

  &[x-placement^="bottom"] {
    padding: 8px 0 5px 0;
  }

  &[x-placement^="left"] {
    padding: 0 8px 0 5px;
  }

  &[x-placement^="top"] .c-tooltip-arrow {
    bottom: 8px - 5px;
    border-width: 5px 5px 0;
    border-top-color: @bgcolor;
  }

  &[x-placement="top"] .c-tooltip-arrow {
    left: 50%;
    margin-left: -5px;
  }

  &[x-placement="top-start"] .c-tooltip-arrow {
    left: 16px;
  }

  &[x-placement="top-end"] .c-tooltip-arrow {
    right: 16px;
  }

  &[x-placement^="right"] .c-tooltip-arrow {
    left: 8px - 5px;
    border-width: 5px 5px 5px 0;
    border-right-color: @bgcolor;
  }

  &[x-placement="right"] .c-tooltip-arrow {
    top: 50%;
    margin-top: -5px;
  }

  &[x-placement="right-start"] .c-tooltip-arrow {
    top: 8px;
  }

  &[x-placement="right-end"] .c-tooltip-arrow {
    bottom: 8px;
  }

  &[x-placement^="left"] .c-tooltip-arrow {
    right: 8px - 5px;
    border-width: 5px 0 5px 5px;
    border-left-color: @bgcolor;
  }

  &[x-placement="left"] .c-tooltip-arrow {
    top: 50%;
    margin-top: -5px;
  }

  &[x-placement="left-start"] .c-tooltip-arrow {
    top: 8px;
  }

  &[x-placement="left-end"] .c-tooltip-arrow {
    bottom: 8px;
  }

  &[x-placement^="bottom"] .c-tooltip-arrow {
    top: 8px - 5px;
    border-width: 0 5px 5px;
    border-bottom-color: @bgcolor;
  }

  &[x-placement="bottom"] .c-tooltip-arrow {
    left: 50%;
    margin-left: -5px;
  }

  &[x-placement="bottom-start"] .c-tooltip-arrow {
    left: 16px;
  }

  &[x-placement="bottom-end"] .c-tooltip-arrow {
    right: 16px;
  }
}

.c-tooltip {
  display: inline-block;
  max-width: 100%;
  &-rel {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    position: relative;
    white-space: nowrap;
    width: inherit;
  }
  &-popper {
    .popper();
  }

  &-light&-popper {
    .popper();

    &[x-placement^="top"] .c-tooltip-arrow {
      border-top-color: rgba(0, 4, 16, 0.1);
      &:after {
        content: " ";
        bottom: 1px;
        margin-left: -7px;
        border-bottom-width: 0;
        border-top-width: 7px;
        border-top-color: #fff;
      }
    }

    &[x-placement^="right"] .c-tooltip-arrow {
      border-right-color: rgba(0, 4, 16, 0.1);
      &:after {
        content: " ";
        left: 1px;
        bottom: -7px;
        border-left-width: 0;
        border-right-width: 7px;
        border-right-color: #fff;
      }
    }

    &[x-placement^="bottom"] .c-tooltip-arrow {
      border-bottom-color: rgba(0, 4, 16, 0.1);
      &:after {
        content: " ";
        top: 1px;
        margin-left: -7px;
        border-top-width: 0;
        border-bottom-width: 7px;
        border-bottom-color: #fff;
      }
    }

    &[x-placement^="left"] .c-tooltip-arrow {
      border-left-color: rgba(0, 4, 16, 0.1);
      &:after {
        content: " ";
        right: 1px;
        border-right-width: 0;
        border-left-width: 7px;
        border-left-color: #fff;
        bottom: -7px;
      }
    }
  }
  &-notOpacity&-popper {
    .popper();

    &[x-placement^="top"] .c-tooltip-arrow {
      border-top-color: #333;
      &:after {
        content: " ";
        bottom: 1px;
        margin-left: -7px;
        border-bottom-width: 0;
        border-top-width: 7px;
        border-top-color: #333;
      }
    }

    &[x-placement^="right"] .c-tooltip-arrow {
      border-right-color: #333;
      &:after {
        content: " ";
        left: 1px;
        bottom: -7px;
        border-left-width: 0;
        border-right-width: 7px;
        border-right-color: #333;
      }
    }

    &[x-placement^="bottom"] .c-tooltip-arrow {
      border-bottom-color: #333;
      &:after {
        content: " ";
        top: 1px;
        margin-left: -7px;
        border-top-width: 0;
        border-bottom-width: 7px;
        border-bottom-color: #333;
      }
    }

    &[x-placement^="left"] .c-tooltip-arrow {
      border-left-color: #333;
      &:after {
        content: " ";
        right: 1px;
        border-right-width: 0;
        border-left-width: 7px;
        border-left-color: #333;
        bottom: -7px;
      }
    }
  }

  &-inner {
    max-width: 250px;
    min-height: 34px;
    padding: 8px 12px;
    color: #ffffff;
    text-align: left;
    text-decoration: none;
    background-color: @bgcolor;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    white-space: pre-wrap;
    word-break: break-all;
    text-align: justify;
    font-weight: 300;
  }

  &-light &-inner {
    background-color: #fff;
    color: #515a6e;
  }
  &-notOpacity &-inner {
    background-color: #333;
    color: #fff;
  }
  &-darkDeep &-inner {
    background-color: rgba(0, 4, 16, 0.8);
    color: #fff;
  }

  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &-light,
  &-notOpacity {
    .c-tooltip-arrow {
      &:after {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-color: transparent;
        border-style: solid;
        content: "";
        border-width: 7px;
      }
      border-width: 8px;
    }
  }
}
</style>
