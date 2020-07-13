import { Components, Helper, SPTypes } from "gd-sprest-bs";
import { Navbar } from "gd-sprest-bs-vue";

export default {
    name: "Navigation",
    components: { Navbar },
    props: {
        onSearch: { type: Function }
    },
    data() {
        return {
            navbarType: Components.NavbarTypes.Primary,
            searchBox: {
                hideButton: true,
                onChange: value => {
                    // Execute the search event
                    this.$props.onSearch(value);
                },
                onSearch: value => {
                    // Execute the search event
                    this.$props.onSearch(value);
                }
            },
            items: [
                {
                    text: "New Item",
                    onClick: () => {
                        // Display a new item form
                        Helper.SP.ModalDialog.showModalDialog({
                            title: "New Item",
                            url: this.props.formUrl,
                            dialogReturnValueCallback: result => {
                                // See if an item was created
                                if (result == SPTypes.ModalDialogResult.OK) {
                                    // Refresh the page
                                    document.location.reload();
                                }
                            }
                        });
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
}
