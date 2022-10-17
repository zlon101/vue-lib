<template>
  <div
    :class="[
      'c-button',
      sizeMap[size],
      round && 'round',
      plain && 'plain',
      !width && 'm-w-92',
      colorMap[color],
      disable && 'disable',
      loading && 'loading',
      noBorder && 'noBorder',
      active && 'active',
      !bold && 'regular',
    ]"
    :style="{ width: `${Number(width)}px` }"
    @click="handleClick"
  >
    <div :class="['button-content', reverse && 'reverse']">
      <slot name="icon">
        <i v-show="icon || loading" :class="[getLoadingClass, 'button-icon']"></i>
      </slot>
      <p class="button-text"><slot></slot></p>
    </div>
  </div>
</template>

<script>
const sizeMap = {
  large: 'large',
  l: 'large',
  medium: 'medium',
  m: 'medium',
  small: 'small',
  s: 'small',
};
const colorMap = {
  normal: 'normal',
  blue: '_blue', // blue类有污染这里使用_blue
  red: 'red',
  green: 'green',
  white: 'white',
};

export default {
  name: 'ZlBtn',
  props: {
    /**
     * 按钮尺寸 large(l) | medium(m) | small(s)
     */
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return Object.keys(sizeMap).includes(val);
      },
    },
    /** 大圆角 */
    round: {
      type: Boolean,
      default: true,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    /** 朴素按钮 */
    plain: Boolean,
    /**
     * 按钮颜色 normal | blue | red | green
     */
    color: {
      type: String,
      default: 'blue',
      validator(val) {
        return Object.keys(colorMap).includes(val);
      },
    },
    /** icon class name */
    icon: {
      type: String,
      default: '',
    },
    disable: Boolean,
    /**
     * 是否开启 hover active 样式
     */
    active: {
      type: Boolean,
      default: true,
    },
    loading: Boolean,
    loadingClass: String,
    width: String,
    reverse: Boolean,
    bold: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sizeMap,
      colorMap,
    };
  },
  methods: {
    handleClick(evt) {
      if (this.disable || this.loading) {
        return false;
      }
      this.$emit('click', evt);
    },
  },
  computed: {
    getLoadingClass() {
      if (this.loading) {
        // loadingClass优先
        if (this.loadingClass) {
          return `${this.loadingClass} active`;
        }
        // 朴素按钮显示黑色的圆圈
        return this.plain ? 'icon_loading_black active' : 'icon_loading_white active';
      }
      return this.icon;
    },
  },
};
</script>

<style lang="less">
.c-button {
  display: inline-block;
  padding: 0 15px; // 加上边框共16px
  text-align: center;
  outline: none;
  cursor: pointer;
  text-indent: 0;
  border-radius: 4px;
  opacity: 1;
  transition: opacity 0.25s ease-out;
  user-select: none;
  overflow: hidden;
  font-weight: normal;
  &.noBorder {
    border: none !important;
  }
  &.regular {
    font-weight: normal !important;
  }
  .icon_link_to {
    margin-left: 3px;
  }
  /** size */
  &.large {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    .button-icon {
      width: 16px;
      height: 16px;
    }
  }
  &.m-w-92 {
    min-width: 92px;
  }
  &.medium {
    height: 32px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    .button-icon {
      width: 16px;
      height: 16px;
    }
  }
  &.small {
    min-width: 58px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    font-weight: normal;
    .button-icon {
      width: 14px;
      height: 14px;
    }
  }

  /** round */
  &.round {
    border-radius: 20px;
  }

  /** plain */
  &.plain {
    background: #fff !important;
    .button-icon,
    svg {
      margin: 0 6px 0 0 !important;
    }
  }

  /** color */
  &.normal {
    color: @text_color_basic;
    border: 1px solid #dcdfe6;
    background: #fff;
    .button-icon,
    svg {
      margin: 0 6px 0 0 !important;
    }
  }
  &._blue {
    color: #fff;
    border: 1px solid @theme;
    background: @theme;
    &.plain {
      color: @theme;
    }
  }
  &.red {
    color: #fff;
    border: 1px solid @status_color_danger;
    background: @status_color_danger;
    &.plain {
      color: @status_color_danger;
    }
  }
  &.green {
    color: #fff;
    border: 1px solid @status_color_success;
    background: @status_color_success;
    &.plain {
      color: @status_color_success;
    }
  }
  &.white {
    color: #fff;
    border: 1px solid #fff;
    background: none;
    &.plain {
      color: #fff;
      background: none !important;
    }
  }

  &.active {
    &:hover,
    &:active {
      opacity: 0.7;
    }
  }

  &.disable {
    cursor: not-allowed;
    background: #f5f7fa;
    color: #b5bec5;
    border: 1px solid #f5f7fa;
    &:hover,
    &:active {
      opacity: 1;
    }
  }
  &.loading {
    cursor: not-allowed;
    opacity: 0.7;
    &:hover,
    &:active {
      opacity: 0.7;
    }
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    height: 100%;
    &.reverse {
      flex-direction: row-reverse;
      .button-icon,
      svg {
        margin: 0 0 0 8px;
      }
    }
    .button-icon,
    svg {
      margin: 0 8px 0 0;
    }
    .button-text {
      white-space: nowrap;
    }
  }
}
</style>
