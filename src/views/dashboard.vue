<template>
  <div class="dashboard">
    <div class="row">
      <div class="col">
        <Navigation v-bind:searchText.sync="searchText" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <TableFilter v-bind:filterText.sync="filterText" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DataTable v-bind:filterText="filterText" v-bind:searchText.sync="searchText" />
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "../components/table.vue";
import TableFilter from "../components/filter.vue";
import Navigation from "../components/navigation.vue";
import store from "../store";
export default {
  components: { DataTable, Navigation, TableFilter },
  data() {
    return {
      filterText: store.filterText,
      searchText: store.searchText
    };
  },
  watch: {
    filterText() {
      // Update the filter text
      store.filterText = this.filterText;
    },
    searchText() {
      // Update the search text
      store.searchText = this.searchText;
    }
  }
};
</script>