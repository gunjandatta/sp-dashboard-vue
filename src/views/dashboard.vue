<template>
  <div class="bs">
    <div class="row">
      <div class="col">
        <TableFilter v-bind:filterText.sync="filterText" v-bind:searchText.sync="searchText" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DataTable v-bind:filter-text="filterText" v-bind:search-text="searchText" />
      </div>
    </div>
  </div>
</template>

<script>
import TableFilter from "../components/filter.vue";
import DataTable from "../components/table.vue";
import store from "../store";
export default {
  components: { DataTable, TableFilter },
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