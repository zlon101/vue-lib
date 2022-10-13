<template>
  <Scrollbar style="max-height:300px;overflow:auto;">
    <div style="height:500px;background:#f2d761">
      {{new Array(10000).fill('内容').join()}}
    </div>
  </Scrollbar>
</template>

<script>
import Scrollbar from '../src/main.js';

export default {
  components: {
    Scrollbar,
  },
};
</script>
