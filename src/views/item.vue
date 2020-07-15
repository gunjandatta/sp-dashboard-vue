<template>
  <div>
    <Button v-bind:iconType="iconType" v-bind:type="btnType" v-bind:onClick="goBack" />
    <h1>Item {{ this.$route.params.id }}</h1>
  </div>
</template>

<script>
import { Components, IconTypes } from "gd-sprest-bs";
import { Button } from "gd-sprest-bs-vue";
import { Views } from "../router";
export default {
  components: { Button },
  data() {
    return {
      iconType: IconTypes.ArrowBarLeft,
      btnType: Components.ButtonTypes.Secondary
    }
  },
  methods: {
    goBack() {
      Views.Home();
    }
  }
};
</script>