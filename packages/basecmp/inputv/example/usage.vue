<template>
  <div>
    <h3>默认</h3>
    <ZInput v-model="val" placeholder="请输入" errMsg="错误信息" />

    <h3 style="margin-top: 32px">textarea</h3>
    <ZInput v-model="val2" width="360px" textarea maxlength="48" desc="字段描述" placeholder="请输入" errMsg="错误信息" />

    <h3 style="margin-top: 32px">复制+fakerValue</h3>
    <ZInput v-model="val3" :cleanBlank="false" copy width="360px" fakerValue="********" desc="字段描述" />
    <ZInput v-model="val3" copy textarea width="360px" />

    <h3 style="margin-top: 32px">搜索</h3>
    <ZInput v-model="val" search width="360px" maxlength="48" />

    <h3 style="margin-top: 32px">取值范围: [-5, 5]</h3>
    <ZInput v-model="val4" :min="-5" :max="5" indent type="number" width="360px" />

    <h3 style="margin-top: 32px">纯数字</h3>
    <ZInput v-model="val5" purenumber maxlength="6" width="360px" />

    <h3 style="margin-top: 32px">右侧插槽</h3>
    <ZInput v-model="val5" width="360px" inputSty="padding-right:60px">
      <template v-slot:morebtn><button>按钮</button></template>
    </ZInput>
    <!--<input type="number"/>-->
  </div>
</template>

<script>
import ZInput from '../src/input.vue';

export default {
  components: { ZInput },
  data() {
    return {
      val: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
    };
  },
};
</script>
