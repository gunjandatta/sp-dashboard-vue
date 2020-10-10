<template>
  <div>
    <ItemForm :readOnly="true" />
  </div>
</template>

<script>
import ItemForm from "../components/itemForm.vue";
export default {
  components: { ItemForm },
};
</script>