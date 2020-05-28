import { HttpOrigin } from "../paths.js"

class StaticManager {
    constructor() {
        this.base = window.location.origin;
    }

    get addIcon() {
        return this.base + "/static/plus-icon.jpg";
    }

}

export default new StaticManager();