<template>
  <div class="c-multi-step-bar-wrap">
    <template v-if="list.length">
      <template v-for="(step, ind) in list">
        <div class="icon_wrap" :key="`round-${ind}`">
          <span :class="calcClass(ind)"></span>
          <span class="desc_text">{{ step.text||step }}</span>
        </div>
        <span v-if="ind < list.length - 1" :class="calcLineClass(ind)" :key="ind"></span>
      </template>
    </template>
  </div>
</template>

<script>
import './index.less';

export default {
  name: 'MultiStepBar',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    }, // ['one', 'two']
    curStep: String,
  },
  data() {
    return {
      // renderList: [],
    };
  },
  methods: {
    calcClass(stepInd) {
      const allSteps = this.list;
      const { curStep } = this;
      const curStepInd = allSteps.indexOf(curStep);
      let dstCls = 'gray_round_icon';
      // completed
      if (stepInd < curStepInd) {
        dstCls = 'green_tick_icon iconfont icon-yes';
      } else if (stepInd === curStepInd) {
        dstCls = 'green_round_icon';
      } else {
        dstCls = 'gray_round_icon';
      }
      return dstCls;
    },
    // gray_round_icon
    calcLineClass(stepInd) {
      const allSteps = this.list;
      const { curStep } = this;
      const curStepInd = allSteps.indexOf(curStep);
      let dstCls = 'gray_line';
      if (stepInd === curStepInd - 1) {
        dstCls = 'green_line_arrow';
      } else if (stepInd < curStepInd) {
        dstCls = 'green_line';
      } else {
        dstCls = 'gray_line';
      }
      return dstCls;
    },
  },
};
</script>
