import { dashboardConfig } from "./config/dashboard.config.js";
import { notFound } from "./views/404.js";
import { renderDasboard } from "./views/dashboard.js";
import { renderLogin } from "./views/login.js";
import { renderRegister } from "./views/register.js";

const routes = {
    "/": {
        renderView: renderDasboard,
        configView: dashboardConfig
    },
    "/login": {
        renderView: renderLogin,
        configView: ""
    },
    "/register": {
        renderView: renderRegister,
        configView: ""
    }
};

export function renderRouter() {
    const path = window.location.pathname || "/";
    const user = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuth");
    const main = document.getElementById("app");
    const route = routes[path];

    // if (!path) {
    //     location.pathname = "/noFound";
    //     return;
    // };

    // if (!isAuth) {
    //     if (path !== "/login" && path !== "/register") {
    //         location.pathname = "/login";
    //         return;
    //     };
    // };

    // if (isAuth) {
    //     if (path === "/login" || path === "/register") {
    //         location.pathname = "/";
    //         return;
    //     };
    // };

    if (route) {
        main.innerHTML = route.renderView();
        if(route.configView){
            route.configView();
        };
    } else {
        main.innerHTML = notFound();
    };
};

document.addEventListener("DOMContentLoaded", () => {
    renderRouter();
});