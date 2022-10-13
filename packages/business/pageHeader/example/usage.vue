<template>
  <div class="page-header-example">
    <PageHeader title="我是标题" desc="我是描述" />
    <PageHeader title="我是标题" desc="我是描述">
      <button>右侧插槽</button>
    </PageHeader>
  </div>
</template>

<script>
import PageHeader from '../src/pageHeader';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="less">
.page-header-example {
  > * {
    outline: 1px solid green;
  }
}
</style>
