<template>
  <div class="cus-form-test">
    <h2>测试自定义表单</h2>
    <p>checkbox</p>
    <slot name="checkbox" v-bind="{ aa: 1212 }" />
    <p>input</p>
    <slot name="input" v-bind="{ aa: 1212 }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: '',
    };
  }
}
</script>
