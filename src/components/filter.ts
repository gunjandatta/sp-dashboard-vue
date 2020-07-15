import Vue from "vue";
import { Components } from "gd-sprest-bs";
import { CheckboxGroup, Navbar } from "gd-sprest-bs-vue";

export default Vue.extend({
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
            // Update the filter property
            this.$emit("update:filterText", item ? item.label : "");
        }
    }
});