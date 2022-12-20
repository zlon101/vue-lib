<template>
  <div ref="c-sdp-select" :class="['c-sdp-select', sizeMap[size], multipleClass, disable && 'disable']">
    <div class="sdp-select-display" @click="switchPopup">
      <!-- 已选列表 -->
      <div v-show="selectedList.length" :class="['sdp-select-selected-list', multipleClass]" ref="sdp-select-selected-list">
        <span v-for="(item, index) in selectedList" :key="index" :class="tagMultipleClass" :style="{ color: item.color }">
          <slot name="labelIcon"></slot>
          {{ item.label }}{{ normalMultiple && index !== selectedList.length - 1 ? ',' : '' }}
          <span v-if="multiple && !normalMultiple && !item.disabled" @click.stop="changeSelectedList(item)" class="iconfont icon-cross sdp-select-delete"></span>
          <i v-if="item.action" @click.stop="$emit('handleAction', item)" :class="[item.action, 'select-item-action-icon']"></i>
        </span>
      </div>
      <p v-show="!selectedList.length" class="sdp-select-placeholder g-text-ellipsis">{{ placeholder || title }}</p>
      <i :class="['icon_select_fold iconfont icon-fold',{active: popupVisible}]"></i>
    </div>
    <!-- 弹出层 -->
    <div :class="['sdp-select-popup', sizeMap[size], transfer && 'transfer']" ref="c-sdp-select-popup" v-show="popupVisible" :data-transfer="transfer" v-transfer-dom>
      <!-- 搜索框 -->
      <div v-if="search" class="sdp-select-input-wrap">
        <SdpInput v-model.trim="searchText"
          search :clean="searchClean" width="100%" :size="size" :placeholder="`${searchDesc ? searchDesc : '请输入' + title}`"
          @keyup.native="filterData">
        </SdpInput>
      </div>
      <p v-if="!data.length" class="sdp-select-tips">{{ nothingText }}</p>
      <template>
        <template v-if="searchText">
          <p v-show="!searchResults.length" class="sdp-select-tips">无匹配搜索结果</p>
        </template>
        <template v-else-if="preset">
          <!-- 推荐 -->
          <SdpSelectPreset
            :title="title" :preset="preset" :selectedList="selectedList"
            @changeSelectedList="changeSelectedList">
          </SdpSelectPreset>
          <p class="sdp-select-title">全部{{ title }}</p>
        </template>
      </template>

      <div class="sdp-select-list" :style="{ overflow: data.length <= 5 ? 'hidden': '', height: listHeight ? listHeight : '' }">
        <component
          class="sdp-select-item"
          :is="multiple ? 'SdpSelectMultipleItem' : 'SdpSelectSingleItem'"
          v-for="(item, index) in searchText ? searchResults : data"
          :key="index" :item="item"
          :selectedList="selectedList"
          @changeSelectedList="changeSelectedList">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import TransferDom from '@pic/transfer';
import SdpInput from '@pic/input';
import SdpSelectSingleItem from './selectSingleItem.vue';
import SdpSelectMultipleItem from './selectMultipleItem.vue';
import SdpSelectPreset from './selectPreset.vue';
import Popper from '@pic/utils/lib/popper';

const sizeMap = {
  large: 'large',
  l: 'large',
  small: 'small',
  s: 'small',
};

