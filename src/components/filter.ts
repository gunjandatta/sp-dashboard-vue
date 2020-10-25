import Vue from "vue";
import { Components } from "gd-sprest-bs";
import { CheckboxGroup, Navbar } from "gd-sprest-bs-vue";

export default Vue.extend({
    components: { CheckboxGroup, Navbar },
    computed: {
        filterText() { return this.$store.state.filterText; }
    },
    data() {
        return {
            cbProps: {
                isInline: true,
                items: [
                    { label: "Draft" },
                    { label: "Submitted" },
                    { label: "Rejected" },
                    { label: "Pending Approval" },
                    { label: "Approved" },
                    { label: "Archived" }
                ],
                onChange: (item: Components.ICheckboxGroupItem) => {
                    // Update the filter text
                    this.$store.commit("setFilter", item ? item.label : "");
                },
                type: Components.CheckboxGroupTypes.Switch,
                value: "filterText"
            } as Components.ICheckboxGroupProps
        }
    }
});