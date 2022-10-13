<template>
  <div class="c-tag-group">
    <div v-if="!tags.length" class="edit underlint" @click="$emit('edit')">{{ initTips }}</div>
    <template v-else>
      <div v-if="title" class="title">{{ title }}：</div>
      <!-- <div class="tag-list"> -->
      <div v-for="(tag, index) in tags" :key="index" class="tag">
        <i v-if="tag.icon" :class="[tag.icon, 'icon']"></i>
        <span>{{ tag.label }}</span>
        <i class="icon_delete iconfont icon-cross" @click="$emit('delete', tag.id)"></i>
      </div>
      <div class="edit" @click="$emit('edit')">
        <!-- <Icon :name="tags.length ? 'edit' : 'plus'" size="14" class="icon"></Icon> -->
        {{ tags.length ? '修改' : initTips }}
      </div>
      <!-- </div> -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'TagGroup',
  props: {
    title: String,
    tags: Array, // { id, label, icon }
    initTips: {
      type: String,
      default: '添加',
    },
  },
};
</script>

<style lang="less" scoped>
.c-tag-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  .edit {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 22px;
    color: #3a51e0;
    cursor: pointer;
    &.underlint {
      text-decoration: underline;
    }
  }
  .title {
    white-space: nowrap;
    margin: 0 8px 8px 0;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    margin: 0 8px 8px 0;
    padding: 0 12px;
    border: 1px solid #eceef5;
    background: #f5f7fa;
    border-radius: 100px;
    .icon {
      width: 18px;
      height: 18px;
      margin: 0 8px 0 0;
    }
    span {
      font-size: 12px;
      margin: 0 8px 0 0;
    }
    .icon_delete {
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
  }
}
</style>
