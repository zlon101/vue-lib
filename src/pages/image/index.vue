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
const imgStore = [];

const moduleMap = import.meta.glob(['../../../**/*.{svg,png}', '!**/node_modules/*'], {
  as: 'url',
  eager: true,
});
Object.keys(moduleMap).forEach(filePath => {
  if (['node_modules'].some(item => filePath.includes(item))) {
    return;
  }
  if (filePath.includes('iconfont.svg')) return;
  imgStore.push({
    path: filePath.replace('../../../', ''),
    url: moduleMap[filePath],
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
