<template>
  <div class="select-multiple-item" :style="{ color: item.color }">
    <Tooltip v-if="item.desc" :content="item.desc" :showIfOverflow="false" placement="top" :maxWidth="280" baseIndex="400">
      <v-checkbox :checked="selectedList" :value="item" @change="handleClick" :disabled="item.disabled">
        <span>{{ item.label }}</span>
      </v-checkbox>
    </Tooltip>
    <v-checkbox v-else :checked="selectedList" :value="item" @change="handleClick" :disabled="item.disabled">
      <span>{{ item.label }}</span>
    </v-checkbox>
  </div>
</template>

<script>
import Tooltip from '@pic/tooltip';
import vCheckbox from '@pic/checkbox';

export default {
  components: { vCheckbox, Tooltip },
  props: {
    item: Object,
    selectedList: Array,
  },
  methods: {
    handleClick() {
      this.$emit('changeSelectedList', this.item);
    },
  },
};
</script>
