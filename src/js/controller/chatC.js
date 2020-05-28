import { DomEventsWrapperMixin } from "../DomEventsWrapperMixin.js";
import ModelM from "../model/modelM.js";
import {R_ROUTE_TO} from "../modules/events.js";
import { ROOT } from "../paths.js";
import Bus from "../eventBus";


class ChatC {
    constructor() {
        Object.assign(this, DomEventsWrapperMixin);

        this.registerHandler("send", "click", this._send);
        this.registerHandler("back", "click", this._back);
    }

    _answerEntered = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("send").click();
        }

    }

    _send = (event) => {
        const input = document.getElementById("messageInput");
        const userText = input.value;
        if (userText === "") {
            return;
        }
        ModelM.sendMessage(userText);
    }

    _back = (event) => {
        Bus.emit(R_ROUTE_TO, ROOT);
    }


    startAllListeners() {
        this.enableAll();
        document.addEventListener("keyup", this._answerEntered);
    }

    disableAllListeners() {
        document.removeEventListener("keyup", this._answerEntered);
        this.disableAll();
    }

}

export default new ChatC();