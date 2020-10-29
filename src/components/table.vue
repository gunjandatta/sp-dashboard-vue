<template>
  <div>
    <Progress v-if="rows == null" v-bind="progressProps" />
    <Table v-if="rows != null" v-bind="tableProps" />
  </div>
</template>

<script src="./table.ts"></script>

<style>
/** Hide the datatable search box */
.dataTables_filter {
  display: none;
}

/** Push the pagination to the right */
.dataTables_wrapper .pagination {
  justify-content: flex-end;
}
</style>