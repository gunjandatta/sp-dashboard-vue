import Vue from "vue";
import { Configuration } from "./cfg";
import App from "./app.vue";
import Strings from "./strings";

// DataTables
import "jquery";
import "datatables.net";
import "datatables.net-bs4";

// Create the global variable for this solution
window[Strings.GlobalVariable] = {
    Configuration
}

// Get the main element to render the solution to
let el = document.getElementById(Strings.AppElementId);
if (el) {
    // Initialize the dashboard
    new Vue({
        el,
        render: h => h(App)
    });
} else {
    // Log
    console.log("[" + Strings.ProjectName + "] Error finding the element with id '" + Strings.AppElementId + "'");
}