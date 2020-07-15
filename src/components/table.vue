<template>
  <div>
    <Progress
      v-if="rows == null"
      :min="0"
      :max="100"
      :size="100"
      :is-animated="true"
      :is-striped="true"
    />
    <Table
      v-if="rows != null"
      class-name="d-none"
      :assign-to="onRenderTable"
      :columns="columns"
      :rows="rows"
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