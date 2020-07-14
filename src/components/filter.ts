import { Components } from "gd-sprest-bs";
import { CheckboxGroup, Navbar } from "gd-sprest-bs-vue";

export default {
    components: { CheckboxGroup, Navbar },
    props: {
        filterText: { type: String }
    },
    data() {
        return {
            checkboxType: Components.CheckboxGroupTypes.Switch,
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
            this.$emit("update:filterText", item ? item.label : "");
        }
    }
}