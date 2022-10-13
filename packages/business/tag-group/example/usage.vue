<template>
  <TagGroup title="接收对象" :tags="tags" initTips="选择接收对象" @edit="onEdit" @delete="onDel" />
</template>

<script>
import TagGroup from '../src/tagGroup';

export default {
  components: {
    TagGroup,
  },
  data() {
    return {
      curTab: 'aa',
      tags: [
        {
          label: '标签A',
          id: 'aa',
        },
        {
          label: '标签B',
          id: 'bb',
          icon: 'iconfont icon-success',
        },
      ],
    };
  },
  methods: {
    onEdit() {
      alert('edit');
    },
    onDel(id) {
      alert(id);
    },
  }
};
</script>
