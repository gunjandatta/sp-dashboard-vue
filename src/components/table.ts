import * as $ from "jquery";
import Vue from "vue";
import { Components, IconTypes, Types } from "gd-sprest-bs";
import { Progress, Table } from "gd-sprest-bs-vue";
import { Views } from "../router";

export default Vue.extend({
    components: { Progress, Table },
    computed: {
        items() { return this.$store.state.items; },
        rows() { return this.$store.getters.getRows; },
        searchText() { return this.$store.state.searchText; }
    },
    watch: {
        // Search the table
        searchText() { this.datatable.search(this.$store.state.searchText).draw(); }
    },
    methods: {
        // Applies the datatables.net plugin
        onRenderTable(table: Components.ITable) {
            // Save a reference to the table
            this.table = table;

            // Render the datatable if items exist
            if (this.rows.length > 0) {
                // You must initialize the datatable in a different thread
                setTimeout.apply(null, [() => {
                    // Render the datatable
                    this.datatable = $(table.el).DataTable({
                        dom: '<"row justify-content-between"<"col-sm-12"tr>"<"col"l><"col"f><"col"p>>'
                    });

                    // See if a search result exist
                    if (this.$store.state.searchText) {
                        // Search the table
                        this.datatable.search(this.$store.state.searchText).draw();
                    }

                    // Show the table
                    table.el.classList.remove("d-none");
                }, 100]);
            }
        }
    },
    data() {
        return {
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
                                // View the item
                                Views.ViewItem(item.Id);
                            }
                        });
                    }
                },
                {
                    name: "Title",
                    title: "Title"
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
        // Get the items
        this.$store.dispatch("loadItems");
    }
});