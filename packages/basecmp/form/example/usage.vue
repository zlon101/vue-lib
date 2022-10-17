<template>
  <FormContain :child="CusForm">
    <CusForm />
  </FormContain>
</template>

<script>
import FormContain from '../src/form.vue';
import CusForm from './cus-form.vue';

export default {
  components: { FormContain, CusForm },
  data() {
    return {
      CusForm,
    };
  },
};
</script>
