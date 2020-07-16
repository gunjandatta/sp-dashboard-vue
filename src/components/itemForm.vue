<template>
  <div>
    <Button :iconType="iconType" :type="btnType" :onClick="goBack" />
    <Progress
      v-if="formUrl == null"
      :min="0"
      :max="100"
      :size="100"
      :is-animated="true"
      :is-striped="true"
    />
    <iframe ref="form" v-if="formUrl != null" :src="formUrl" width="500px" height="800px"></iframe>
  </div>
</template>

<script>
import { Components, IconTypes } from "gd-sprest-bs";
import { Button, Progress } from "gd-sprest-bs-vue";
import { Views } from "../router";
export default {
  components: { Button, Progress },
  data() {
    return {
      iconType: IconTypes.ArrowBarLeft,
      btnType: Components.ButtonTypes.Secondary
    };
  },
  computed: {
    formUrl() {
      // See if are loading an existing item
      if (this.$route.params.id > 0) {
        return this.$store.state.editFormUrl
          ? this.$store.state.editFormUrl + "?ID=" + this.$route.params.id
          : null;
      }
      // Else, this is a new item
      else {
        return this.$store.state.newFormUrl
          ? this.$store.state.newFormUrl
          : null;
      }
    }
  },
  methods: {
    goBack() {
      Views.Home();
    }
  },
  mounted() {
    // See if the form urls are loaded
    if (this.formUrl == null) {
      // Load the form urls
      this.$store.dispatch("loadFormUrls");
    } else {
      // Set a unload event to redirect back to the dashboard
      this.$refs.form.addEventListener("load", () => {
        // See if the url has changed
        if (
          !this.$refs.form.contentWindow.document.location.href.endsWith(
            this.formUrl
          )
        ) {
          // Go back home
          Views.Home();
        }
      });
    }
  }
};
</script>