export default {
  name: 'SdpSelect',
  directives: { TransferDom },
  components: { SdpInput, SdpSelectSingleItem, SdpSelectMultipleItem, SdpSelectPreset },
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: String,
    // {
    //   label: '',
    //   value: '',
    //   color: '',
    //   disabled: Boolean, // 禁止操作项，默认可操作
    //   desc: '', // 禁用相关描述，disabled为true时可用
    //   checked: Boolean, // 默认选中
    // }
    data: Array,
    preset: Array, // 常用
    /** 单选取第一项 多选Array */
    value: Array,
    search: Boolean,
    searchDesc: {
      type: String,
      default: '',
    },
    searchClean: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'large',
    },
    withLabel: {
      type: Boolean,
      default: false,
    },
    multiple: Boolean,
    normalMultiple: Boolean,
    disable: Boolean,
    transfer: {
      type: Boolean,
      default: true,
    },
    offset: String,
    nothingText: {
      type: String,
      default: '暂无可选数据',
    },
    listHeight: String,
  },
  data() {
    return {
      sizeMap,
      searchText: '',
      searchResults: [],
      selectedList: [],
      popupVisible: false,
      popperJS: null,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClosePopup);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClosePopup);
  },
  computed: {
    multipleClass() {
      if (this.normalMultiple && this.multiple) {
        return 'normalMultiple';
      } if (this.multiple) {
        return 'multiple';
      }
      return 'single';
    },
    tagMultipleClass() {
      if (this.normalMultiple && this.multiple) {
        return 'normalMultiple';
      } if (this.multiple) {
        return 'multiple sdp-select-tag';
      }
      return 'normalFlex';
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        this.updateSelectValue();
      },
    },
    data: {
      immediate: true,
      deep: true,
      handler() {
        this.updateSelectValue();
      },
    },
  },
  methods: {
    updateSelectValue() {
      if (this.multiple) {
        this.selectedList = [];
        this.data.forEach(item => {
          if (item.checked) this.selectedList.push(item);
        });
      }
      if (Array.isArray(this.value)) {
        this.selectedList = [];
        this.value.forEach(item => {
          this.data.forEach(elem => {
            if (this.withLabel) {
              if (item.checked) this.selectedList.push(item);
              if (item.value === elem.value) {
                this.selectedList.push({ ...elem });
              }
            } else if (item === elem.value) {
              this.selectedList.push({ ...elem });
            }
          });
        });
      }
    },
    filterData() {
      this.searchResults = this.data.filter(item => {
        if (item.label.includes(this.searchText)) { return { ...item }; }
        return false;
      });
    },
    changeSelectedList(data) {
      this.multiple
        ? this.multipleSelect(data)
        : this.singleSelect(data);

      const eventData = [...this.selectedList].map(item => (this.withLabel ? item : item.value));
      this.$emit('input', eventData);
      this.$emit('change', eventData);
    },
    multipleSelect(data) {
      let isAdd = true;
      this.selectedList.some((item, index) => {
        if (item.value === data.value) {
          this.selectedList.splice(index, 1);
          isAdd = false;
          return true;
        }
        return false;
      });
      isAdd && this.selectedList.push(data);
    },
    singleSelect({ label, value }) {
      if ((this.selectedList[0] || {}).value !== value) {
        this.$set(this.selectedList, 0, { label, value });
      }
      this.switchPopup();
    },
    switchPopup() {
      if (this.disable) { return; }
      this.popupVisible = !this.popupVisible;
    },
    handleClosePopup({ target }) {
      const { $el } = this;
      const sdpDelectPopup = this.$refs['c-sdp-select-popup'];
      if (!$el.contains(target) && !sdpDelectPopup.contains(target)) {
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
      const reference = this.$refs['c-sdp-select'];
      const popper = this.$refs['c-sdp-select-popup']; // 弹出层

      if (!popper || !reference) return;

      // eslint-disable-next-line no-prototype-builtins
      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy();
      }

      options.placement = 'bottom';

      options.modifiers.offset.offset = this.offset || (sizeMap[this.size] === 'large' ? '0, -45' : '0, -38');
      options.onCreate = () => {
        this.$nextTick(this.updatePopper);
      };
      this.popperJS = new Popper(reference, popper, options);
    },
    updatePopper() {
      if (this.popperJS) {
        // 更新弹出层的宽度
        const reference = this.$refs['c-sdp-select'];
        const popper = this.$refs['c-sdp-select-popup']; // 弹出层
        popper.style.width = `${reference.clientWidth}px`;
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },
  },
  updated() {
    if (this.transfer) {
      this.$nextTick(() => this.updatePopper());
    }
  },
};
</script>

