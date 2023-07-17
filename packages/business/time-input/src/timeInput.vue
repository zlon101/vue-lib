<template>
  <div class="c-time-input">
    <template v-for="(item, ind) in Cfg" :key="ind">
      <ZInput
        class="input-item"
        purenumber
        v-model="$data[item[0]][item[1]]"
        :min="0"
        :max="item[1] === 'hour' ? 23 : 59"
        width="40px"
        maxlength="2"
        @input="handleInput"
        @blur="handleBlur(item[0], item[1])"
      />
      <span v-if="ind !== Cfg.length - 1" class="input-item" :key="`:${ind}`">:</span>
    </template>
  </div>
</template>

<script>
import ZInput from '@zl/input';

const Cfg = [['start', 'hour'], ['start', 'min'], ['end', 'hour'], ['end', 'min']];

export default {
  props: ['value'],
  components: { ZInput },
  data() {
    return {
      Cfg,
      start: { hour: '', min: '' },
      end: { hour: '', min: '' },
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.start = val.start;
        this.end = val.end;
      },
    },
  },
  methods: {
    handleBlur(type, time) {
      this[type][time] = this[`${type + time}Rule`](this[type][time]);
      this.handleInput('blur');
    },
    starthourRule(str) {
      str = this.format(str);
      // 第一个框输入的值大于第三个输入框 且 此时第四个输入框大于或等于第二个输入框 则 第三个输入框更新为“第一个输入框的值”
      if (str > this.end.hour && this.end.min >= this.start.min) {
        this.end.hour = str;
      } else if (str >= this.end.hour && this.end.min < this.start.min) {
        // 第一个框输入的值大于等于第三个输入框 且 第四个输入框小于第二个输输入框 则 第三个输入框更新为“第一个输入框的值+1”
        const newStr = Number(str) + 1;
        this.end.hour = this.format(`${newStr > 23 ? 23 : newStr}`);
        if (newStr > 23 && this.end.min < this.start.min) {
          this.end.min = this.start.min;
        }
      }
      return str;
    },
    startminRule(str) {
      str = this.format(str);
      // 第二个框输入的值大于第四个的值 且 第一个输入框的值等于第三个输入框的值 则 第四个输入框更新为第二个输入框的值
      if (str > this.end.min && this.start.hour === this.end.hour) {
        this.end.min = str;
      }
      return str;
    },
    endhourRule(str) {
      str = this.format(str);
      // 第三个框输入的值小于第一个输入框 且 第四个输入框大于或等于第二个输入框 则 第一个输入框更新为第三个输入框的值
      if (str < this.start.hour && this.end.min >= this.start.min) {
        this.start.hour = str;
      } else if (str <= this.start.hour && this.end.min < this.start.min) {
        // 第三个框输入的值小于等于第一个输入框 且 第四个输入框小于第二个输输入框 则 第一个输入框更新为“第三个输入框的值-1”
        const newStr = Number(str) - 1;
        this.start.hour = this.format(`${newStr < 0 ? 0 : newStr}`);
        if (newStr < 0 && this.start.min > this.end.min) {
          this.start.min = this.end.min;
        }
      }
      return str;
    },
    endminRule(str) {
      str = this.format(str);
      // 第四个框输入的值小于第二个的值 且 第一个输入框的值等于第三个输入框的值 则 第二个输入框需自动更新为第四个输入框的值
      if (str < this.start.min && this.start.hour === this.end.hour) {
        this.start.min = str;
      }
      return str;
    },
    format(str) {
      if (str.length === 1) {
        return `0${str}`;
      }
      if (!str) {
        return '00';
      }
      return str;
    },
    handleInput(from = 'input') {
      this.$emit(from, { start: this.start, end: this.end });
    },
  },
};
</script>

<style lang="less" scoped>
.c-time-input {
  display: inline-flex;
  align-items: center;
  .input-item {
    margin: 0 8px 0 0;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  :deep(input) {
    padding: 0 8px !important;
    text-align: center;
  }
}
</style>
