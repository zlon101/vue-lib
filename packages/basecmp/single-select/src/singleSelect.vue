<template>
  <Dropdown ref="c-single-select-ref" class="c-single-select" :style="{ width }" equalWidth @changeVisible="changeVisible">
    <div class="input" :style="{ width, height }">
      <p v-if="current" class="g-single-text" :style="{ color: current.color }">{{ current.label }}</p>
      <p v-else class="placeholder g-single-text">{{ placeholder }}</p>
      <IconFold s="16px" :stroke="{0: '#C0C4CC'}" :class="['fold_select', { active: popupVisible }]" />
    </div>
    <div :class="['xahhums2w3', popupClass]" slot="options">
      <div v-if="search" class="search-wrap">
        <ZInput v-model="searchText" width="100%" search :placeholder="searchPlaceholder" />
      </div>
      <div class="single-list">
        <div
          v-for="(opt, index) in searchList"
          :key="index"
          class="single-item"
          :style="{ padding: `0 ${padding}px` }"
          @click="handleSelect(opt)">
          <i v-if="opt.icon" :class="[opt.icon, 'icon']"></i>
          <p
            class="g-single-text"
            :style="{
              width: `calc(100% - ${opt.icon ? 48 : 24}px)`,
              color: opt.color
            }"
          >{{ opt.label }}</p>
          <IconHook v-if="opt.value == value" s="14px" class="icon_select" />
        </div>
      </div>
    </div>
  </Dropdown>
</template>

<script>
import { IconFold, IconHook } from '@zl/icon';
import Dropdown from '@zl/dropdown';
import ZInput from '@zl/input';

export default {
  name: 'SingleSelect',
  components: { Dropdown, IconFold, IconHook, ZInput },
  props: {
    options: Array,
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请选择',
    },
    search: Boolean,
    searchPlaceholder: {
      type: String,
      default: '搜索',
    },
    width: {
      type: String,
      default: '360px',
    },
    height: {
      type: String,
      default: '40px',
    },
    padding: {
      type: [String, Number],
      default: '24',
    },
    popupClass: {
      type: String,
      default: 'xahhums2w3',
    },
  },
  data() {
    return {
      popupVisible: false,
      searchText: '',
    };
  },
  computed: {
    searchList() {
      return this.options.filter(opt => opt.label.includes(this.searchText));
    },
    current() {
      // eslint-disable-next-line eqeqeq
      const target = (this.options || []).find(item => item.value == this.value);
      return target;
    },
  },
  methods: {
    changeVisible(val) {
      this.popupVisible = val;
    },
    handleSelect(opt) {
      this.$emit('input', opt.value);
      this.$emit('change', opt);
      this.$refs['c-single-select-ref'].switchPopup();
    },
  },
};
</script>

<style lang="less">
.xahhums2w3 {
  .search-wrap {
    padding: 8px 16px 8px;
  }
  .single-list {
    max-height: 228px;
    overflow-y: auto;
  }
  .single-item {
    display: flex;
    align-items: center;
    height: 38px;
    cursor: pointer;
    .icon {
      width: 16px;
      height: 16px;
      margin: 0 8px 0 0;
    }
    &:hover {
      background: #F5F7FA;
    }
    .icon_select {
      margin: 0 0 0 8px;
    }
  }
}
</style>

<style lang="less" scoped>
.c-single-select {
  .input {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #D8DCE6;
    padding: 0 40px 0 12px;
    border-radius: 4px;
    .placeholder {
      color: #C0C4CC;
    }
    .fold_select {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%) rotate(0);
      transition: transform 0.3s ease-out;
      &.active {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }
}
</style>
