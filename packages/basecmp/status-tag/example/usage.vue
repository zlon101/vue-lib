<template>
  <div>
    <StatusTag icon="iconfont icon-err" type="error">失败</StatusTag>
    <StatusTag icon="iconfont icon-expoint" type="warning">警告</StatusTag>
    <StatusTag icon="iconfont icon-success" type="success">成功</StatusTag>
  </div>
</template>

<script>
import StatusTag from '../src/statusTag';

export default {
  components: {
    StatusTag,
  },
};
</script>
