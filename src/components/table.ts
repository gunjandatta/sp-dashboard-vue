import * as $ from "jquery";
import { Components, Helper, IconTypes, SPTypes, Types } from "gd-sprest-bs";
import { Table } from "gd-sprest-bs-vue";
import DataSource from "../ds";

export default {
    name: "DataTable",
    components: { Table },
    methods: {
        onFilter(value: string) {

        },

        onSearch(value: string) {

        }
    },
    data() {
        return {
            datatable: null,
            displayFormUrl: "",
            newFormUrl: "",
            rows: [],
            table: null,
            onRenderTable(table: Components.ITable) {
                // Save a reference to the table
                this.table = table;

                // Render the datatable if items exist
                if (this.rows.length > 0) {
                    // Render the datatable
                    //debugger;
                    //this.datatable = $(table.el).DataTable({});
                }
            },
            columns: [
                {
                    name: "",
                    title: "Title",
                    onRenderCell: (el, column, item: Types.SP.ListItem) => {
                        // Render a button
                        Components.Button({
                            el,
                            iconType: IconTypes.PencilSquare,
                            type: Components.ButtonTypes.Secondary,
                            onClick: () => {
                                // Ensure the form url exists
                                if (this.props.displayFormUrl) {
                                    // Show the display form
                                    Helper.SP.ModalDialog.showModalDialog({
                                        title: "View Item",
                                        url: this.props.formUrl + "?ID=" + item.Id,
                                        dialogReturnValueCallback: result => {
                                            // See if the item was updated
                                            if (result == SPTypes.ModalDialogResult.OK) {
                                                // Refresh the page
                                                document.location.reload();
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                },
                {
                    name: "ItemType",
                    title: "Item Type"
                },
                {
                    name: "Status",
                    title: "Status"
                }
            ]
        }
    },
    mounted() {
        // Get the form data
        DataSource.getFormUrls().then(formUrls => {
            // Save the urls
            this.displayFormUrl = formUrls.displayFormUrl;
            this.newFormUrl = formUrls.newFormUrl
        });

        // Get the data
        DataSource.getItems().then(
            // Success
            items => {
                // Set the rows
                this.rows = items;
            }

            // Error
            // TODO
        )
    }
}