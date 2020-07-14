import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./views/dashboard.vue"
import Item from "./views/item.vue";

// Available Views
export const Views = {
    Home: () => { router.push("/"); },
    Item: (id) => { router.push({ name: "item", params: { id } }); }
}

// Use the router
Vue.use(VueRouter);

// Create the router
const router = new VueRouter({
    routes: [
        { name: "home", path: "/", component: Dashboard },
        { name: "item", path: "/item:id", component: Item }
    ]
});
export default router;