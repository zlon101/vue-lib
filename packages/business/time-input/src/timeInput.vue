<template>
  <div class="c-time-input">
    <SdpInput v-model="start.hour" size="s" width="40px" placeholder="" maxlength="2" class="m-r-8" @inputChange="hourValidate" @blur="handleBlur('start', 'hour')"></SdpInput>
    <span class="m-r-8">:</span>
    <SdpInput v-model="start.min" size="s" width="40px" placeholder="" maxlength="2" class="m-r-8" @inputChange="minValidate" @blur="handleBlur('start', 'min')"></SdpInput>
    <span class="m-r-8">-</span>
    <SdpInput v-model="end.hour" size="s" width="40px" placeholder="" maxlength="2" class="m-r-8" @inputChange="hourValidate" @blur="handleBlur('end', 'hour')"></SdpInput>
    <span class="m-r-8">:</span>
    <SdpInput v-model="end.min" size="s" width="40px" placeholder="" maxlength="2" @inputChange="minValidate" @blur="handleBlur('end', 'min')"></SdpInput>
  </div>
</template>

<script>
import SdpInput from '@zl/input';

export default {
  name: 'TimeInput',
  props: ['value'],
  components: { SdpInput },
  data() {
    return {
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
    hourValidate(e) {
      e.target.value = e.target.value.replace(/[^\d]/, '');
      if (e.target.value > 23) {
        e.target.value = '23';
      }
      this.handleInput();
    },
    minValidate(e) {
      e.target.value = e.target.value.replace(/[^\d]/, '');
      if (e.target.value > 59) {
        e.target.value = '59';
      }
      this.handleInput();
    },
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
      } if (!str) {
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
  .m-r-8 {
    margin: 0 8px 0 0;
  }
  /deep/ input {
    padding: 0 8px !important;
    text-align: center;
  }
}
</style>
