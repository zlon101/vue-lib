<template>
  <div class="time-picker-detail-wrap" @click.stop.prevent>
    <div class="time-picker-detail-start-time time-picker-detail-calendar">
      <div class="input"><span class="tt">开始日期:</span><span class="vv">{{ timeRangeStr.startTime }}</span></div>
      <Calendar
        @updateAction="updateDateAction($event, 'startTime')"
        :showSelectResult="false"
        :initDate="value.startTime"
      />
    </div>
    <div class="time-picker-detail-end-time time-picker-detail-calendar">
      <div class="input"><span class="tt">结束日期:</span><span class="vv">{{ timeRangeStr.endTime }}</span></div>
      <Calendar
        @updateAction="updateDateAction($event, 'endTime')"
        :showSelectResult="false"
        :initDate="value.endTime"
        :minDate="value.startTime"
      />
    </div>
    <div class="time-picker-detail-shortcut-options-wrap">
      <ul class="time-picker-detail-shortcut-options-content">
        <li
          v-for="(date, k) in shortcutOptions"
          @click="selectShortcutDate(k)"
          :key="date.text"
          class="pointer"
          :class="{ active: curShortcutOptions === k }"
        >
          {{ date.text }}
        </li>
      </ul>
      <div class="time-picker-detail-btn-list">
        <span @click="handleCancel" class="btn">取消</span>
        <span @click="handleSure" class="btn">应用</span>
      </div>
    </div>
  </div>
</template>

<script>
import { stringToDate, dateToString } from '@pic/utils/lib/date';
import Calendar from './calendar';

const shortcutOptions = {
  today: {
    text: '今天',
    getValue: () => {
      const now = new Date();
      return [now, now];
    },
    offset: [0, 0],
  },
  yesterday: {
    text: '昨天',
    getValue: () => {
      const now = new Date();
      const [year, month, day] = [now.getFullYear(), now.getMonth(), now.getDate()];
      const result = new Date(year, month, day - 1);
      return [result, result];
    },
    offset: [-1, -1],
  },
  past7Day: {
    text: '过去7天',
    getValue: () => {
      const now = new Date();
      const [year, month, day] = [now.getFullYear(), now.getMonth(), now.getDate()];
      const firserDay = new Date(year, month, day - 6);
      return [firserDay, now];
    },
    offset: [-6, 0],
  },
  past30Day: {
    text: '过去30天',
    getValue: () => {
      const now = new Date();
      const [year, month, day] = [now.getFullYear(), now.getMonth(), now.getDate()];
      const firserDay = new Date(year, month, day - 29);
      return [firserDay, now];
    },
    offset: [-29, 0],
  },
  curMonth: {
    text: '本月',
    getValue: () => {
      const now = new Date();
      const [year, month] = [now.getFullYear(), now.getMonth()];
      const firserDay = new Date(year, month, 1);
      return [firserDay, now];
    },
    offset: 0,
  },
  lastMonth: {
    text: '前一个月',
    getValue: () => {
      const now = new Date();
      const [year, month] = [now.getFullYear(), now.getMonth()];
      const firserDay = new Date(year, month - 1, 1);
      const secondDay = new Date(year, month, 0);
      return [firserDay, secondDay];
    },
    offset: 0,
  },
  customize: {
    text: '自定义日期',
    getValue: () => null,
    offset: 0,
  },
};

