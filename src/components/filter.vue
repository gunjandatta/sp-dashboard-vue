<template>
  <div class="card">
    <div class="card-body">
      <CheckboxGroup v-bind:isInline="true" v-bind:items="items" v-bind:type="checkboxType" />
    </div>
  </div>
</template>

<script src="./filter.ts"></script>