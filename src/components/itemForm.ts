import { Components, Helper } from "gd-sprest-bs";
import { Alert, Button, ListDisplayForm, ListEditForm, Progress } from "gd-sprest-bs-vue";
import { Views } from "../router";
import Strings from "../strings";
export default {
    components: { Alert, Button, ListDisplayForm, ListEditForm, Progress },
    props: {
        readOnly: Boolean
    },
    data() {
        return {
            alertType: Components.AlertTypes.Danger,
            btnTextCancel: this.readOnly ? "Back" : "Cancel",
            btnTextSave: this.formInfo && this.formInfo.item ? "Update" : "Save",
            btnTypeCancel: Components.ButtonTypes.OutlineDanger,
            btnTypeEdit: Components.ButtonTypes.OutlinePrimary,
            btnTypeSave: Components.ButtonTypes.OutlineSuccess,
            errorMessage: null,
            form: null,
            formInfo: null
        }
    },
    methods: {
        btnClickCancel() {
            // See if this is an existing item that is being edited
            if (!this.readOnly && this.$route.params.id > 0) {
                // View the item
                Views.ViewItem(this.$route.params.id);
            } else {
                // Go back to the main dashboard
                Views.Home();
            }
        },
        btnClickEdit() {
            // Edit the item
            Views.EditItem(this.$route.params.id);
        },
        btnClickSave() {
            let form = this.form as Components.IListFormEdit;

            // Ensure the form is valid
            if (form.isValid()) {
                // Display a loading message
                Helper.SP.ModalDialog.showWaitScreenWithNoClose("Saving the Item").then(dlg => {
                    // Save the item
                    form.save().then(
                        // Success
                        item => {
                            // Close the dialog
                            dlg.close();

                            // View the item
                            Views.ViewItem(item.Id);
                        },
                        // Error
                        () => {
                            // Set the error message
                            this.errorMessage = "Error saving the item. Refresh the page and try again.";

                            // Close the dialog
                            dlg.close();
                        }
                    );
                });
            } else {
                // Set the error message
                this.errorMessage = "The form is not valid. Please review the entries.";
            }
        },
        setForm(form) {
            // Save a reference to the form
            this.form = form;
        }
    },
    mounted() {
        // See if the form information hasn't been loaded
        if (this.formInfo == null) {
            // Load the form information
            Helper.ListForm.create({
                listName: Strings.Lists.Main,
                itemId: this.$route.params.id
            }).then(info => {
                // Update the form information
                this.formInfo = info;
            });
        }
    }
}