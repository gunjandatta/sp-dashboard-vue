import { ContextInfo, List, SPTypes } from "gd-sprest-bs";

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
    static getItems(): PromiseLike<Array<IItem>> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if the SP environment exists
            if (ContextInfo.existsFl) {
                // TODO
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