<style lang="less">
.c-sdp-select {
  position: relative;
  display: inline-block;
  color: #06003B;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  .sdp-select-display {
    width: 100%;
    height: 100%;
    padding: 0 30px 0 12px;
    .normalFlex {
      display: flex;
      align-items: center;
    }
    .sdp-select-selected-list {
      width: 100%;
      height: 100%;
      user-select: none;
      overflow: hidden;
      &.normalMultiple,
      &.single {
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.multiple {
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .select-item-action-icon {
        margin-left: 8px;
        width: 16px;
        height: 16px;
      }
    }
  }
  &.large {
    width: 360px;
    line-height: 38px;
    font-size: 14px;
    &.single,
    &.normalMultiple {
      height: 40px;
    }
    &.multiple {
      min-height: 40px;
    }
    .sdp-select-list {
      min-height: 74px;
      max-height: 185px;
      overflow: auto;
    }
    .sdp-select-selected-list {
      width: 100%;
      max-height: 120px;
    }
  }
  &.small {
    width: 200px;
    line-height: 30px;
    font-size: 12px;
    &.single,
    &.normalMultiple {
      height: 32px;
    }
    &.multiple {
      min-height: 32px;
    }
    .sdp-select-list {
      min-height: 70px;
      max-height: 175px;
      overflow: auto;
    }
    .sdp-select-selected-list {
      width: 100%;
      max-height: 96px;
    }
  }
  &.disable {
    cursor: not-allowed;
    color: #dcdfe6 !important;
  }
  .sdp-select-tag {
    position: relative;
    display: inline-block;
    border-radius: 100px;
    padding: 3px 12px;
    font-size: 12px;
    line-height: normal;
    margin-right: 12px;
    border: 1px solid #eaeaea;
    background: #F5F7FA;
    cursor: pointer;
    user-select: none;
    &.multiple {
      padding: 3px 28px 3px 12px;
      margin-right: 8px;
    }
    .sdp-select-delete {
      position: absolute;
      top: 50%;
      right: 8px;
      font-size: 14px;
      line-height: 14px;
      color: #C0C4CC;
      transform: translateY(-50%);
    }
    .select-item-icon {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
  .sdp-select-placeholder {
    color: #BFC4CD;
  }
  .icon_select_fold {
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

// 弹出层
.sdp-select-popup {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -8px;
  background: #fff;
  border: 1px solid #DCDFE6;
  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0 5px 15px 0 rgba(0, 21, 33, 0.05);
  cursor: default;
  z-index: @zLeveDropBox;
  transform: translateY(100%);
  animation: sdp-select-popup-ani .2s forwards ease-out;
  @keyframes sdp-select-popup-ani {
    0% {
      opacity: 0;
      transform: translateY(90%);
    }
    100% {
      opacity: 1;
      transform: translateY(100%);
    }
  }
  &.transfer {
    left: auto;
    bottom: auto;
  }
  &.large {
    font-size: 14px;
    .sdp-select-selected-list {
      width: 100%;
    }
  }
  &.small {
    font-size: 12px;
    .sdp-select-list {
      overflow: auto;
    }
    .sdp-select-selected-list {
      width: 100%;
    }
  }
  .sdp-select-input-wrap {
    padding: 0 12px 12px;
  }
  // preset
  .sdp-select-preset {
    padding: 0 12px;
    .sdp-select-title {
      padding: 0;
    }
    .sdp-select-preset-item {
      cursor: pointer;
      &:last-child {
        margin-bottom: 8px;
      }
      &.active {
        color: #3A51E0;
      }
    }
  }
  .sdp-select-tips {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #7F8FA4;
  }
  .sdp-select-title {
    padding: 0 12px;
    font-weight: bold;
  }
  // list
  .sdp-select-list {
    overflow-y: scroll;
    overflow-x: hidden;
    .sdp-select-item {
      position: relative;
      padding: 8px 12px;
      line-height: 1.5;
      user-select: none;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: background 0.25s ease-out;
      &.select-multiple-item {
        padding: 0 11px;
        line-height: 38px;
        .c-checkbox {
          width: 100%;
          overflow: hidden;
          .c-checkbox-wrap {
            padding: 8px 16px;
            cursor: pointer;
            .checkbox-content {
              margin-left: 8px;
            }
          }
        }
      }
      &:hover {
        background: #F5F7FA;
      }
      &.select-single-item {
        padding-right: 16px;
        display: flex;
        align-items: center;
        &.active {
          background: #F5F7FA;
          &::after {
            content: " ";
            position: absolute;
            top: 49%;
            right: 16px;
            width: 3px;
            height: 7px;
            border: 2px solid;
            border-left: none;
            border-top: none;
            color: #06003B;
            transform: translateY(-50%) rotate(45deg);
          }
        }
      }
    }
  }
}
</style>
