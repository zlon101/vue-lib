<template>
  <div v-if="pageTotal >= 1" class="c-pager">
    <span class="total">共&nbsp;{{ total }}&nbsp;条</span>

    <div class="pager-item ctrl left" @click="turnPages(value == 1 ? 1 : value - 1)">
      <IconFold s="14px" />
    </div>
    <!-- 超过10条显示省略号 -->
    <template v-if="pageTotal >= 10">
      <div :class="['pager-item', { active: value === 1 }]" @click="turnPages(1)">1</div>
      <div v-if="value - 1 > 2" class="pager-item disable">···</div>

      <div v-if="[pageTotal, pageTotal - 1].includes(value)" class="pager-item" @click="turnPages(pageTotal - 3)">{{ pageTotal - 3 }}</div>
      <div v-if="value == pageTotal" class="pager-item" @click="turnPages(pageTotal - 2)">{{ pageTotal - 2 }}</div>

      <div v-if="value - 1 > 1" class="pager-item" @click="turnPages(value - 1)">{{ value - 1 }}</div>
      <div v-if="value !== 1 && value !== pageTotal" class="pager-item active">{{ value }}</div>
      <div v-if="value + 1 < pageTotal" class="pager-item" @click="turnPages(value + 1)">{{ value + 1 }}</div>

      <div v-if="value == 1" class="pager-item" @click="turnPages(3)">3</div>
      <div v-if="[1, 2].includes(value)" class="pager-item" @click="turnPages(4)">4</div>

      <div v-if="value + 1 < pageTotal - 1" class="pager-item disable">···</div>
      <div :class="['pager-item', { active: value === pageTotal }]" @click="turnPages(pageTotal)">{{ pageTotal }}</div>
    </template>
    <!-- 小于10条正常排列 -->
    <template v-else>
      <div
        v-for="item in pageTotal"
        :key="`pager-item-${item}`"
        :class="['pager-item', value == item && 'active']"
        @click="turnPages(item)">
        <span>{{ item }}</span>
      </div>
    </template>
    <div class="pager-item ctrl right" @click="turnPages(value === pageTotal ? pageTotal : value + 1)">
      <IconFold s="14px" />
    </div>

    <span>每页</span>
    <SingleSelect
      class="select"
      popupClass="wraqd455f2"
      :value="pageSize"
      :options="pageSizeOpts"
      padding="10"
      width="70px"
      height="32px"
      @change="selectPageSize"/>
    <span>条</span>
  </div>
</template>

<script>
import { updateUrlQuery } from '@zl/utils/lib/url';
import { IconFold } from '@zl/icon';
import SingleSelect from '@zl/single-select';

export default {
  name: 'Pager',
  components: { IconFold, SingleSelect },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    changeRouter: {
      type: Boolean,
      default: true,
    },
    routeName: {
      type: String,
      default: 'page',
    },
    // 滚动容器 css选择器|dom元素
    scrollWrap: [String, Object],
  },
  data() {
    return {
      pageSizeOpts: [
        { label: '10', value: 10 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
      ],
    };
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  created() {
    if (this.changeRouter) {
      const pageSize = Number(this.$route.query[`${this.routeName}Size`] || this.pageSize || 10);
      this.selectPageSize({ value: pageSize }, false);
      this.turnPages(Number(this.$route.query[this.routeName] || this.value || 1), pageSize);
    }
  },
  methods: {
    turnPages(val, pageSize) {
      this.$emit('input', val);
      this.$emit('change', val);
      this.changeRouter && updateUrlQuery({ [this.routeName]: val, [`${this.routeName}Size`]: pageSize || this.pageSize }); // 更改url
      if (this.scrollWrap) {
        this.scrollToTop();
      }
    },
    selectPageSize({ value }, turnPages = true) {
      this.$emit('update:pageSize', value);
      this.$emit('changePageSize', value);
      turnPages && this.turnPages(1, value);
    },
    scrollToTop() {
      const _scrollwrap = this.scrollWrap;
      const wrap = typeof _scrollwrap === 'string' ? this.$root.$el.querySelector(_scrollwrap) : _scrollwrap;
      if (wrap) {
        wrap.scrollTop = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.c-pager {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  user-select: none;
  margin-top: 16px;
  .pager-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border: 1px solid #D8DCE6;
    cursor: pointer;
    margin: 0 8px 0 0;
    border-radius: 8px;
    transition: all 0.15s ease-out;
    &.ctrl {
      background: #F5F7FA;
      &.left {
        transform: rotate(90deg);
      }
      &.right {
        transform: rotate(-90deg);
        margin: 0 16px 0 0;
      }
    }
    &:hover {
      background: #D8DCE6;
    }
    &.active {
      color: #fff;
      background: #3A51E0;
      border: none;
    }
    &.disable {
      color: #D8DCE6;
      border: none;
      font-weight: bold;
      background: #fff;
      cursor: default;
      &:hover {
        color: #D8DCE6;
        border: none;
        font-weight: bold;
        background: #fff;
      }
    }

  }
  .total {
    margin: 0 16px 0 0;
  }
  .select {
    margin: 0 8px;
    /deep/ .input {
      padding: 0 24px 0 12px;
      border-radius: 8px;
    }
  }
}
</style>
