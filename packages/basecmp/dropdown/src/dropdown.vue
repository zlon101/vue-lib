<template>
  <div ref="c-dropdown" :class="['c-dropdown', disable && 'disable']">
    <div @click.stop="switchPopup" @mouseenter="handleMouseover" @mouseleave="handleMouseleave">
      <slot>
        <div class="display" :style="{ color }">
          <span>{{ text }}</span>
          <div :class="['fold', popupVisible && 'active']">
            <slot name="icon">
              <IconFold s="16px" />
            </slot>
          </div>
        </div>
      </slot>
    </div>
    <template v-if="$slots.options || (options && options.length)">
      <!-- 弹出层 -->
      <div
        v-show="popupVisible"
        :class="['dropdown-popup', popupClass, { 'equal-width': equalWidth }]"
        ref="c-dropdown-popup"
        :data-transfer="true"
        :style="{
          height: popupHeight
        }"
        v-transfer-dom
        @mouseenter="handleMouseover"
        @mouseleave="handleMouseleave">
        <slot v-if="$slots.options" name="options"></slot>
        <div
          v-for="(opt, index) in options"
          :key="index"
          :style="{ color: opt.color || '', textAlign }"
          class="opt-item g-single-text"
          @click="handleSelect(opt.name || opt)">{{ opt.name || opt }}</div>
        <slot v-if="$slots.footer" name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import TransferDom from '@zl/transfer';
import { IconFold } from '@zl/icon';
import Popper from '@zl/utils/lib/popper';

export default {
  name: 'Dropdown',
  components: { IconFold },
  directives: { TransferDom },
  props: {
    disable: Boolean,
    text: {
      type: String,
      default: '点我下拉',
    },
    options: Array, // ['xx', 'xxx'] |  [{ name: 'xxx', color: 'res' }]
    offset: String,
    hover: Boolean,
    color: {
      type: String,
      default: '#3A51E0',
    },
    equalWidth: Boolean, // 下拉框是否和展示内容等宽
    popupHeight: {
      type: String,
      default: 'auto',
    }, // 弹窗高度
    textAlign: {
      type: String,
      default: 'center',
    },
    popupClass: String, // 下拉框类名
    autoClose: { // 点击其他地方自动关闭
      type: Boolean,
      default: true,
    },
    autoOpen: Boolean,
  },
  data() {
    return {
      popupVisible: this.autoOpen,
      popperJS: null,
      timerId: null,
    };
  },
  watch: {
    popupVisible() {
      this.$emit('changeVisible', this.popupVisible, this.$el);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClosePopup);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClosePopup);
  },
  methods: {
    switchPopup() {
      if (this.disable || this.hover) return;
      this.popupVisible = !this.popupVisible;
      this.$emit('switchPopup', this.popupVisible);
    },
    handleMouseover() {
      if (this.disable || !this.hover) { return; }
      this.timerId && clearTimeout(this.timerId);
      this.popupVisible = true;
    },
    handleMouseleave() {
      if (this.disable || !this.hover) { return; }
      this.timerId = setTimeout(() => {
        this.popupVisible = false;
      }, 100);
    },
    handleClosePopup({ target }) {
      if (!this.autoClose) { return; }

      const { $el } = this;
      const sdpDelectPopup = this.$refs['c-dropdown-popup'];

      if (!$el.contains(target) && (!sdpDelectPopup || !sdpDelectPopup.contains(target))) {
        this.popupVisible = false;
      }
    },
    createPopper() {
      const options = {
        modifiers: {
          computeStyle: {
            gpuAcceleration: false,
          },
          preventOverflow: {
            boundariesElement: 'window',
          },
          offset: {},
        },
      };
      const reference = this.$refs['c-dropdown'];
      const popper = this.$refs['c-dropdown-popup']; // 弹出层

      if (!popper || !reference) return;

      // eslint-disable-next-line no-prototype-builtins
      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy();
      }

      options.placement = 'bottom';

      // options.modifiers.offset.offset = '0, -8';
      options.onCreate = () => {
        this.$nextTick(this.updatePopper);
      };
      this.popperJS = new Popper(reference, popper, options);
    },
    updatePopper() {
      if (this.popperJS) {
        if (this.equalWidth) {
          // 更新弹出层的宽度
          const reference = this.$refs['c-dropdown'];
          const popper = this.$refs['c-dropdown-popup']; // 弹出层
          popper.style.width = `${reference.clientWidth}px`;
        }
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },
    handleSelect(value) {
      this.$emit('change', value);
      this.popupVisible = false;
    },
  },
  updated() {
    if (this.popupVisible) {
      this.$nextTick(() => this.updatePopper());
    }
  },
};
</script>

<style lang="less" scoped>
.c-dropdown {
  position: relative;
  display: inline-block;
  color: #06003B;
  cursor: pointer;
  border-radius: 4px;

  &.disable {
    cursor: not-allowed;
    color: #dcdfe6 !important;
  }
  .display {
    display: flex;
    align-items: center;
    font-size: 14px;
    user-select: none;
    white-space: nowrap;
    > .fold {
      margin: 0 0 0 8px;
      transition: transform 0.3s ease-out;
      &.active {
        transform: rotate(180deg)
      }
    }
  }
}

// 弹出层
.dropdown-popup {
  position: absolute;
  background: #fff;
  border: 1px solid #DCDFE6;
  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0 5px 15px 0 rgba(0, 21, 33, 0.05);
  cursor: default;
  min-width: 90px;
  max-width: 200px;
  // z-index: @zLeveDropBox;
  transform: translateY(0);
  animation: dropdown-popup-ani .2s forwards ease-out;
  @keyframes dropdown-popup-ani {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(6px);
    }
  }

  &.equal-width {
    min-width: 0;
    max-width: none;
  }

  &.small {
    .opt-item {
      font-size: 12px;
      line-height: 34px;
      height: 34px;
    }
  }

  .opt-item {
    height: 38px;
    line-height: 38px;
    transition: background 0.15s;
    cursor: pointer;
    font-size: 14px;
    padding: 0 16px;
    &:hover {
      background: #f5f7fa;
    }
  }
}
</style>
