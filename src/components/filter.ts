import { Components } from "gd-sprest-bs";
import { CheckboxGroup, Navbar } from "gd-sprest-bs-vue";

export default {
    name: "Filter",
    components: { CheckboxGroup, Navbar },
    props: {
        onFilter: { type: Function }
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
            // Call the change event
            this.$props.onFilter(item ? item.label : "");
        }
    }
}