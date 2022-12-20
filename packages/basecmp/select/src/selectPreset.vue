<template>
  <div class="sdp-select-preset">
    <p class="sdp-select-title">常用{{ title }}</p>
    <p :class="['sdp-select-preset-item', 'sdp-select-tag', selectedList.map(({ value }) => value).includes(item.value) && 'active']"
      v-for="(item, index) in preset" :key="index"
      @click="$emit('changeSelectedList', item)">
      {{ item.label }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    preset: Array,
    selectedList: Array,
  },
};
</script>
