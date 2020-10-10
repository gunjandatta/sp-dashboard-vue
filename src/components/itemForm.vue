<template>
  <div>
    <Progress
      v-if="formInfo == null"
      :min="0"
      :max="100"
      :size="100"
      :isAnimated="true"
      :isStriped="true"
    />
    <div v-if="formInfo != null" class="card">
      <div class="card-title"></div>
      <div class="card-body">
        <Alert
          v-if="errorMessage != null"
          :type="alertType"
          :header="errorMessage"
        />
        <ListDisplayForm v-if="readOnly" :info="formInfo" rowClassName="mb-3" />
        <ListEditForm
          v-if="!readOnly"
          :info="formInfo"
          :assignTo="setForm"
          rowClassName="mb-3"
        />
      </div>
      <div
        class="btn-group justify-content-between"
        role="group"
        aria-label="Form Buttons"
      >
        <Button
          :type="btnTypeCancel"
          :text="btnTextCancel"
          :onClick="btnClickCancel"
        />
        <Button
          v-if="readOnly"
          :type="btnTypeEdit"
          text="Edit"
          :onClick="btnClickEdit"
        />
        <Button
          v-if="!readOnly"
          :type="btnTypeSave"
          :text="btnTextSave"
          :onClick="btnClickSave"
        />
      </div>
    </div>
  </div>
</template>

<script src="./itemForm.ts"></script>