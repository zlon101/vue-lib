<template>
  <div class="c-checkbox-group" :class="classes">
    <template v-if="options">
      <Checkbox v-for="(item,index) in options" :key="index" :value="item.value" :label="item.label||item.value" :disabled="disabled||item._disabled||item.disabled" v-model="groupValue" @change="_change($event,item)"/>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script>
import Emitter from './emitter';
import Checkbox from './checkbox.vue';

export default {
  name: 'CheckboxGroup',
  mixins: [Emitter],
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: Array,
    default() {
      return [];
    },
    max: Number,
    min: Number,
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'middle',
      validator(val) {
        return ['large', 'middle', 'small'].includes(val);
      },
    },
  },
  components: { Checkbox },
  data() {
    return {
      groupValue: this.value, // 初始选中值
    };
  },
  computed: {
    classes() {
      return {
        size: this.size,
        disabled: this.disabled,
      };
    },
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    findComponentsDownward(context, componentName, ignoreComponentNames = []) {
      if (!Array.isArray(ignoreComponentNames)) {
        ignoreComponentNames = [ignoreComponentNames];
      }
      return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
          const foundChilds = this.findComponentsDownward(child, componentName);
          return components.concat(foundChilds);
        }
        return components;
      }, []);
    },
    updateModel(update) {
      this.children = this.findComponentsDownward(this, 'Checkbox');
      if (this.children) {
        const { value } = this;
        this.children.forEach(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.includes(child.value) || value.includes(child.label);
            child.group = true;
          }
        });
      }
    },
    _change(value, item) {
      const newLen = this.groupValue.length;
      if (newLen >= this.max) {
        // 将所有未勾选的设为禁用状态
        this.options.forEach(temp => {
          if (this.groupValue.indexOf(temp.value) === -1) {
            this.$set(temp, '_disabled', true);
          }
        });
      } else if (newLen <= this.min) {
        // 将所有已勾选的设为禁用状态
        this.options.forEach(temp => {
          if (this.groupValue.indexOf(temp.value) !== -1) {
            this.$set(temp, '_disabled', true);
          }
        });
      } else {
        // 将所有_disabled去掉
        this.options.forEach(temp => {
          delete temp._disabled;
        });
      }
      if (item) { // 监听状态时不用发emit
        this.$emit('input', [...this.groupValue]);
        this.change && this.change(value, item);
        this.$emit('change', value, item);
      }
    },
    toggleSelect(boolean) {
      const value = [];
      this.options && this.options.forEach(item => {
        if (boolean) {
          // 全选时
          if (item.disabled && this.value.indexOf(item.value) === -1) {
            // 禁用且没有勾选的过滤
          } else {
            value.push(item.value);
          }
          // 取消选择时
        } else if (item.disabled && this.value.indexOf(item.value) !== -1) {
          // 禁用且没有勾选的过滤
          value.push(item.value);
        }
      });
      this.$emit('input', value);
    },
    getValue() {
      return this.options.filter(item => this.value.indexOf(item.value) !== -1);
    },
  },
  watch: {
    value(v) {
      this.groupValue = v;
      this._change(v); // value改变时处理超出最大最小限制时的禁用状态
    },
  },
};
</script>

<style scoped>

</style>
