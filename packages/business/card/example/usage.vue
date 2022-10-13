<script>
import Card from '../src/card';

export default {
  components: { Card },
}
</script>

<template>
  <div class="c-card-exam">
    <Card title="标题" desc="描述描述描述">
      <span>我是内容</span>
      <template v-slot:right><span>我是right</span></template>
    </Card>
  </div>
</template>
