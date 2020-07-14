import * as $ from "jquery";
import { Components, Helper, IconTypes, SPTypes, Types } from "gd-sprest-bs";
import { Table } from "gd-sprest-bs-vue";
import DataSource from "../ds";
import { Views } from "../router";
import store from "../store";

export default {
    components: { Table },
    props: {
        filterText: { type: String },
        searchText: { type: String }
    },
    watch: {
        filterText() { this.filterItems(); },
        searchText() {
            // Search the table
            this.datatable.search(this.$props.searchText).draw();
        }
    },
    methods: {
        filterItems() {
            let items = [];

            // See if a filter exists
            if (this.$props.filterText) {
                // Parse the items
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i];

                    if (item.Status == this.$props.filterText) {
                        // Add the item
                        items.push(item);
                    }
                }
            } else {
                items = this.items;
            }

            // Update the rows
            this.rows = items;
        },
    },
    data() {
        return {
            datatable: null,
            displayFormUrl: "",
            newFormUrl: "",
            items: null,
            rows: [],
            table: null,
            onRenderTable(table: Components.ITable) {
                // Save a reference to the table
                this.table = table;

                // Render the datatable if items exist
                if (this.rows.length > 0) {
                    // You must initialize the datatable in a different thread
                    setTimeout(() => {
                        // Render the datatable
                        this.datatable = $(table.el).DataTable({
                            dom: '<"row justify-content-between"<"col-sm-12"tr>"<"col"l><"col"f><"col"p>>'
                        });
                    }, 1000)
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
                                Views.Item();
                                return;
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
        // See if items exist
        if (store.items == null) {
            // Get the data
            DataSource.getItems().then(
                // Success
                items => {
                    // Set the rows
                    this.items = items;
                    this.rows = items;

                    // Update the store
                    store.items = items;
                }

                // Error
                // TODO
            )
        } else {
            // Restore the data
            this.items = store.items;
            this.filterItems();
        }
    }
}