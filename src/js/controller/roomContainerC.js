import { DomEventsWrapperMixin } from "../DomEventsWrapperMixin.js";
import  ModelM  from "../model/modelM.js";


class RoomContainerC {
    constructor() {
        Object.assign(this, DomEventsWrapperMixin);

        this.registerHandler("add", "click", this._addRoom);
        this.registerClassHandler(".room-card__join-button", "click", this._joinRoom);
    }

    _addRoom = (event) => {
        const inputElem = document.getElementById("roomInput");
        const roomName = inputElem.value;
        ModelM.createRoom(roomName);
    }

    _joinRoom = (event) => {
        const button = event.target;
        const cardRoot = button.parentNode;
        const userName = cardRoot.children[1].children[1].value;
        const roomName = button.id;
        ModelM.enterRoom(userName, roomName);
    }


    startAllListeners() {
        this.enableAll();
    }

    disableAllListeners() {
        this.disableAll();
    }

}

export default new RoomContainerC();