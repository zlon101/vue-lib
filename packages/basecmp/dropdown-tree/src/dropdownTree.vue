<template>
  <Dropdown ref="c-dropdown-tree-ref" class="c-dropdown-tree" equalWidth @changeVisible="changeVisible">
    <div class="input">
      <p v-if="currentLabel" class="g-single-text">{{ currentLabel }}</p>
      <p v-else class="placeholder g-single-text">{{ placeholder }}</p>
      <i :class="['icon_select_fold', { active: popupVisible }]"></i>
    </div>
    <div class="jvsuu3rn8p" slot="options">
      <Tree
        greyBg
        markRootNode
        ref="dropdown-org-tree"
        :data="[data]"
        node-key="value"
        :expand-on-click-node="false"
        :current-node-key="value"
        default-expand-all
        :render-content="renderContent"
        @node-click="handleNodeClick">
      </Tree>
    </div>
  </Dropdown>
</template>

<script>
import Dropdown from '@pic/dropdown';
import Tree from '@pic/tree';

export default {
  name: 'DropdownTree',
  components: { Dropdown, Tree },
  props: {
    data: Object,
    value: String,
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      currentLabel: '',
      currentValue: '',
      popupVisible: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.findCurrentLabel();
      },
    },
    data: {
      immediate: true,
      handler() {
        // wait mounted
        setTimeout(this.findCurrentLabel);
      },
    },
  },
  methods: {
    handleNodeClick(event, node) {
      this.currentLabel = this.joinLabel(node);
      this.currentValue = event.value;
      this.$emit('input', event.value);
      this.$refs['c-dropdown-tree-ref'].switchPopup();
    },
    findCurrentLabel() {
      const dot = this.$refs['dropdown-org-tree'];
      if (this.value && dot) {
        this.$nextTick(() => {
          dot.setCurrentKey(this.value);
          const data = dot.getCurrentNode();
          if (data) {
            const node = dot.getNode(data);
            this.currentLabel = this.joinLabel(node);
            this.currentValue = data.value;
          }
        });
      }
    },
    joinLabel(node) {
      const labelList = [];
      let tNode = node;
      for (let i = 0; i < node.level; i++) {
        labelList.unshift(tNode.label);
        tNode = tNode.parent;
      }
      return labelList.join('/');
    },
    changeVisible(val) {
      this.popupVisible = val;
    },
    renderContent(h, { node, data, store }) {
      return (
        <p class="c9rvmvcctc">
          <span class="label">{node.data.label}</span>
          {this.currentValue === node.data.value ? <i class="icon_select"></i> : undefined}
        </p>);
    },
  },
};
</script>

<style lang="less">
.jvsuu3rn8p {
  max-height: 288px;
  overflow-y: auto;
}
.c9rvmvcctc {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 0 24px 0 0;
  .label {
    flex: 1 1 auto;
  }
}
</style>

<style lang="less" scoped>
.c-dropdown-tree {
  width: 360px;
  .input {
    position: relative;
    display: flex;
    align-items: center;
    width: 360px;
    height: 40px;
    border: 1px solid #D8DCE6;
    padding: 0 40px 0 12px;
    border-radius: 4px;
    .placeholder {
      color: #BFC4CD;
    }
    .icon_select_fold {
      position: absolute;
      top: 50%;
      right: 12px;
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
