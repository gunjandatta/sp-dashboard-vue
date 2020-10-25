<template>
  <div>
    <Progress v-if="formInfo == null" v-bind="progressProps" />
    <div v-if="formInfo != null" class="card">
      <div class="card-title"></div>
      <div class="card-body">
        <Alert v-if="errorMessage != null" v-bind="alertProps" />
        <ListDisplayForm v-if="readOnly" v-bind="displayFormProps" />
        <ListEditForm v-if="!readOnly" v-bind="editFormProps" />
      </div>
      <div
        class="btn-group justify-content-between"
        role="group"
        aria-label="Form Buttons"
      >
        <Button v-bind="btnCancelProps" />
        <Button v-if="readOnly" v-bind="btnEditProps" />
        <Button v-if="!readOnly" v-bind="btnSaveProps" />
      </div>
    </div>
  </div>
</template>

<script src="./itemForm.ts"></script>