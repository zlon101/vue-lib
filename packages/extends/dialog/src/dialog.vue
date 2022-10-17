<script>
import Modal from '@zl/modal';
import ZlBtn from '@zl/button';
import { IconCross, IconQuestion, IconSuccess2, IconExpoint } from '@zl/icon';

const defaultConfig = {
  type: 'query',
  title: '',
  desc: '',
  htmlDesc: '', // 不可以使用动态内容传入
  htmlDescStyle: '',
  width: '430px',
  cancel: '取消',
  cancelClass: '',
  cancelEvent: () => {},
  confirm: '确定',
  confirmClass: '',
  confirmColor: 'blue', // 确定按钮颜色，参数详情见Button组件
  confirmEvent: () => {},
  closeEvent: () => {}, // 任何手段关闭时触发，cancel和confirm都会触发
  reverse: false, // 调换button的位置，需要注意回车触发的为confirm事件
  column: false, // 按钮组调整样式
  buttonShow: true,
  maxHeight: 'none', // 插槽和htmlDesc内容的最大高度，用来做滚动需求
  autoClose: true, // 点击按钮或者回车后自动关闭
};

export default {
  name: 'Dialog',
  components: { Modal, ZlBtn, IconCross, IconQuestion, IconSuccess2, IconExpoint },
  props: {
    value: Boolean,
    config: Object,
  },
  data() {
    return {
      visible: false,
      innerConfig: {},
      cancelLoading: false,
      confirmLoading: false,
    };
  },
  computed: {
    iconComp() {
      const { type } = this.innerConfig;
      const attr = { s: '56px' };
      const cmp = {
        query: 'IconQuestion',
        success: 'IconSuccess2',
        warn: 'IconExpoint',
        warn_y: 'IconExpoint',
      }[type];
      if (type === 'warn_y') {
        attr.fill = { 1: '#FAAD14' };
        attr.stroke = { 0: '#FAAD14' };
      }
      return { cmp, attr };
    },
  },
  watch: {
    config: {
      immediate: true,
      handler() {
        this.innerConfig = { ...defaultConfig, ...this.config };
      },
    },
    value: {
      immediate: true,
      handler(val) {
        val ? this.show(this.config) : this.close();
      },
    },
  },
  methods: {
    show(config) {
      this.innerConfig = { ...defaultConfig, ...config };
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.confirmLoading = false;
      this.cancelLoading = false;
      this.$emit('input', false);
      this.$emit('update:value', false);
      this.$emit('close');
      this.innerConfig.closeEvent();
    },
    cancel() {
      if (this.confirmLoading || this.cancelLoading) { return; }

      const event = this.innerConfig.cancelEvent();
      // 如果是Promise就在按钮上加loading
      if (event instanceof Promise) {
        this.cancelLoading = true;
        event.finally(() => {
          this.cancelLoading = false;
          this.innerConfig.autoClose && this.close();
        });
      } else {
        this.innerConfig.autoClose && this.close();
      }
    },
    confirm() {
      if (this.confirmLoading || this.cancelLoading) { return; }

      const event = this.innerConfig.confirmEvent();
      // 如果是Promise就在按钮上加loading
      if (event instanceof Promise) {
        this.confirmLoading = true;
        event.finally(() => {
          this.confirmLoading = false;
          this.innerConfig.autoClose && this.close();
        });
      } else {
        this.innerConfig.autoClose && this.close();
      }
    },
    slotScrollTo(top) {
      const swr = this.$refs['slot-wrap-ref'];
      swr && this.$nextTick(() => {
        swr.scrollTo({ top, behavior: 'smooth' });
      });
    },
  },
};
</script>

<template>
  <!-- 这里的transition是为了兼容命令调用，正常套用Modal不需要加 -->
  <transition name="slide-fade">
    <Modal v-if="visible" @close="close" @enter="confirm">
      <div class="c-dialog" :style="{ width: innerConfig.width }">
        <IconCross class="icon_close" s="24px" :fill="{0:'#ffffff', 1: '#C0C4CC'}" @click.native="close" />
        <slot name="icon">
          <component :is="iconComp.cmp" v-bind="iconComp.attr" class="icon"></component>
        </slot>
        <slot name="title">
          <div v-if="innerConfig.title" class="title">{{ innerConfig.title.replace(/ /g, '&nbsp;') }}</div>
        </slot>
        <div class="desc">{{ innerConfig.desc }}</div>
        <div
            v-if="innerConfig.htmlDesc || $slots.default"
            ref="slot-wrap-ref"
            :class="['slot-wrap', { scroll: innerConfig.maxHeight !== 'none' }]"
            :style="{ maxHeight: innerConfig.maxHeight }">
          <div v-if="innerConfig.htmlDesc" v-html="innerConfig.htmlDesc" class="desc" :style="innerConfig.htmlDescStyle"></div>
          <slot></slot>
        </div>
        <div v-if="innerConfig.buttonShow" :class="['button-wrap', innerConfig.reverse && 'reverse', innerConfig.column && 'column']">
          <ZlBtn v-if="innerConfig.cancel" :class="[innerConfig.cancelClass]" color="normal" :bold="false" :loading="cancelLoading" @click="cancel">{{ innerConfig.cancel }}</ZlBtn>
          <ZlBtn v-if="innerConfig.confirm" :class="[innerConfig.confirmClass]" :color="innerConfig.confirmColor" :loading="confirmLoading" @click="confirm">{{ innerConfig.confirm }}</ZlBtn>
        </div>
      </div>
    </Modal>
  </transition>
</template>

<style lang="less" scoped>
.c-dialog {
  position: relative;
  padding: 32px 0;
  border-radius: 8px;
  background-color: #fff;
  .icon_close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
  .icon {
    display: block;
    margin: 0 auto 24px;
  }
  .title {
    color: #06003b;
    font-size: 20px;
    font-weight: bold;
    line-height: 28px;
    text-align: center;
    margin: 0 32px 8px;
    word-break: break-all;
  }
  .desc {
    color: #7f8fa4;
    font-weight: normal;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    padding: 0 32px;
    word-break: break-all;
  }
  .slot-wrap {
    padding: 0 32px;
    &.scroll {
      overflow-y: auto;
      overflow-x: visible;
    }
  }
  .column {
    display: flex;
    flex-direction: column;
    padding: 0 32px;
    &.reverse {
      flex-direction: column-reverse;
    }
    .c-button {
      margin: 6px 8px;
    }
  }
  .button-wrap {
    text-align: center;
    margin-top: 24px;
    .no_bd {
      border: 0;
    }
    &.reverse {
      direction: rtl;
    }
    .c-button {
      margin: 0 8px;
    }
  }
}
</style>
