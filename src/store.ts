import Vue from "vue";
import Vuex from "vuex";
import { ContextInfo } from "gd-sprest-bs";

// Use Vuex
Vue.use(Vuex);

/**
 * Item
 */
interface IItem {
    Id: number;
    ItemType: string;
    Status: string;
    Title: string;
}

/**
 * Store
 */
export default new Vuex.Store({
    // Application State
    state: {
        datatable: null,
        filterText: "",
        items: null,
        rows: null,
        searchText: ""
    },

    // Synchronous Methods
    mutations: {
        setDatatable(state, dt) {
            // Update the datatable
            state.datatable = dt;
        },

        setItems(state, items) {
            // Update the items
            state.items = items;
        },

        setFilter(state, value) {
            // Update the filter text
            state.filterText = value;
        },

        setSearch(state, value) {
            // Update the search text
            state.searchText = value;
        }
    },

    // Asynchronous Methods
    actions: {
        loadItems(state) {
            // See if the SP environment exists
            if (ContextInfo.existsFl) {
                // TODO
            } else {
                // Set test data
                state.commit("setItems", [
                    { Id: 1, ItemType: "Type 1", Title: "Item 1", Status: "Draft" },
                    { Id: 2, ItemType: "Type 1", Title: "Item 2", Status: "Submitted" },
                    { Id: 3, ItemType: "Type 2", Title: "Item 3", Status: "Approved" },
                    { Id: 4, ItemType: "Type 2", Title: "Item 4", Status: "Rejected" },
                    { Id: 5, ItemType: "Type 3", Title: "Item 5", Status: "Draft" }
                ]);
            }
        }
    },

    // Getters
    getters: {
        getRows(state): Array<IItem> {
            let items = [];

            // See if a filter exists
            if (state.filterText) {
                // Parse the items
                for (let i = 0; i < state.items.length; i++) {
                    let item = state.items[i];

                    if (item.Status == state.filterText) {
                        // Add the item
                        items.push(item);
                    }
                }
            } else {
                items = state.items;
            }

            // Return the table rows
            return items;
        }
    }
});