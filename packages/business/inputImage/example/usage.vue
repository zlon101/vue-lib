<template>
  <div>
    <InputImage v-model="base64" desc="为空时的提示语" width="100px" height="100px" errMsg="报错信息" />
    <InputImage v-model="base64" width="100px" height="100px">
      <template v-slot:empty><button>自定义为空时的内容</button></template>
    </InputImage>
    <InputImage v-model="base64" width="100px" height="100px">
      <div style="outline:1px solid red;width:200px; height:200px;">
        自定义容器
      </div>
    </InputImage>
    <InputImage disabled desc="禁用" width="100px" height="100px" />
  </div>
</template>

<script>
import InputImage from '../src/inputImage';

export default {
  components: {
    InputImage,
  },
  data() {
    return {
      base64: '',
    };
  },
};
</script>
