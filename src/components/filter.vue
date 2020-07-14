<template>
  <div class="card">
    <div class="card-body">
      <CheckboxGroup v-bind:isInline="true" v-bind:items="items" v-bind:type="checkboxType" v-bind:onChange="onChange" v-bind:value="filterText" />
    </div>
  </div>
</template>

<script src="./filter.ts"></script>