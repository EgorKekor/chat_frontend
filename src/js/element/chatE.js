import Template from "./templates/chatT.pug"; 
import ChatC from "../controller/chatC";
import ModelM from "../model/modelM.js";
import {UPDATE_MESSAGES_CHAT, MESSAGE_ADD} from "../modules/events.js";
import Bus from "../eventBus";


class ChatE {
    constructor() {
        this.controller = ChatC;

        Bus.on(MESSAGE_ADD, this._update);
    }

    _update = () => {
        const root = this.root;
        this.destroy();
        this.create(root);
    }

    _updateChat = (recordsArray) => {
        const messageContainer = document.getElementById("message-container");

        for (const record of recordsArray) {
            const messageElem = document.createElement("div");
            messageElem.className += "chat-message";

            const usernameElem = document.createElement("div");
            usernameElem.textContent = record.userName;
            messageElem.appendChild(usernameElem);

            const textElem = document.createElement("div");
            textElem.textContent = record.message;
            messageElem.appendChild(textElem);

            messageContainer.appendChild(messageElem);
        }

        ModelM.readNotify();
    }

    create(root = document.getElementById("application")) {
        Bus.on(UPDATE_MESSAGES_CHAT, this._updateChat);
        this.root = root;

        const templateObject = {};
        templateObject.history = ModelM.getHistory();
        templateObject.currentRoom = ModelM.getRoom();
        console.log(templateObject)
        
        this.root.insertAdjacentHTML("beforeend", Template({templateObject}));
        this.controller.startAllListeners();
    }


    destroy() {
        Bus.off(UPDATE_MESSAGES_CHAT, this._updateChat);
        this.controller.disableAllListeners();
        this.root.innerHTML = "";
    }
}

export default new ChatE();