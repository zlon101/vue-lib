<template>
  <div class="form-item-example">
    <FormItem title="姓名" desc="字段描述" must copy>
      <div slot="icon" class="iconfont icon-cross" style="color:red"></div>
      <input />
    </FormItem>
    <FormItem title="用户名" error="错误信息错误信息" tips="提示信息提示信息提示信息" num="2">
      <input />
    </FormItem>
  </div>
</template>

<script>
import FormItem from '../src/formItem';

export default {
  components: {
    FormItem,
  },
};
</script>

