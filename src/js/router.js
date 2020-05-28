import Bus from "./eventBus.js";
import { R_ROUTE_TO } from "./modules/events.js";
import { ROOT } from "./paths";

export class Router {
    constructor(root = document.getElementById("application")) {
        this.routes = new Map();
        this.root = root;
        Bus.on(R_ROUTE_TO, this.routeTo);

        window.addEventListener("popstate", (event) => {
            event.preventDefault();
            this.routeTo(location.pathname);    //  location == url новой страницы
        });
    }

    register(path = "/", view) {
        if (this.routes.get(path) == undefined) {
            this.routes.set(path, view);
        } else {
            console.log(`Router: path ${path} already exist`);
        }
    }

    fakeRouteTo = (path = "/") => {
        const parseUrl = new URL("https://localhost:8080" + path);
        path = parseUrl.pathname;
        
        if (window.location.pathname !== path) {
            history.pushState(null, null, path);
        }
    }

    routeTo = (path = "/", firtsTime = false) => {
        const parseUrl = new URL("https://localhost:8080" + path);
        path = parseUrl.pathname;
        let newView;
        if ((newView = this.routes.get(path)) != undefined) {
            if (!firtsTime) {
                this.currentView.destroy();
            }
            if (window.location.pathname !== path) {
                history.pushState(null, null, path);
            }

            newView.create()
            
            this.currentView = newView;
        }
    }

    _exit(data = {}) {
        this.routeTo(ROOT);
    }


    start() {
        this.currentView = this.routes.get("/");
        this.routeTo(location.pathname, true);
    }
}