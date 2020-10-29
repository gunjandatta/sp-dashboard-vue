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
        searchText() { return this.$store.state.searchText; },
        tableProps() {
            return {
                assignTo: table => {
                    // Save a reference to the table
                    this.table = table;

                    // Render the datatable if items exist
                    if (this.rows.length > 0) {
                        // You must initialize the datatable in a different thread
                        setTimeout.apply(null, [() => {
                            // Render the datatable
                            this.datatable = $(table.el).DataTable({
                                dom: 'rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>'
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
                },
                className: "d-none",
                rows: this.$store.getters.getRows,
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
            } as Components.ITableProps;
        }
    },
    data() {
        return {
            progressProps: {
                min: 0,
                max: 100,
                size: 100,
                isAnimated: true,
                isStriped: true
            } as Components.IProgressProps,
            table: null
        };
    },
    watch: {
        // Search the table
        searchText() { this.datatable.search(this.$store.state.searchText).draw(); }
    },
    mounted() {
        // Get the items
        this.$store.dispatch("loadItems");
    }
});