import routes from './routes'

import { createWebHashHistory, createRouter } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
})



export default router