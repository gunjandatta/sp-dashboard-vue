import { Components } from "gd-sprest-bs";
import { CheckboxGroup, Navbar } from "gd-sprest-bs-vue";
import store from "../store";

export default {
    name: "Filter",
    components: { CheckboxGroup, Navbar },
    sharedState: store,
    props: {
        onFilter: { type: Function }
    },
    data() {
        return {
            checkboxType: Components.CheckboxGroupTypes.Switch,
            filter: store.filterText,
            items: [
                { label: "Draft" },
                { label: "Submitted" },
                { label: "Rejected" },
                { label: "Pending Approval" },
                { label: "Approved" },
                { label: "Archived" }
            ]
        }
    },
    methods: {
        onChange(item: Components.ICheckboxGroupItem) {
            // Update the filter in the store
            store.filterText = item ? item.label : "";
        }
    }
}