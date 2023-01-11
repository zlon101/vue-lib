<template>
  <div class="c-checkbox-group-v2">
    <checkbox
      v-for="item in options"
      :style="style"
      v-bind="item"
      :status="getStatus(item)"
      :key="item.id"
      @update:status="onUpdate(item.id, $event)"
    >
      <!-- {{ item.label }} -->
      <div v-html="item.label" class="label-wrap"></div>
    </checkbox>
  </div>
</template>

<script>
import checkbox from './checkbox.vue';

export default {
  name: 'CheckboxGroupV2',
  inheritAttrs: false,
  components: { checkbox },
  props: {
    // 可选项: [{ id, label, ...checkbox.$props }]
    options: {
      type: Array,
      required: true,
    },
    // 已选项id列表
    checkeds: Array,
    vertical: Boolean,
    margin: {
      type: String,
      default: '16px',
    },
  },
  computed: {
    style() {
      const sty = {};
      if (this.vertical) {
        sty.display = 'flex';
        sty['margin-bottom'] = this.margin;
      } else {
        sty['margin-right'] = this.margin;
      }
      return sty;
    },
  },
  methods: {
    getStatus(opt) {
      return Object.prototype.hasOwnProperty.call(opt, 'status') ? opt.status : (this.checkeds || []).includes(opt.id);
    },
    onUpdate(id, val) {
      if (typeof this.checkeds === 'undefined' || val === 'some') {
        const nOpts = [...this.options];
        const curItemIdx = nOpts.findIndex(item => item.id === id);
        if (curItemIdx !== -1) {
          nOpts[curItemIdx].status = val;
          this.$emit('update:options', nOpts);
        }
        return;
      }

      let nCheckeds = [...this.checkeds];
      if (val === true || val === 'all') {
        nCheckeds.push(id);
      } else if (val === false || val === 'none') {
        nCheckeds = nCheckeds.filter(item => item !== id);
      }
      this.$emit('update:checkeds', nCheckeds);
      this.$emit('change', nCheckeds);
    },
  },
};
</script>
