<template>
  <div class="card">
    <div class="card-body">
      <CheckboxGroup
        :isInline="true"
        :items="items"
        :type="checkboxType"
        :onChange="onChange"
        :value="filterText"
      />
    </div>
  </div>
</template>

<script src="./filter.ts"></script>