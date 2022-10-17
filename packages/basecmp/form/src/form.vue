<template>
  <div class="c-form-contain">
    <component :is="child">
      <template v-slot:input="slotP">
        <input type="text" />
        <pre>{{ slotP }}</pre>
      </template>
      <template v-slot:cusinput>
        <input type="text" />
      </template>
      <template v-slot:checkbox>
        <input type="checkbox" />
      </template>
    </component>
  </div>
</template>

<script>

export default {
  props: {
    child: Object, // 子组件
  },
};
</script>
