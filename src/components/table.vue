<template>
  <Table v-bind:assign-to="onRenderTable" v-bind:columns="columns" v-bind:rows="rows" />
</template>

<script src="./table.ts"></script>

<style>
/** Hide the datatable search box */
.dataTables_filter {
  display: none;
}

/** Push the pagination to the right */
.dataTables_wrapper .row > .col:last-child {
    direction: rtl;
}
.dataTables_wrapper .pagination {
    padding-right: 0;
}
</style>