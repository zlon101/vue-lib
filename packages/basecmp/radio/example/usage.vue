<template>
  <div>
    <div>
      <p>默认布局</p>
      <Radio :select="select" :data="opts" @change="eVal => (select = eVal)" />
    </div>
    <div style="margin-top:16px">
      <p>垂直布局</p>
      <Radio direction="V" :select="select" :data="opts" @change="eVal => (select = eVal)" />
    </div>
  </div>
</template>

<script>
import Radio from '../src/radio';

export default {
  components: {
    Radio,
  },
  data() {
    return {
      select: '',
      opts: [
        {
          label: '选项A',
          value: 'A',
        },
        {
          label: '选项B',
          value: 'B',
        },
      ],
    };
  },
};
</script>
