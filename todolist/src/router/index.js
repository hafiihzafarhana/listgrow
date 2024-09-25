import { createRouter, createWebHistory, } from "vue-router";
import HomePage from "./../pages/Home/Home.vue";
import LoginPage from "./../pages/Login/Login.vue";
import MainPage from "./../pages/Main/Main.vue";
import RegisterPage from "./../pages/Register/Register.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem("token");
            if (token) {
                next("/main");
            }
            else {
                next();
            }
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem("token");
            if (token) {
                next("/main");
            }
            else {
                next();
            }
        },
    },
    {
        path: "/main",
        name: "Main",
        component: MainPage,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem("token");
            if (!token) {
                next("/login");
            }
            else {
                next();
            }
        },
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterPage,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem("token");
            if (token) {
                next("/main");
            }
            else {
                next();
            }
        },
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
