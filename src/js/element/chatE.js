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
            const chat_message = document.createElement("div");
            chat_message.className += "chat-message";

                const chat_message__flex = document.createElement("div");
                chat_message__flex.className += "chat-message__flex";

                    const chat_message__sender = document.createElement("div");
                    chat_message__sender.className += "chat-message__sender text-block text-block_margin";
                    chat_message__sender.textContent = record.userName;
                    chat_message__flex.appendChild(chat_message__sender);

                    const chat_message__text = document.createElement("div");
                    chat_message__text.className += "chat-message__text text-block text-block_margin";
                    chat_message__text.textContent = record.message;
                    chat_message__flex.appendChild(chat_message__text);

                chat_message.appendChild(chat_message__flex);

            messageContainer.appendChild(chat_message);
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