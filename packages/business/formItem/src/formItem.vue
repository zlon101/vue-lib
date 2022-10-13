<template>
  <div class="c-form-item" :style="{ margin: `0 0 ${marginB}px`, paddingLeft: `${paddingL}px`, }">
    <div v-if="title" class="title">
      <span v-if="num" class="title-num">{{ num }}</span>
      <div v-if="$slots.icon" class="icon">
        <slot name="icon"></slot>
      </div>
      <span :class="['title-self', { 'g-require': must, limit: tips }]">{{ title }}</span>
      <span v-if="titleTips" class="tips">{{ tips }}</span>
    </div>
    <template v-if="desc">
      <template v-if="Array.isArray(desc)">
        <p v-for="(d, i) in desc" :key="i" :class="['desc', { list: i !== 0, mini: miniDesc } ]">{{ d }}</p>
      </template>
      <p v-else :class="['desc', { mini: miniDesc }]">
        <span :class="['desc-self', { limit: tips, underline: copy }]" @click="handleCopy">{{ desc }}</span>
        <!-- tips 插槽内容优先 -->
        <span v-if="!titleTips && !$slots.default && tips" class="tips">{{ tips }}</span>
      </p>
    </template>
    <!-- 中间对齐内容 -->
    <div v-if="$slots.default" class="body">
      <div :class="['body-self', { limit: tips }]">
        <slot></slot>
      </div>
      <span v-if="!titleTips && tips" class="tips">{{ tips }}</span>
    </div>
    <!-- error -->
    <transition name="fade-transform-y">
      <div v-if="error" class="error">
        <span class="iconfont icon-err"></span>
        <span>{{ error }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    title: String, // 标题
    desc: [String, Array, Number], // 标题下面描述信息
    miniDesc: Boolean, // 小字体描述
    tips: String, // 优先展示在插槽内容右侧，然后是描述右侧
    titleTips: Boolean, // 将描述强制展示在标题右侧
    must: Boolean, // 是否显示标题后面的星号
    num: String, // 是否显示标题前面的序号
    copy: Boolean, // 在描述上面显示copy
    error: [String, Number], // 是否显示错误信息
    marginB: {
      type: String,
      default: '24', // 下边距
    },
    paddingL: String, // 左内边距
  },
  methods: {
    handleCopy() {
      if (!this.copy) { return; }
      this.$copy(this.desc);
    },
  },
};
</script>

<style lang="less" scoped>
.c-form-item {
  position: relative;
  padding-left: 16px;
  line-height: 1.5;
  .title {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    .title-self.limit {
      width: 360px;
    }
    .title-num {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: #3a51e0;
    }
    .title-icon {
      position: relative;
      margin: 0 0 0 8px;
      span {
        display: block;
        font-size: 12px;
        color: #FAAD14;
        transform: scale(0.8);
      }
      > svg {
        position: absolute;
        left: -3px;
        bottom: -12px;
      }
    }
    .icon {
      position: absolute;
      top: -2px;
      left: -18px;
      height: 10px;
    }
  }
  .desc {
    display: flex;
    align-items: center;
    color: #7f8fa4;
    margin-top: 8px;
    font-size: 14px;
    &.list {
      margin-top: 4px;
    }
    &.mini {
      font-size: 12px;
    }
    .desc-self {
      &.underline {
        position: relative;
        cursor: pointer;
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 3px;
          height: 1px;
          background: #7f8fa4;
        }
      }
      &.limit {
        width: 360px;
      }
    }
  }
  .body {
    display: flex;
    align-items: center;
    margin-top: 8px;
    .body-self {
      line-height: 1;
      &.limit {
        width: 360px;
        flex-flow: 0;
        flex-shrink: 0;
      }
    }
  }
  .error {
    max-width: 360px;
    margin-top: 8px;
    padding-left: 22px;
    display: flex;
    align-items: center;
    color: @status_color_danger;
    font-size: 12px;
    position: relative;
    .icon-err {
      height: 16px;
      width: 16px;
      line-height: 16px;
      vertical-align: top;
      margin-right: 4px;
      position: absolute;
      top: 2px;
      left: 0;
    }
  }
  .tips {
    font-size: 12px;
    margin-left: 80px;
    color: #7f8fa4;
    font-weight: normal;
  }
}
</style>
