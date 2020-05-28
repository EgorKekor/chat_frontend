import {ObservableMixin} from "./observableMixin.js";

class Bus {
    constructor(){
        Object.assign(this, ObservableMixin);
    }
}
export default new Bus();