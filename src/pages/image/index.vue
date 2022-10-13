<template>
  <div class="p-images">
    <h1>所有 svg 和 png</h1>
    <div v-for="img in imgList" :key="img.path" class="img-item">
      <p>{{ img.path }}</p>
      <img :src="img.url" />
    </div>
  </div>
</template>

<script>
const IgnoreDirs = ['node_modules'];
const imgStore = [];

const req = require.context('../../../packages', true, /\.(svg)|(png)$/);
req.keys().forEach(filePath => {
  if (IgnoreDirs.some(item => filePath.includes(item))) {
    return;
  }
  // filePath: ./basecmp/icon/assets/icon-err.svg
  if (filePath.includes('iconfont.svg')) return;
  imgStore.push({
    path: filePath,
    url: req(filePath),
  });
});

export default {
  data() {
    return {
      imgList: imgStore,
    };
  },
};
</script>

<style lang="less">
.p-images {
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }
  img {
    width: 40px;
    height: 40px;
  }
  .img-item {
    display: inline-block;
    margin: 8px;
    width: 200px;
    outline: 1px solid gray;
    > p {
      margin-bottom: 8px;
      word-break: break-all;
    }
  }
}
</style>
