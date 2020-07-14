import { ContextInfo, List, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * Form URLs
 */
interface IFormUrls {
    displayFormUrl: string;
    newFormUrl: string;
}

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
 * Data Source
 */
export default class {
    static getFormUrls(): PromiseLike<IFormUrls> {
        // Return a promise
        return new Promise((resolve, reject) => {
            let formUrls: IFormUrls = {} as any;

            // See if this is an SP environment
            if (ContextInfo.existsFl) {
                // Load the list forms
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

                            // New
                            case SPTypes.PageType.NewForm:
                                formUrls.newFormUrl = form.ServerRelativeUrl;
                                break;
                        }
                    }

                    // Resolve the promise
                    resolve(formUrls);
                });
            }
        });
    }

    static getItems(): PromiseLike<Array<IItem>> {
        // Return a promise
        return new Promise((resolve, reject) => {
            if (ContextInfo.existsFl) {
            } else {
                // Return test data
                resolve([
                    { Id: 1, ItemType: "Type 1", Title: "Item 1", Status: "Draft" },
                    { Id: 2, ItemType: "Type 1", Title: "Item 2", Status: "Submitted" },
                    { Id: 3, ItemType: "Type 2", Title: "Item 3", Status: "Approved" },
                    { Id: 4, ItemType: "Type 2", Title: "Item 4", Status: "Rejected" },
                    { Id: 5, ItemType: "Type 3", Title: "Item 5", Status: "Draft" }
                ]);
            }
        });
    }
}