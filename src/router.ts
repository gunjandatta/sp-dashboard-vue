import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./views/dashboard.vue"
import Item from "./views/item.vue";

// Available Views
export const Views = {
    Home: () => { router.push("/"); },
    Item: () => { router.push("/item"); }
}

// Use the router
Vue.use(VueRouter);

// Create the router
const router = new VueRouter({
    routes: [
        { path: "/", component: Dashboard },
        { path: "/item", component: Item }
    ]
});
export default router;