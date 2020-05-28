import Bus from "../eventBus.js";
import {
    ROOM_ADD,
    R_ROUTE_TO,
    MESSAGE_ADD,
    UPDATE_MESSAGES_CHAT,
    UPDATE_MESSAGES_ROOM
} from "../modules/events.js";
import { ROOM, ROOT } from "../paths.js";
import { getRooms, createRoom, enterRoom, postMessage, getReadInfo } from "../modules/requests.js";
import WebSocketIface from "../modules/webSocketIface.js"


class ModelM {
    constructor() {
        WebSocketIface.addOpenHandler(this._openHandler);
        WebSocketIface.addCloseHandler(this._closeHandler);
        WebSocketIface.addMessageHandler("update_messages", this._updateHandler);

        this.roomsHistory = {};
        this.currentRoom = null;
        this.currentName = null;
        setInterval(this._webSocketConnector, 2000);
    }

    getHistory = () => {
        let history = this.roomsHistory[this.currentRoom];
        if (!history) {
            history = new Array;
        }
        return history;
    }
    getRoom = () => {
        return this.currentRoom;
    }

    _webSocketConnector = () => {
        if (!WebSocketIface.isOpen) {
            WebSocketIface.connect();
        }
    }

    _openHandler = () => {
        console.log("WS connected success");
    }
    _closeHandler = () => {
        console.log("WS closed");
    }

    _updateHandler = (data) => {
        const updates = new Array;
        for (const [roomName, recodsArray] of Object.entries(data.content)) {
            const notify = {
                roomName: roomName,
                newMessages: recodsArray.length
            }
            Bus.emit(UPDATE_MESSAGES_ROOM, notify);

            if (this.currentRoom) {
                if (roomName === this.currentRoom) {
                    Bus.emit(UPDATE_MESSAGES_CHAT, recodsArray);
                }
            }
        }
        console.log(data);
    }

    async getRooms() {
        this.currentRoom = null;
        let roomsArray = new Array;
        const rooms = await getRooms();
        if (rooms.type === "rooms") {
            for (const [key, value] of Object.entries(rooms.content)) {
                roomsArray.push({ roomName: key, newMessages: value })
            }
            console.log(rooms);
        }
        return roomsArray;
    }



    async createRoom(roomName) {
        const result = await createRoom(roomName)
        Bus.emit(ROOM_ADD);
    }

    _updateHistory = (history, roomName = this.currentRoom) => {
        this.currentRoom = roomName;
        this.roomsHistory[roomName] = history;
        // console.log(history);
    }

    async enterRoom(userName, roomName) {
        if ((userName === "") || (roomName === "")) {
            alert("Укажите имя")
            return
        }

        try {
            const history = await enterRoom(userName, roomName);
            this._updateHistory(history.content, roomName);
            this.currentName = userName;
        } catch (err) {
            console.log(err);
            this.currentRoom = null;
            Bus.emit(R_ROUTE_TO, ROOT);
            return
        }
        Bus.emit(R_ROUTE_TO, ROOM);
    }


    async sendMessage(message) {
        const UserMessage = { text: message };
        try {
            const history = await postMessage(this.currentRoom, this.currentName, UserMessage);
            this._updateHistory(history.content);
        } catch(err) {
            console.log(err);
            return
        }
        Bus.emit(MESSAGE_ADD);

    }

    async readNotify() {
        if (this.currentRoom) {
            getReadInfo(this.currentRoom);
        }
    }

}
export default new ModelM();
