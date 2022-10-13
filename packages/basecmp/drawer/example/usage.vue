<script>
import Drawer from '../src/drawer';

export default {
  components: { Drawer },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
    };
  },
};
</script>

<template>
  <div>
    <button @click="show1 = !show1">显示/隐藏(默认模式)</button>
    <Drawer title="标题" :visible.sync="show1">
      <div>自定义body</div>
      <template v-slot:footer><footer>自定义footer</footer></template>
    </Drawer>
    <button @click="show2 = !show2">mode="tb"</button>
    <Drawer title="标题" :visible.sync="show2" mode="tb">
      <div>自定义body</div>
      <template v-slot:footer><footer>自定义footer</footer></template>
    </Drawer>
    <button @click="show3 = !show3">mode="bt"</button>
    <Drawer title="标题" :visible.sync="show3" mode="bt">
      <div>自定义body</div>
      <template v-slot:footer><footer>自定义footer</footer></template>
    </Drawer>
    <button @click="show4 = !show4">mode="lr"</button>
    <Drawer title="标题" :visible.sync="show4" mode="lr">
      <div>自定义body</div>
      <template v-slot:footer><footer>自定义footer</footer></template>
    </Drawer>
  </div>
</template>
