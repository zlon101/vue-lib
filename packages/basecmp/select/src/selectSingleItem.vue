<template>
  <div @click="$emit('changeSelectedList', item)"
    :class="['select-single-item', selectedList.map(({ value }) => value).includes(item.value) && 'active']"
    :style="{ color: item.color }">
    <i v-if="item.icon" :class="[item.icon, 'select-item-icon']"></i>
    {{ item.label }}
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    selectedList: Array,
  },
};
</script>
<style lang="less" scoped>
.select-single-item {
  .select-item-icon {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
</style>
