<template>
  <div
    class="c-time-picker"
    tabindex="0"
    @blur="blurAction">
    <div class="cal-wrap" @click="switchFold" :class="dispalyClass">
      <IconCalender class="icon_time" s="24px" />
      <span class="display-v">
        <span>{{ showText }}</span>
      </span>
      <IconCross class="icon_delete" s="12px" :fill="{0:'#C0C4CC'}" @click.stop="deleteData" />
    </div>
    <transition>
      <div v-show="unfold" :class="['cal-item', unfold ? 'in' : 'out']">
        <TimePickerDetail @onchange="handleUpdateTime" :showSelectResult="false"
          :key="timePickerKey"
          :defaultModel="defaultModel"
          :defaultValue="defaultValueRender" />
      </div>
    </transition>
    <div class="action">
      <IconFold class="icon_fold before" @click="before7" />
      <IconFold class="icon_fold after" @click="after7" />
    </div>
  </div>
</template>

<script>
import { IconFold, IconCalender, IconCross } from '@pic/icon';
import { dateToString } from '@pic/utils/lib/date';
import TimePickerDetail from './timepickerdetail.vue';

export default {
  name: 'TimePicker',
  components: {
    TimePickerDetail,
    IconFold,
    IconCalender,
    IconCross,
  },
  props: {
    placeholder: {
      type: String,
      default: '选择时间范围',
    },
    defaultValue: Array, // [Date, Date]
    defaultModel: String,
  },
  data() {
    return {
      unfold: false,
      // init 时间，当选择的时间为空的时候
      initStart: this.addDays(new Date(), -6),
      initEnd: new Date(),
      selectVal: null, // [Date, Date]
      timePickerKey: Math.random(),
    };
  },
  computed: {
    dispalyClass() {
      return {
        'has-value': !!this.selectVal && this.selectVal.length,
      };
    },
    showText() {
      if (!this.selectVal || !this.selectVal.length) {
        return this.placeholder;
      }
      return this.selectVal.map(v => dateToString(v, 'YYYY-MM-DD')).join('~');
    },
    defaultValueRender() {
      if (!this.selectVal || !this.selectVal.length) {
        return [this.initStart, this.initEnd];
      }
      return this.selectVal;
    },
  },
  methods: {
    blurAction() {
      this.unfold = false;
    },
    switchFold() {
      this.unfold = !this.unfold;
    },
    handleUpdateTime(value) {
      this.selectVal = value;
      this.unfold = false;
    },
    addDays(date, num) {
      const result = new Date(date.getTime());
      result.setDate(result.getDate() + num);
      return result;
    },
    deleteData() {
      this.selectVal = null;
      this.timePickerKey = Math.random();
    },
    before7() {
      if (!this.selectVal || !this.selectVal.length) {
        return;
      }
      const [end] = this.selectVal;
      this.selectVal = [this.addDays(end, -6), end];
    },
    after7() {
      if (!this.selectVal || !this.selectVal.length) {
        return;
      }
      let start = this.selectVal[1];
      let end = this.addDays(start, 6);
      if (end > new Date()) {
        end = new Date();
        start = this.addDays(new Date(), -6);
      }
      this.selectVal = [start, end];
    },
  },
  watch: {
    selectVal(newV) {
      let tr = null;
      if (newV && newV.length === 2) {
        tr = {
          start: `${dateToString(newV[0], 'YYYY-MM-DD')} 00:00:00`,
          end: `${dateToString(newV[1], 'YYYY-MM-DD')} 23:59:59`,
        };
      }
      this.$emit('onchange', tr);
    },
    defaultValue: {
      immediate: true,
      handler(value) {
        value && (this.selectVal = value);
      },
    },
  },
};
</script>

<style lang="less" scoped>

.c-time-picker {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  width: 310px;
  height: 32px;
  cursor: pointer;
  background: #F5F7FA;
  border-radius: 8px;
  z-index: @zLeveTooltip; // 这个组件比较特殊不要改
  .cal-wrap {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 20px;
      background: #DCDFE6;
    }
    &.has-value {
      .display-v {
        color: #06003b;
      }
      .icon_delete {
        display: block;
      }
    }
    .icon_time {
      width: 24px;
      height: 24px;
      margin-left: 12px;
      margin-right: 8px;
    }
    .icon_delete {
      display: none;
      width: 12px;
      height: 12px;
      margin-left: 8px;
      margin-right: 12px;
      cursor: pointer;
    }
    .display-v {
      flex: 1 0 auto;
      font-size: 14px;
      color: #c0c4cc;
      font-weight: 200;
      line-height: 22px;
    }

  }
  .cal-item {
    position: absolute;
    right: 0;
    bottom: -8px;
    transform: translateY(100%);
    display: block;
    &.in {
      animation: time-picker-ani-in 0.2s forwards ease-out;
      @keyframes time-picker-ani-in {
        0% {
          opacity: 0;
          transform: translateY(95%);
        }
        100% {
          opacity: 1;
          transform: translateY(100%);
        }
      }
    }
    &.out {
      animation: time-picker-ani-out 0.2s forwards ease-out;
      @keyframes time-picker-ani-out {
        0% {
          opacity: 1;
          transform: translateY(100%);
        }
        100% {
          opacity: 0;
          transform: translateY(95%);
        }
      }
    }
  }
  .action {
    display: flex;
    flex: 0 0 auto;
    width: 56px;
    height: 100%;
    align-items: center;
    justify-content: center;
    .icon_fold {
      width: 16px;
      height: 16px;
      &.before {
        transform: rotate(90deg);
      }
      &.after{
        transform: rotate(-90deg);
      }
    }
  }

}
</style>
