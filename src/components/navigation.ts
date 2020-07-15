import { Components, Helper, SPTypes } from "gd-sprest-bs";
import { Navbar } from "gd-sprest-bs-vue";
import Vue from "vue";

export default Vue.extend({
    components: { Navbar },
    data() {
        return {
            navbarType: Components.NavbarTypes.Primary,
            searchBox: {
                hideButton: true,
                value: this.$store.state.searchText,
                onChange: value => {
                    // Update the search property
                    this.$store.commit("setSearch", value);
                },
                onSearch: value => {
                    // Update the search property
                    this.$store.commit("setSearch", value);
                }
            },
            items: [
                {
                    text: "New Item",
                    onClick: () => {
                        // TODO
                    }
                },
                {
                    text: "Reports",
                    onClick: () => { }
                },
                {
                    text: "Administration",
                    onClick: () => { }
                },
                {
                    text: "Help",
                    items: [
                        {
                            text: "Common Questions",
                            href: "#"
                        },
                        {
                            text: "How To",
                            href: "#"
                        },
                        {
                            text: "Contact",
                            href: "#"
                        }
                    ],
                    onClick: (item, ev) => {
                        // Prevent postback
                        ev.preventDefault();

                        // Display the page in a modal
                        Helper.SP.ModalDialog.showModalDialog({
                            showMaximized: true,
                            title: item.text,
                            url: item.href
                        });
                    }
                }
            ]
        }
    }
})