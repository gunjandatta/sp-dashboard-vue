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
        filterText() { this.filterItems(); },
        searchText() {
            // Search the table
            store.datatable.search(this.$props.searchText).draw();
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
            displayFormUrl: "",
            newFormUrl: "",
            items: null,
            rows: null,
            table: null,
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