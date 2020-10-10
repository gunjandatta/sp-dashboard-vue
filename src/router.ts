import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./views/dashboard.vue"
import EditForm from "./views/editItem.vue";
import ViewForm from "./views/viewItem.vue";

// Available Views
export const Views = {
    Home: () => { router.push("/"); },
    CreateItem: () => { router.push({ name: "create" }); },
    EditItem: (id) => { router.push({ name: "edit", params: { id } }); },
    ViewItem: (id) => { router.push({ name: "view", params: { id } }); }
}

// Use the router
Vue.use(VueRouter);

// Create the router
const router = new VueRouter({
    routes: [
        { name: "create", path: "/create", component: EditForm },
        { name: "edit", path: "/edit:id", component: EditForm },
        { name: "home", path: "/", component: Dashboard },
        { name: "view", path: "/view:id", component: ViewForm }
    ]
});
export default router;