export default {
  name: 'TimeRangePicker',
  components: {
    Calendar,
  },
  props: {
    defaultValue: Array,
    showSelectResult: Boolean,
    defaultModel: String,
  },
  data() {
    return {
      value: {
        startTime: null,
        endTime: null,
      },
      lastValue: {
        startTime: null,
        endTime: null,
      },
      shortcutOptions,
      curShortcutOptions: 'past7Day',
    };
  },
  computed: {
    timeRangeStr() {
      const { startTime, endTime } = this.value;
      return {
        startTime: startTime ? dateToString(startTime, 'YYYY-MM-DD') : '',
        endTime: endTime ? dateToString(endTime, 'YYYY-MM-DD') : '',
      };
    },
  },
  methods: {
    initTime(newV) {
      if (Array.isArray(newV) && newV.every(v => v instanceof Date)) {
        [this.value.startTime, this.value.endTime] = newV;
      } else {
        this.value.startTime = new Date();
        this.value.endTime = new Date();
      }
    },
    updateDateAction(value, type) {
      this.value[type] = stringToDate(value);
      this.curShortcutOptions = 'customize';
    },
    selectShortcutDate(k) {
      this.curShortcutOptions = k;
      if (k !== 'customize') {
        const result = shortcutOptions[k].getValue();
        [this.value.startTime, this.value.endTime] = result;
      }
    },
    handleCancel() {
      // 需求如此“取消” 不是 “清空”
      if (this.lastValue.startTime && this.lastValue.endTime) {
        this.$emit('onchange', [this.lastValue.startTime, this.lastValue.endTime]);
      } else {
        this.$emit('onchange', null);
      }
    },
    handleSure() {
      const { startTime, endTime } = this.value;
      if (startTime > endTime) {
        this.value = {
          startTime: endTime,
          endTime: startTime,
        };
        this.$emit('onchange', [endTime, startTime]);
      } else {
        this.$emit('onchange', [startTime, endTime]);
      }
      this.lastValue = {
        startTime: this.value.startTime,
        endTime: this.value.endTime,
      };
    },
  },
  watch: {
    defaultValue(newV) {
      this.initTime(newV);
    },
    defaultModel: {
      immediate: true,
      handler(value) {
        value && (this.curShortcutOptions = value);
      },
    },
  },
  created() {
    this.initTime(this.defaultValue);
    // if (Array.isArray(this.defaultValue) && this.defaultValue.every(v => v instanceof Date)) {
    //   [this.value.startTime, this.value.endTime] = this.defaultValue;
    // } else {
    //   this.value.startTime = new Date();
    //   this.value.endTime = new Date();
    // }
  },
};
</script>

<style lang="less" scoped>
.time-picker-detail {
  &-wrap {
    display: flex;
    position: relative;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-top: 5px;
    width: 920px;
    min-height: 316px;
    background-color: #fff;
    opacity: 1;
    box-shadow: 0 5px 15px 0 rgba(0, 21, 33, 0.05);
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-family: 'SF Pro Text', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    * {
      user-select: none;
    }
  }
  &-calendar {
    position: relative;
    flex: 0 0 auto;
    padding: 0 20px;
    border-right: 1px solid #dcdfe6;
    .input {
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      justify-items: center;
      height: 40px;
      width: 288px;
      padding: 10px;
      text-align: center;
      border-radius: 8px;
      background: #f7f7f7;
      .tt {
        margin-right: 10px;
        font-size: 14px;
        color: #06003B;
        font-weight: 600;
      }
      .vv {
        font-size: 16px;
        color: #333;
      }
    }
  }
  &-shortcut-options-wrap {
    padding-top: 15px;
    padding-left: 20px;
    flex: auto;
    min-width: 100px;
    position: relative;
    font-size: 14px;
    font-size: 16px;
    line-height: 20px;
    color: #ccc;
  }
  &-shortcut-options-content {
    li {
      padding-bottom: 20px;
    }
    li:hover,
    .active {
      color: #3a51e0;
      text-decoration: underline;
    }
  }
  &-btn-list {
    text-align: left;
    .btn {
      display: inline-block;
      width: 60px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 6px;
      color: #333;
      background-color: #fff;
      border: 1px solid #DCDFE6;
      vertical-align: middle;
      font-size: 14px;
    }
    .btn:first-child {
      margin-right: 20px;
    }
  }
}
@media screen and (max-width: 1240px) {
  .time-picker-detail {
    &-wrap {
      margin-top: 5px;
      width: 774px;
    }
    &-btn-list {
      .btn {
        display: block;
      }
      .btn:first-child {
        margin-right: 0;
      }
      .btn:last-child {
        margin-top: 10px;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .time-picker-detail {
    &-wrap {
      width: 720px;
      font-size: 14px;
      .week-text {
        font-size: 14px;
      }
      .calendar-comp .calendar table {
        font-size: 14px;
      }
    }
    &-calendar{
      padding: 15px 10px 0;
    }
    &-shortcut-options-wrap{
      padding-left: 10px;
      font-size: 14px;
    }
    &-btn-list{
      .btn{
        max-width: 60px;
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
      }
      .btn:last-child {
        margin-top: 5px;
      }
    }
  }
}
</style>
