import Vue from "vue";
import Vuex from "vuex";
import { ContextInfo, List, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

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
        displayFormUrl: null,
        editFormUrl: null,
        newFormUrl: null,
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
        },

        setUrls(state, value) {
            // Update the urls
            state.displayFormUrl = value.displayFormUrl;
            state.editFormUrl = value.editFormUrl;
            state.newFormUrl = value.newFormUrl;
        }
    },

    // Asynchronous Methods
    actions: {
        loadFormUrls(store) {
            let formUrls = { displayFormUrl: "", editFormUrl: "", newFormUrl: "" };

            // See if the SP environment exists
            if (ContextInfo.existsFl) {
                // Load the forms
                List(Strings.Lists.Main).Forms().execute(forms => {
                    // Parse the forms
                    for (let i = 0; i < forms.results.length; i++) {
                        let form = forms.results[i];

                        // Save the url, based on the type
                        switch (form.FormType) {
                            // Display
                            case SPTypes.PageType.DisplayForm:
                                formUrls.displayFormUrl = form.ServerRelativeUrl;
                                break;

                            // Edit
                            case SPTypes.PageType.EditForm:
                                formUrls.editFormUrl = form.ServerRelativeUrl;
                                break;

                            // New
                            case SPTypes.PageType.NewForm:
                                formUrls.newFormUrl = form.ServerRelativeUrl;
                                break;
                        }
                    }

                    // Default the form urls
                    store.commit("setUrls", formUrls);
                });
            } else {
                // Default the form urls
                store.commit("setUrls", formUrls);
            }
        },

        loadItems(store) {
            // See if the SP environment exists
            if (ContextInfo.existsFl) {
                // Load the list items
                List(Strings.Lists.Main).Items().query({
                    OrderBy: ["Title", "Status"]
                }).execute(
                    // Success
                    items => {
                        // Update the state
                        store.commit("setItems", items.results);
                    }

                    // Error
                    // TODO
                );
            } else {
                // Set test data
                store.commit("setItems", [
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