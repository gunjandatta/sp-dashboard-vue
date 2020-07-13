<template>
  <div class="bs">
    <div class="row">
      <div class="col">
        <Navigation />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <TableFilter />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DataTable v-bind:onFilter="onFilter" v-bind:onSearch="onSearch" />
      </div>
    </div>
  </div>
</template>

<script>
import TableFilter from "./components/filter.vue";
import Navigation from "./components/navigation.vue";
import DataTable from "./components/table.vue";
export default {
  components: { DataTable, TableFilter, Navigation },
  methods: {
    onFilter(value) {
      // Filter the table
    },
    onSearch(value) {
      // Search the table
    }
  }
};
</script>