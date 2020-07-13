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
                    { ItemType: "Type 1", Title: "Item 1", Status: "Draft" },
                    { ItemType: "Type 1", Title: "Item 2", Status: "Submitted" },
                    { ItemType: "Type 2", Title: "Item 3", Status: "Approved" },
                    { ItemType: "Type 2", Title: "Item 4", Status: "Rejected" },
                    { ItemType: "Type 3", Title: "Item 5", Status: "Draft" }
                ]);
            }
        });
    }
}