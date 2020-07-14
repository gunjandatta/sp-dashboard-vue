<template>
  <div>
    <Progress
      v-if="rows == null"
      v-bind:min="0"
      v-bind:max="100"
      v-bind:size="100"
      v-bind:is-animated="true"
      v-bind:is-striped="true"
    />
    <Table
      v-if="rows != null"
      class-name="d-none"
      v-bind:assign-to="onRenderTable"
      v-bind:columns="columns"
      v-bind:rows="rows"
    />
  </div>
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