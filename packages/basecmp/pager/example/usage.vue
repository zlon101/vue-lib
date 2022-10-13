<template>
  <Pager v-model="param.curPage" :changeRouter="false" :total="param.total" :pageSize.sync="param.pageSize" />
</template>

<script>
import Pager from '../src/pager';

export default {
  components: {
    Pager,
  },
  data() {
    return {
      param: {
        curPage: 1,
        total: 20,
        pageSize: 10,
      },
    };
  },
};
</script>
