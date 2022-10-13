<template>
  <div class="c-number-input">
    <div class="input-wrap">
      <input class="number-input" :value="value" :min="min" :max="max" @input="handleInput" @blur="handleBlur"/>
      <div class="ctrl">
        <span class="reduce" @click="handleReduce"></span>
        <span class="add" @click="handleAdd"></span>
      </div>
    </div>
    <div v-if="unit" class="unit">{{ unit }}</div>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: { // 最小值
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0;
      },
    },
    max: { // 最大值
      type: Number,
      validator(val) {
        return val >= 0;
      },
    },
    unit: String, // 单位
  },
  methods: {
    handleReduce() {
      if (this.isNumberType(this.min) && this.value <= this.min) {
        return;
      }
      this.handleChange(this.value - 1);
    },
    handleAdd() {
      if (this.isNumberType(this.max) && this.value >= this.max) {
        return;
      }
      this.handleChange(this.value + 1);
    },
    handleChange(val) {
      this.$emit('input', Number(val));
    },
    handleInput({ target }) {
      target.value = target.value.replace(/[^\d]/g, '');
      // 输入过程中不校验最小值
      if (this.isNumberType(this.max)) {
        target.value = Math.min(target.value, this.max);
      }
      this.handleChange(target.value);
    },
    handleBlur({ target }) {
      if (target.value === '') {
        target.value = this.min || 0;
        return;
      }
      this.checkNumber(target);
    },
    checkNumber(target) {
      if (this.isNumberType(this.min)) {
        target.value = Math.max(target.value, this.min);
      }
      if (this.isNumberType(this.max)) {
        target.value = Math.min(target.value, this.max);
      }
      this.handleChange(target.value);
    },
    isNumberType(val) {
      return typeof val === 'number';
    },
  },
};
</script>

<style lang="less" scoped>
.c-number-input {
  display: flex;
  align-items: center;
  .input-wrap {
    display: flex;
    width: 200px;
    height: 32px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    background: #fff;
    overflow: hidden;
    .number-input {
      width: 138px;
      height: 30px;
      border: none;
      text-align: center;
      font-size: 14px;
      &:focus {
        border: none;
      }
    }
    .ctrl {
      position: relative;
      display: flex;
      &::after {
        position: absolute;
        content: ' ';
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 20px;
        background: #DCDFE6;
      }
      .reduce, .add {
        position: relative;
        width: 30px;
        height: 30px;
        cursor: pointer;
        transition: background 0.15s ease-out;
        &:active {
          background: #F5F7FA;
        }
        &::before, &::after {
          position: absolute;
          content: ' ';
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 2px;
          background: #06003B;
          border-radius: 1px;
        }
      }
      .add::after {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }
  .unit {
    margin: 0 0 0 8px;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
