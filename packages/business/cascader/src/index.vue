<template>
  <div class="c-cascader">
    <div @click="onTogglePopup">
      <slot>
        <div :class="['cascader_input', { gray: !hasSelectVal }]">
          <span>{{ getShowText() }}</span>
          <IconFold2 class="cascader_icon" s="12" color="#7F8FA4" />
        </div>
      </slot>
    </div>
    <pre style="display: none">{{nodeHeap}}</pre>
    <div class="cascader_popup_hod" :style="`display:none; z-index:${zIndex}`" ref="popup">
      <template v-if="open && !!root">
        <template v-for="varLevel in levelArray">
          <ul v-if="getLevelOpts(varLevel)" @click="onSelect(varLevel, $event)" :key="varLevel">
            <li v-for="(opt, ind1) in getLevelOpts(varLevel)" :class="{active: isActive(opt)}" :data-index="ind1" :key="opt[uid]">
              <span>{{ opt[labelKey] }}</span>
              <IconFold2 v-if="opt.children && opt.children.length" class="cascader_pop_icon" s="12" color="#7F8FA4" />
            </li>
          </ul>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { IconFold2 } from '@zl/icon';

export default {
  inheritAttrs: false,
  components: {IconFold2},
  props: {
    value: [Array, String], // uid | Array<树节点>
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 唯一标识key
    uid: {
      type: String,
      required: true,
    },
    labelKey: {
      type: String,
      default: 'name',
      required: true,
    },
    // Object { [labelKey], [uid] }
    root: {
      type: Object,
      required: true,
    },
    zIndex: {
      type: String,
      default: '100',
    },
    joinSym: {
      type: String,
      default: '/',
    },
    showRootLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      // 需要显示第几级
      level: 1,
      insideVal: null,
    };
  },
  created() {
    // 当前显示的每level列表(包含最后点击的叶节点)的父级节点，level 从1开始
    this.nodeHeap = [];
  },
  computed: {
    hasSelectVal() {
      const _selectOpt = this.value || this.insideVal;
      if (!_selectOpt) return false;
      if (Array.isArray(_selectOpt)) return _selectOpt.length;
      return !!_selectOpt;
    },
    levelArray() {
      return new Array(this.level).fill(true).map((_, _ind) => _ind + 1);
    },
  },
  watch: {
    value: {
      handler() {
        this.initByValue();
      },
      immediate: true,
    },
    root: {
      handler() {
        this.initByValue();
      },
      immediate: true,
    },
  },
  methods: {
    isActive(opt) {
      return this.nodeHeap.findIndex(item => item[this.uid] === opt[this.uid]) !== -1;
    },
    getShowText() {
      if (!this.hasSelectVal) return this.placeholder;
      const _selectOpt = this.value;
      const _labelKey = this.labelKey;
      const startIdx = this.showRootLabel ? 0 : 1;
      if (Array.isArray(_selectOpt)) {
        return _selectOpt.slice(startIdx).map(item => item[_labelKey]).join(this.joinSym);
      }
      return (this.insideVal || []).slice(startIdx).map(item => item[_labelKey]).join(this.joinSym);
    },
    onTogglePopup(val) {
      if (!this.nodeHeap.length && this.root) {
        this.nodeHeap.push(this.root);
      }

      this.open = typeof val === 'boolean' ? val : !this.open;
      const popupDom = this.$refs.popup;
      if (this.open) {
        this.calcAnchorCoord();
        popupDom.style.display = 'flex';
      } else {
        popupDom.style.display = 'none';
      }
    },
    /**
     * 计算第 varLevel 级的可选项列表
     * ****/
    getLevelOpts(varLevel, parent) {
      // 被递归调用
      if (parent) {
        const child = parent.children || [];
        return child.length > 0 ? child : null;
      }
      // 被 render 方法调用
      if (varLevel < 1) {
        throw new Error('getLevelOpts function varLevel param error');
      }
      if (varLevel === 1) {
        return this.root.children || [];
      }
      return this.getLevelOpts(varLevel, this.nodeHeap[varLevel - 1]);
    },
    initByValue() {
      // if (this.value && this.root && !this.insideVal && !Array.isArray(this.value))
      // value 是数组表示是由用户点击修改数据后更新父组件导致
      if (this.root && !Array.isArray(this.value)) {
        this.nodeHeap = [];
        if (!this.fillNodeHeap(this.root)) {
          this.value && console.error('未找到对应的value节点');
          this.nodeHeap = [this.root];
        }
        this.insideVal = this.nodeHeap.map(item => ({ ...item, children: null }));
        this.level = this.nodeHeap.length;
      }
    },
    // 根据value填充nodeHeap
    fillNodeHeap(parent) {
      const N = this.nodeHeap.length;
      const _value = this.value;
      const _uid = this.uid;

      if ((Array.isArray(_value) && _value.length === 0) || !_value) {
        return false;
      }
      if (Array.isArray(_value)) {
        if (_value[_value.length - 1][_uid] === this.nodeHeap[N - 1][_uid]) {
          return true;
        }
        if (_value[0][_uid] === this.root[_uid]) {
          this.nodeHeap = _value;
        } else {
          this.nodeHeap = [this.root, ..._value];
        }
        return true;
      }

      if (typeof _value !== 'string') {
        throw new Error('props.value 类型错误');
      }

      // 根据code 找到父级路径
      this.nodeHeap.push(parent);
      if (parent[_uid] === _value) {
        return true;
      }
      for (const node of (parent.children || [])) {
        if (this.fillNodeHeap(node)) {
          return true;
        }
      }
      this.nodeHeap.pop();
    },
    // 点击第 varLevel 层的某个节点
    onSelect(varLevel, event) {
      const liDom = event.target;
      if (liDom.tagName.toLowerCase() !== 'li') {
        return;
      }

      const _index = liDom.dataset.index;
      const _nodeHeap = this.nodeHeap;
      const nowSelectOpt = _nodeHeap[varLevel - 1].children[_index];
      this.nodeHeap = _nodeHeap.slice(0, varLevel).concat(nowSelectOpt);
      if (nowSelectOpt.children && nowSelectOpt.children.length) {
        this.level = varLevel + 1;
      }
      this.insideVal = this.nodeHeap.map(item => ({ ...item, children: null }));
      this.$emit('input', this.insideVal);
    },
    // 计算锚点/参考点的位置
    calcAnchorCoord() {
      const AnchorCoord = this.$el.getBoundingClientRect();
      const popupDom = this.$refs.popup;
      const top = AnchorCoord.top + AnchorCoord.height + 8;
      popupDom.style.left = `${AnchorCoord.left}px`;
      popupDom.style.top = `${top}px`;
      return AnchorCoord;
    },
  },
  mounted() {
    this.calcAnchorCoord();
    document.body.appendChild(this.$refs.popup);

    const onDocClick = e => {
      const { target } = e;
      if (!this.open || this.$el.contains(target)) return;

      if (!this.$refs.popup.contains(target)) {
        this.onTogglePopup(false);
      }
    };
    document.addEventListener('click', onDocClick);

    const onDocFocus = () => this.calcAnchorCoord();
    window.addEventListener('focus', onDocFocus);

    const onDocResize = () => {
      this.onTogglePopup(false);
    };
    window.addEventListener('resize', onDocResize);

    this._removeListener = () => {
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('focus', onDocFocus);
      window.removeEventListener('resize', onDocResize);
      document.body.removeChild(this.$refs.popup);
    };
  },
  beforeDestroy() {
    this._removeListener();
  },
};
</script>

<style lang="less" scoped>
.c-cascader {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  .cascader_input {
    min-height: 40px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    font-size: 14px;
    color: #06003b;
    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.gray {
      color: #c0c4cc;
    }
    .cascader_icon {
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
.cascader_popup_hod {
  padding: 8px 0px;
  max-height: 300px;
  display: flex;
  position: absolute;
  left: 0;
  bottom: -8px;
  transform: rotate(0deg);
  overflow: auto;
  z-index: 200;
  color: rgba(0,0,0,.88);
  font-size: 14px;
  line-height: 22px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,.08),0 3px 6px -4px rgba(0,0,0,.12),0 9px 28px 8px rgba(0,0,0,.05);
  ul {
    padding: 4px;
    flex: 1;
    vertical-align: top;
    border-right: 1px solid rgba(5,5,5,.06);
    &:last-child {
      border-right: none;
    }
  }
  li {
    padding: 5px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    justify-content: space-between;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0,0,0,.04);
    }
    &.active {
      font-weight: bold;
      background-color: #e6f4ff;
    }
    > * {
      pointer-events: none;
    }
  }
  .cascader_pop_icon {
    margin-left: 8px;
  }
}
</style>
