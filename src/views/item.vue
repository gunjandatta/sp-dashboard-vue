<template>
  <button @click="goBack">Back</button>
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