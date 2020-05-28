import Template from "./templates/roomContainerT.pug"; 
import RoomContainerC from "../controller/roomContainerC";
import ModelM from "../model/modelM.js";
import StaticManager from "../modules/staticManager.js";
import {ROOM_ADD, UPDATE_MESSAGES_ROOM} from "../modules/events.js";
import Bus from "../eventBus";


class RoomContainerE {
    constructor() {
        this.controller = RoomContainerC;

        Bus.on(ROOM_ADD, this._update);
    }

    _update = () => {
        const root = this.root;
        this.destroy();
        this.create(root);
    }

    _updateAmount = (content) => {
        const counter = document.getElementById("counter" + content.roomName);
        counter.innerHTML = content.newMessages;
    }

    create(root = document.getElementById("application")) {
        Bus.on(UPDATE_MESSAGES_ROOM, this._updateAmount);
        this.root = root;

        ModelM.getRooms().then(
            (roomsArray) => {
                const templateObject = {};

                templateObject.rooms = roomsArray;
                templateObject.addIconUrl = StaticManager.addIcon;
                
                this.root.insertAdjacentHTML("beforeend", Template({templateObject}));
                this.controller.startAllListeners();
            }
        ).catch(
            (err) => console.log(err)
        );
    }


    destroy() {
        Bus.off(UPDATE_MESSAGES_ROOM, this._updateAmount);
        this.controller.disableAllListeners();
        this.root.innerHTML = "";
    }
}

export default new RoomContainerE();