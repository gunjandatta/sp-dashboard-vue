<template>
  <div class="bs">
    <div class="row">
      <div class="col">
        <Navigation />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/navigation.vue";
export default {
  components: { Navigation }
};
</script>