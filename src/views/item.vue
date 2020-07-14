<template>
  <div>
    <button @click="goBack">Back</button>
    <h1>Item {{ this.$route.params.id }}</h1>
  </div>
</template>

<script>
import { Views } from "../router";
export default {
  methods: {
    goBack() {
      Views.Home();
    }
  }
};
</script>