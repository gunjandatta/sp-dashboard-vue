import * as $ from "jquery";
import { Components, IconTypes, Types } from "gd-sprest-bs";
import { Progress, Table } from "gd-sprest-bs-vue";
import DataSource from "../ds";
import { Views } from "../router";
import store from "../store";

export default {
    components: { Progress, Table },
    props: {
        filterText: { type: String },
        searchText: { type: String }
    },
    watch: {
        // Filter the items
        filterText() { this.filterItems(); },

        // Search the table
        searchText() { store.datatable.search(this.$props.searchText).draw(); }
    },
    methods: {
        // Filters the items and sets the table rows
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

            // Update the table rows
            this.rows = items;
        },

        // Applies the datatables.net plugin
        onRenderTable(table: Components.ITable) {
            // Save a reference to the table
            this.table = table;

            // Render the datatable if items exist
            if (this.rows.length > 0) {
                // You must initialize the datatable in a different thread
                setTimeout.apply(null, [() => {
                    // Render the datatable
                    store.datatable = $(table.el).DataTable({
                        dom: '<"row justify-content-between"<"col-sm-12"tr>"<"col"l><"col"f><"col"p>>'
                    });

                    // See if a search result exist
                    if (store.searchText) {
                        // Search the table
                        store.datatable.search(store.searchText).draw();
                    }

                    // Show the table
                    table.el.classList.remove("d-none");
                }, 100]);
            }
        }
    },
    data() {
        return {
            items: null,
            rows: null,
            table: null,
            columns: [
                {
                    name: "",
                    title: "",
                    onRenderCell: (el, column, item: Types.SP.ListItem) => {
                        // Render a button
                        Components.Button({
                            el,
                            iconType: IconTypes.PencilSquare,
                            type: Components.ButtonTypes.Secondary,
                            onClick: () => {
                                Views.Item(item.Id);
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

            // Filter the items
            this.filterItems();
        }
    }
}