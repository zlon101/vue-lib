<template>
  <div class="c-btn-example">
    <div class="code-item">
      <picbtn size="small">普通的小按钮</picbtn>
      <picbtn color="green">普通中按钮</picbtn>
      <picbtn size="large" color="red">普通的大按钮</picbtn>
    </div>

    <div class="code-item">
      <picbtn size="small" :round="false">方的小按钮</picbtn>
      <picbtn :round="false" color="green" plain>方的朴素中按钮</picbtn>
      <picbtn size="large" :round="false" color="red">方的大按钮</picbtn>
    </div>

    <div class="code-item">
      <picbtn size="small">
        <span>有Icon的小按钮</span>
        <template v-slot:icon>
          <IconCross />
        </template>
      </picbtn>
      <picbtn color="green" :loading="true" loadingClass="icon_refresh_blue">有Icon的中按钮</picbtn>
      <picbtn size="large" color="red">
        <span>有Icon的大按钮</span>
        <IconSuccess slot="icon" />
      </picbtn>
    </div>

    <div class="code-item">
      <picbtn size="small" plain>朴素按钮</picbtn>
      <picbtn disable color="green">被禁止</picbtn>
      <picbtn size="large" :active="false" color="red">hover和active样式被禁用</picbtn>
    </div>
  </div>
</template>

<script>
import picbtn from '../src/button.vue';
import { IconCross, IconSuccess } from '@zl/icon';

export default {
  components: {
    picbtn,
    IconCross,
    IconSuccess,
  },
};
</script>
