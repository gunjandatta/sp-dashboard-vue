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
            alertProps: {
                header: this.errorMessage,
                type: Components.AlertTypes.Danger
            } as Components.IAlertProps,
            btnCancelProps: {
                text: this.readOnly ? "Back" : "Cancel",
                type: Components.ButtonTypes.OutlineDanger,
                onClick: () => {
                    // See if this is an existing item that is being edited
                    if (!this.readOnly && this.$route.params.id > 0) {
                        // View the item
                        Views.ViewItem(this.$route.params.id);
                    } else {
                        // Go back to the main dashboard
                        Views.Home();
                    }
                }
            } as Components.IButtonProps,
            btnEditProps: {
                text: "Edit",
                type: Components.ButtonTypes.OutlinePrimary,
                onClick: () => {
                    // Edit the item
                    Views.EditItem(this.$route.params.id);
                }
            } as Components.IButtonProps,
            btnSaveProps: {
                text: this.formInfo && this.formInfo.item ? "Update" : "Save",
                type: Components.ButtonTypes.OutlineSuccess,
                onClick: () => {
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
                }
            } as Components.IButtonProps,
            displayFormProps: {
                info: this.formInfo,
                rowClassName: "mb-3"
            } as Components.IListFormDisplayProps,
            editFormProps: {
                assignTo: form => { this.form = form; },
                info: this.formInfo,
                rowClassName: "mb-3"
            } as Components.IListFormEditProps,
            progressProps: {
                min: 0,
                max: 100,
                size: 100,
                isAnimated: true,
                isStriped: true
            } as Components.IProgressProps,
            errorMessage: null,
            form: null,
            formInfo: null
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