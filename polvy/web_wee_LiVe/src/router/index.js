import Vue from 'vue'
import Router from 'vue-router'
import baseEnv from "@/assets/js/config.js"
Vue.use(Router)

export default new Router({
    mode: baseEnv.mode === "electron" ? "hash" : "history",
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/index',
            name: "index",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/home/roomList.vue"),
        },
        {
            path: '/markdown',
            name: "markdown",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/feature/markdown.vue"),
        },
        {
            path: '/translate',
            name: "translate",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/feature/translate.vue"),
        },
        {
            path: '/chatgpt',
            name: "chatgpt",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/feature/chatgpt.vue"),
        },
        {
            path: "/room",
            name: "room",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/live/room.vue")
        },
        {
            path: "/userCenter",
            name: "userCenter",
            meta: {
                noHeader: false
            },
            component: () => import("@/views/userCenter/index.vue")
        }
    ]
})
