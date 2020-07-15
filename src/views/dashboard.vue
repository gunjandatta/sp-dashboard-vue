<template>
  <div class="dashboard">
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
        <DataTable />
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
  components: { DataTable, Navigation, TableFilter }
}
</script>