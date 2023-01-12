<template>
  <div class="c-breadcrumb">
    <div v-if="levelList.length > 2" class="back g-flex-center" @click="back">
      <IconFold s="12px" :stroke="{ 0: '#fff' }" />
    </div>
    <div
      v-for="(level, index) in levelList"
      :key="level.path"
      class="breadcrumb-item"
      :class="{ last: index === levelList.length - 1 }"
    >
      <router-link :to="`${level.path}/${queryStr}`">{{ level.title }}</router-link>
      <span v-if="index !== levelList.length - 1" class="space">/</span>
    </div>
  </div>
</template>

<script>
import { IconFold } from '@zl/icon';

export default {
  name: 'Breadcrumb',
  components: { IconFold },
  data() {
    return {
      levelList: [],
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  computed: {
    queryStr() {
      const query = this.$route.query || {};
      const keys = Object.keys(query);
      if (keys.length === 0) {
        return '';
      }
      const str = keys.reduce((acc, k) => `${acc}&${k}=${query[k]}`, '');
      return `?${str}`;
    },
  },
  methods: {
    getBreadcrumb() {
      // console.time('getBreadcrumb');
      const res = [];
      const nowRoute = this.$route;
      // console.log('nowRoute  ', nowRoute);
      const _title = nowRoute.meta.title;
      res.unshift({
        title: _title ? _title.replace('<bs>', nowRoute.query.bs) : '',
        path: nowRoute.meta.fullpath || '/',
      });
      let sup = nowRoute.meta.sup;
      while (sup) {
        if (!sup.title) {
          break;
        }
        res.unshift({
          title: sup.title,
          path: sup.fullpath,
        });
        sup = sup.sup;
      }

      /* 删除只有一个子菜单时重复的项
      if (res[0].title === res[1].title) {
        res.splice(0, 1);
      } */
      this.levelList = res;
      // console.timeEnd('getBreadcrumb');
    },
    back() {
      this.$router.go(-1); // 直接后退
    },
  },
};
</script>

<style lang="less" scoped>
.c-breadcrumb {
  display: flex;
  align-items: center;
  .back {
    width: 20px;
    height: 20px;
    margin: 0 20px 0 0;
    cursor: pointer;
    border-radius: 50%;
    background: #06003b;
    > svg {
      transform: rotate(90deg);
    }
  }
  .breadcrumb-item {
    a {
      color: #7f8fa4;
    }
    &.last a {
      color: #06003b;
    }
    .space {
      margin: 0 4px;
    }
  }
}
</style>
