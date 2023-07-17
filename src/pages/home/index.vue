<script>
import ProjectReadme from '../../../README.md';
export default {
  components: { ProjectReadme },
};
</script>

<template>
  <div class="page-home markdown-body"><ProjectReadme /></div>
</template>

<style lang="less">
.page-home {
  pre {
    background-color: #111419;
  }
  ul,
  ol {
    list-style: decimal;
  }
}
</style>
